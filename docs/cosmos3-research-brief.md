# NVIDIA Cosmos 3 — research brief (AURA AI Laboratories)

Reviewed 2026-09-15 from the official cookbooks:
`github.com/NVIDIA/cosmos/tree/main/cookbooks/cosmos3` (README setup + `reasoner/`, `generator/`, `nim/`).

AURA's Cosmos line: synthetic SA-edge scenarios (taxi pull-outs, pothole swerves, unmarked
intersections, livestock crossing, load-shed-affected signalling) expressed in OpenUSD so we can
**train and test repeatably before touching tarmac**. Cosmos 3 is the current-generation reference
stack for that world-model work. Summary of what the cookbooks give us:

## Checkpoints
- **Cosmos3-Nano** — 8B, single GPU (fp8 default) — our realistic in-house target (consumer 6 GB GPU cannot hold it; needs a rented A100-class or FP8 single-GPU box).
- **Cosmos3-Super** — 32B, 4-GPU tensor parallel; add `--tensor-parallel-size 4`, Ulysses/CFG parallelism options.
- **Cosmos3-Edge** — single GPU, **separate** Transformers integration (`AutoModelForImageTextToText` / `Cosmos3EdgeForConditionalGeneration`), do **not** load with `Cosmos3OmniForConditionalGeneration`.
- Variants: `super-t2i`, `super-t2i-4step`, `super-i2v`, `super-i2v-4step`.

## Backends (pick per use)
| Backend | Use | Notes |
|---|---|---|
| Cosmos Framework | native PyTorch inference, `torchrun` | clones `NVIDIA/cosmos-framework` to `packages/cosmos3`; `uv sync --all-extras --group=cu130-train` (CUDA 13) or `cu128-train` (CUDA 12); needs system pkgs for guardrails (libxcb/libgl) |
| Diffusers | `Cosmos3OmniPipeline` direct generation | `diffusers @ git+...` + `av`, `imageio-ffmpeg`, `cosmos_guardrail`; python 3.13 venv |
| TensorRT-LLM | OpenAI-compatible VisualGen server (image/video/audio gen + action) | Cosmos3 support PRs #14824, #14827 (sync audio), #16155 (video-to-video); `trtllm-serve nvidia/Cosmos3-Nano --visual_gen_args .../cosmos3-nano-1gpu.yaml` |
| TensorRT-LLM Reasoner | OpenAI-compatible image/video reasoning | `trtllm-serve ... --max_num_tokens 32768` |
| vLLM | OpenAI-compatible reasoning | vLLM >= 0.23.0; `--mm-encoder-tp-mode data --media-io-kwargs '{"video":{"num_frames":-1}}'`; set `VLLM_USE_DEEP_GEMM=0` if DeepGEMM unavailable |
| vLLM-Omni | OpenAI-compatible **generation** (image/video/audio/action/transfer) | docker `vllm/vllm-omni:cosmos3`; always `--init-timeout 1800`; `--no-guardrails` or load gated `nvidia/Cosmos-1.0-Guardrail` HF repo (guardrails load at startup; per-request `guardrails:false` does not bypass) |
| NIM | prebuilt NGC containers, no venv | NGC API key + `docker login nvcr.io` (`$oauthtoken`); certified `nvcr.io/nim/nvidia/cosmos3:2.0.0` (choose runtime via `NIM_MODEL_TYPE=generator|reasoner`, variant via `NIM_MODEL_VARIANT=nano|super|...`); reasoner 1.7.0, generator 1.0.0; readiness at `/v1/health/ready` |

## Hard knocks worth remembering
- **CUDA build must match the NVIDIA driver**: `cu130` (driver CUDA 13.x) vs `cu128` (12.x); vLLM doesn't publish a wheel for every minor — don't rely on `--torch-backend=auto` across kernel types.
- **Guardrails are on by default** and need gated HF models + OpenCV graphics libs (`libgl1 libxcb1`). Disable explicitly (`--no-guardrails`, `TRTLLM_DISABLE_COSMOS3_GUARDRAILS=1`, `enable_safety_checker=False`) for one-off runs — with license-compliance awareness.
- **Text-to-image via TRT-LLM is a one-frame video request** (`num_frames=1, seconds=1, fps=8`).
- **Synchronized audio** needs `enable_audio:true` and `ffmpeg` on server PATH (else AVI, no audio).
- **NGC base images**: `nvcr.io/nvidia/pytorch:25.09-py3` (CUDA 13), `25.06-py3` (CUDA 12); clear `LD_LIBRARY_PATH` after activating venv.
- **vLLM-Omni**: checkpoints can exceed default server init timeout — pass `--init-timeout 1800`.

## Implication for ZA Mobility Intelligence dashboard
- The "No national-scale autonomy simulation platform" gap is a **GAP on SA ownership/curation**, not a tooling void: Cosmos 3 is importable now. Recorded in `data/research.json` (testAssets + capabilityMatrix + researchGraph).
- AURA's own rig (6 GB consumer GPU) can iterate previews (diffusers/edge) but real Cosmos3-Super runs need rented A100-class boxes — consistent with the venture page's "rented, large" path (Brev).
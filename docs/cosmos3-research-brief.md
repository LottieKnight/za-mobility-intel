# NVIDIA Cosmos 3 — research brief (AURA AI Laboratories)

Reviewed 2026-09-15 from the official repo README (`github.com/NVIDIA/cosmos`) and cookbooks (`cookbooks/cosmos3`):
setup + `reasoner/`, `generator/`, `nim/`.

AURA's Cosmos line: Cosmos 3 serves a **dual role** for the ZA Mobility Intelligence
dashboard — it is both the driving-scene reasoner and the synthetic SA-edge scenario
generator behind the simulation line, confirmed by user 2026-09-15. OpenUSD scenes of
taxi pull-outs, pothole swerves, unmarked intersections, livestock crossings, and
load-shed-affected signalling can be generated and reasoned about repeatably before
touching tarmac.

---

## Checkpoints (sizes — authoritative root README)

The root repo README is authoritative and conflicts with the cookbook NIM section
(which lists older 8B/32B figures for Nano/Super). **README adopted.**

| Variant | Size | Hardware tier |
|---|---|---|
| **Cosmos3-Super** | **64B** | H200 / B200 / GB200 |
| **Cosmos3-Nano** | **16B** | RTX Pro 6000 / H100 / B200 |
| **Cosmos3-Edge** | **4B** | Jetson AGX Orin / Thor / RTX Pro 6000 |

Cookbook NIM section still references 8B / 32B — flag as stale. In-house realistic
target (if renting): Nano on fp8 single GPU (A100/H100 class); Super requires multi-GPU.

## AV-native capabilities (confirmed hook)

These are **not in the cookbooks** — they come from the root README's description of
Cosmos 3's autonomous-vehicle conditioning, and directly underpin the dashboard's
simulation rationale:

- **9D action conditioning** — native AV action space; forward dynamics generate
  action-conditioned future video frames for AV / DROID / UMI robotic scenarios.
- **Inverse dynamics** — recovers ego-motion trajectories from AV video (drive-scene
  playback and trajectory replay).
- **Action CoT** (chain-of-thought) — trajectory prediction expressed as a
  driving-scene chain-of-causation; the "reasoner" side of Cosmos 3.
- **Sound only with video** — stereo AAC 48 kHz audio is generated together with
  video; never standalone.

## Architecture and license

- **Mixture-of-Transformers (MoT)** architecture with **mRoPE** (multimodal rotary
  position embeddings).
- Resolution tiers: 256p / 480p / 720p; up to 300 frames; 10 / 16 / 24 / 30 FPS.
- **License: OpenMDW-1.1** (open model license, non-commercial-compliant research
  path for SA institutions).
- **Guardrails**: gated `nvidia/Cosmos-1.0-Guardrail` (HuggingFace gated repo;
  loads at startup; cannot be bypassed per-request).
- **Finetune recipes**: 8×H100 SFT scripts (incl. Policy-DROID for AV action
  conditioning); DMD2 4-step distillation.
- **Export/convert**: DCP → safetensors → Diffusers import.
- **Agent Skills** shipped with Cosmos Framework (`.agents/skills/`,
  `.claude/skills/`).

## Backends (pick per use)

| Backend | Use | Notes |
|---|---|---|
| Cosmos Framework | native PyTorch inference, `torchrun` | clones `NVIDIA/cosmos-framework` to `packages/cosmos3`; `uv sync --all-extras --group=cu130-train` (CUDA 13) or `cu128-train` (CUDA 12); guardrail system deps: `libxcb1 libgl1` |
| Diffusers | `Cosmos3OmniPipeline` direct generation | `diffusers @ git+...` + `av`, `imageio-ffmpeg`, `cosmos_guardrail`; Python 3.13 venv |
| TensorRT-LLM | OpenAI-compatible VisualGen server (image/video/audio gen + action) | PRs #14824, #14827 (sync audio), #16155 (video-to-video); `trtllm-serve` with yaml config |
| TensorRT-LLM Reasoner | OpenAI-compatible image/video reasoning (Action CoT) | `--max_num_tokens 32768` |
| vLLM | OpenAI-compatible reasoning | vLLM ≥ 0.23.0; `--mm-encoder-tp-mode data`; `VLLM_USE_DEEP_GEMM=0` fallback |
| vLLM-Omni | OpenAI-compatible generation (image/video/audio/action/transfer) | `vllm/vllm-omni:cosmos3`; always `--init-timeout 1800`; load gated guardrail repo at startup |
| SGLang | Serving backend | Listed in README backends (alternative to vLLM/transformers) |
| NIM | Prebuilt NGC containers, no venv | NGC API key + `docker login nvcr.io`; certified containers: `cosmos3:2.0.0`, `cosmos3-reasoner:1.7.0`, `cosmos3-generator:1.0.0` |

## Hard knocks worth remembering

- **CUDA build must match the NVIDIA driver**: `cu130` (driver CUDA 13.x) vs `cu128` (12.x); vLLM doesn't publish a wheel for every minor — don't rely on `--torch-backend=auto` across kernel types.
- **Guardrails are on by default** and need gated HF models + OpenCV graphics libs (`libgl1 libxcb1`). Disable explicitly (`--no-guardrails`, `TRTLLM_DISABLE_COSMOS3_GUARDRAILS=1`, `enable_safety_checker=False`) for one-off runs — with license-compliance awareness.
- **Text-to-image via TRT-LLM is a one-frame video request** (`num_frames=1, seconds=1, fps=8`).
- **Synchronized audio** needs `enable_audio:true` and `ffmpeg` on server PATH (else AVI, no audio).
- **NGC base images**: `nvcr.io/nvidia/pytorch:25.09-py3` (CUDA 13), `25.06-py3` (CUDA 12); clear `LD_LIBRARY_PATH` after activating venv.
- **vLLM-Omni**: checkpoints can exceed default server init timeout — pass `--init-timeout 1800`.

## Implication for ZA Mobility Intelligence dashboard

- **AV world-model hook (confirmed)**: Cosmos 3 provides the driving-scene reasoner
  (Action CoT + inverse dynamics) and the synthetic video generator (9D action-conditioned
  forward dynamics) that the dashboard's simulation line draws on. It is not a generic
  "sim provider" — it is specifically AV-native.
- The "No national-scale autonomy simulation platform" gap is a **gap on SA ownership/curation**, not a tooling void: Cosmos 3 is importable now, AV-conditioned, and backed by OpenMDW-1.1. Recorded in `data/research.json` (testAssets + capabilityMatrix + researchGraph edges).
- AURA's own rig (6 GB consumer GPU) can iterate previews (diffusers/edge) but real Cosmos3-Nano runs need rented fp8 single-GPU (A100/H100 class); Super needs multi-GPU — consistent with the venture page's rented Brev path.

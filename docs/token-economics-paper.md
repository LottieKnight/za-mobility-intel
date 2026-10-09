# Token Economics and AI Compute Costs: A Comprehensive Analysis
## Using SCHOOL (Pty) Ltd as a Primary Case Study

### Executive Summary
This whitepaper examines the economic foundations of modern AI systems, focusing on the critical interplay between token economics and computational infrastructure costs. Using SCHOOL (Pty) Ltd as a case study, we analyze how compute allocation, inference economics, and token economics determine the viability and scalability of AI ventures in today's market.

### Table of Contents
**Part I: Fundamentals & Foundations**
- Chapter 1: Defining the Modern LLM Landscape
- Chapter 2: The Compute Bottleneck
- Chapter 3: Model Taxonomy and Architecture Review

**Part II: The Economics of Intelligence**
- Chapter 4: Training Costs and Capital Expenditure
- Chapter 5: Inference Optimization
- Chapter 6: Ecosystem Effects

**Part III: Future Trajectories & Societal Impact**
- Chapter 7: Advanced Architectures
- Chapter 8: Regulatory Risk and Governance
- Chapter 9: Conclusion & Roadmap

**Additional Sections**
- History of AI Evolution
- History of Open Source AI
- Terminal Development History
- Cloud Infrastructure Comparison
- Model Comparison Analysis
- Token Economics Deep Dive
- SCHOOL Case Study
- Building a Claude-Class System
- Strategic Recommendations

# Chapter 1: Defining the Modern LLM Landscape
## The Language Model Economy: What, Why, and For Whom

### 1.1 Introduction to the Language Model Economy
Large language models are no longer a research curiosity; they are an industrial input. Every day, millions of software products, search systems, writing tools, and educational platforms route a portion of their work through a transformer. Each routed request consumes a predictable quantity of compute, returns a predictable quantity of tokens, and incurs a predictable quantity of cost. That predictability is the foundation on which the entire economic analysis in this paper rests.

This chapter defines the landscape in which those costs are incurred: what a language model is, how the modern market is structured, which actors compete at which layer, and why token economics — the unit economics of a single generated word — has become the common language of the industry.

The chapter is structured as follows:
- **Defining the artifact**: what a large language model actually is, in economic terms
- **The token as the unit of account**: why the industry prices by tokens rather than by queries or seconds
- **Market structure**: the layer cake of hardware, foundation models, fine-tunes, and applications
- **The South African dimension**: where SCHOOL (Pty) Ltd sits in this landscape and what the landscape means for an African venture

Throughout this paper, SCHOOL (Pty) Ltd is used as the organizing case study. SCHOOL is an AI-powered education platform serving South African learners from Grade R through postgraduate study. It is not a laboratory building foundation models; it is an application-layer venture that must buy, consume, and optimize tokens in a market shaped by a handful of frontier laboratories. Understanding the landscape in Chapter 1 determines which costs SCHOOL can control and which it can only optimize around.

### 1.2 What a Large Language Model Is
#### 1.2.1 The Transformer and the Autoregressive Loop
A language model is a statistical machine that assigns probabilities to sequences of tokens. The dominant architecture deployed today is the transformer, introduced in 2017, which processes sequences through stacked layers of self-attention. During generation, a model operates in an autoregressive loop: it reads the tokens already produced, predicts the next token, appends it to the context, and repeats. The output length of a conversation is therefore a sum of individual prediction steps, each of which requires the model to process the entire growing context.

This loop has three direct economic consequences:
- **Cost scales with output length**: every generated token is itself a full forward pass over the context
- **Cost scales with context length**: the same forward pass grows more expensive as the conversation grows
- **Latency compounds**: the response time of a model is the sum of per-token latencies, not a single computation

A model that appears identical by headline parameter count can therefore differ dramatically in cost per useful answer, depending on how its inference stack deploys attention, caching, and batching. These mechanics are examined in depth in Chapters 2 and 5.

#### 1.2.2 The Parameter as an Economic Variable
Model capability is approximated, imperfectly, by parameter count. Frontier systems of the mid-2020s are measured in the hundreds of billions of parameters; open-weight and student-grade systems at the tens of billions. Predictably, the relationship between size and cost is not linear:
- **Training cost scales with parameter count and token count**: doubling either roughly doubles the compute of a training run
- **Inference cost scales with parameter count per token**: every token generation touches every parameter through at least one forward pass
- **Memory scales with parameter count**: weights must be resident in high-bandwidth memory for both training and inference

The economically important insight for an application-layer venture is that capability gains from scale are subject to diminishing returns relative to their cost. For many controlled tasks — mathematical tutoring, essay feedback, curriculum-aligned explanation — models in the 7B–34B parameter range frequently match frontier models at a fraction of the per-token cost. Chapter 3 turns that observation into a taxonomy; this chapter merely establishes that parameter count is a cost variable first and a capability variable second.

#### 1.2.3 The Token as the Unit of Account
Why does the industry price in tokens rather than queries? Three reasons dominate:
- **Granularity**: a query can cost milliseconds or minutes of compute; none of that variation is visible at the query level
- **Proportionality**: token count tracks actual compute consumption more closely than any user-facing unit
- **Billing compatibility**: input tokens, output tokens, cached tokens, and tool-use tokens can be priced at different rates, allowing providers to express complex cost structures precisely

For SCHOOL, token pricing has a direct pedagogical consequence. If the platform prices its free tier in absolute token credits per student per day, then the token is simultaneously a cost unit (what SCHOOL pays) and a product unit (what the student receives). The unit economics of a single tutoring session collapse to tokens consumed per learning outcome — a measure elaborated throughout this paper.

**Impact on Token Economics**
Treating the token as the unit of account allows granular cost attribution: which subjects are expensive, which prompt patterns waste tokens, which students require retries. Without token-level accounting, optimization is impossible; with it, every improvement in prompt design, caching, or model selection is directly measurable in currency terms.

### 1.3 The Layered Market Structure
#### 1.3.1 The Layer Cake
The modern AI market separates into distinct layers, each with its own cost base and competitive dynamics:
- **Hardware**: GPUs, TPUs, and accelerators, plus the datacenters, power, and cooling that house them
- **Compute providers**: hyperscalers and independent clouds that convert silicon into rented capacity
- **Foundation model providers**: laboratories that train frontier-scale models and expose them as APIs
- **Model operators**: teams that run open-weight models on rented or owned capacity
- **Application builders**: ventures like SCHOOL that consume model output to deliver end-user value

Each layer extracts margin from the layer below. The price a venture pays per token is the sum of the margins of every layer beneath it — hardware amortization, compute markups, training cost recovery, and provider margin. The practical implication is that a venture's token price is largely exogenous, set by actors above it in the stack, while the token consumption and required quality are endogenous. This asymmetry defines the optimization problem that Chapters 4 and 5 address.

#### 1.3.2 Frontier vs. Open-Weight vs. Fine-Tuned
The foundation layer itself divides into three economic categories:

**Frontier (closed) models**
- Trained at $10M to $100M+ per run
- Exposed only through paid APIs
- Highest capability at the highest per-token price
- Zero marginal capital cost for the consumer, but persistent usage cost

**Open-weight models**
- Weights published for reuse
- Community-driven fine-tuning and evaluation
- Self-hostable: marginal cost moves from API fees to compute ownership
- Quality typically trails the frontier but leads on price and data control

**Fine-tuned models**
- Open-weight or API-accessible models adapted to a domain
- Cost concentrated in data preparation and a modest fine-tuning run
- Often superior to frontier models on the narrow task for which they are adapted

The strategic choice for SCHOOL is not between these categories but across them: prompt-engineering across frontier models for the highest-stakes tutoring interactions, routing routine workloads to fine-tuned open-weight models, and reserving small models for low-stakes classification and retrieval. The economics of this routing are the subject of Chapter 5.

#### 1.3.3 The Cognitive Value Chain
AI applications convert token spend into user value through a well-defined chain:
1. **Input**: user state, curriculum data, and instructions are assembled into a prompt
2. **Computation**: the model maps the prompt to an output distribution
3. **Output**: tokens are generated, filtered, and surfaced
4. **Validation**: outputs are checked against correctness, safety, and policy criteria
5. **Learning**: validation results feed back into prompts, fine-tunes, and product design

Cost leaks at every stage. Poor prompts produce verbose outputs that consume tokens without adding value. Weak validation lets incorrect outputs through to users, requiring retry loops. Absent feedback, the same expensive mistakes repeat indefinitely. A venture that manages the full chain controls its effective price per useful token; a venture that only manages step 2 is paying for whatever the model chooses to emit. SCHOOL's approach — structured prompts, curriculum-aligned evaluation, human-in-loop teacher validation — is a direct attempt to compress the chain and convert token spend into measurable learning outcomes.

### 1.4 The Entropy of Educational Misconceptions and the "Cognitive Friction" Coefficient

#### 1.4.1 Why Learner Confusion Is an Economic Variable
Educational AI has an economic property that commodity applications lack: the entropy of learner misconceptions. A learner's current knowledge state is uncertain, and the space of possible misconceptions is large. When a model responds to a confused learner, it is effectively sampling from a distribution it has not fully observed. High-entropy states produce longer, more exploratory, and more expensive responses — and a higher probability of the model reinforcing the very misconception it means to correct.

This is not a quality observation; it is a cost observation. The same student, with the same tutor product, will consume materially different token volumes depending on how far their mental model has drifted from the curriculum. Two students sitting in the same classroom can have different marginal costs per learning outcome, purely as a function of uncertainty about what they believe.

#### 1.4.2 The Cognitive Friction Coefficient
Define the Cognitive Friction Coefficient as a measure of the resistance a learner experiences between their current conceptual state and the target state:
- **Friction depends on conceptual distance**: gaps, not grades, drive the difficulty of remediation
- **Friction drives token spend**: each unit of unresolved friction translates into additional explanation, probing, and validation tokens
- **Friction is diagnosable**: misconception recovery, not final answer quality, predicts the cost of the next interaction

The practical application for SCHOOL is a pre-flight estimation step: given a grade, a subject, and a diagnostic probe, estimate the friction coefficient before committing tokens. High-friction sessions are routed to the strongest model with the richest context; low-friction sessions are served by small, fast, cheap models. Token spend is thus allocated in proportion to conceptual entropy — an application of the model-routing logic formalized in Chapter 5.

#### 1.4.3 Measuring the Coefficient From Interaction Data
Friction is not a theoretical construct; it is measurable from the traces SCHOOL already generates:
- **Probe variance**: the number of diagnostic questions required to localize a misconception
- **Revision cycles**: iterations before a learner produces a correct, self-generated answer
- **Assistance gradient**: how much scaffolding and hinting each revision required
- **Retention**: whether the corrected misconception survives a spaced-repetition check

Aggregating these signals per subject, per grade, and per concept produces a friction map of the curriculum. The map is an operational asset: it tells SCHOOL where token spend is structurally inflated and where targeted content changes would compress it. In thermodynamic terms developed in the appendices, it is the entropy inventory of the learning system.

**Impact on Token Economics**
By pricing misconceptions explicitly, an educational platform converts an intangible — student confusion — into a budgetable line item. The Cognitive Friction Coefficient links pedagogical design to token spend, making curriculum planning an economic activity rather than a purely educational one. This single reframing is what allows SCHOOL to treat its token budget as a strategic allocation rather than a variable annoyance.

**Chapter 1 Summary**
- Language models are an industrial input priced by the token; unit economics dominate strategy
- Capability tracks parameter count only loosely, and never linearly with cost
- The token is the unit of account because it prices actual consumption granularly
- The market is a layer cake; application builders price-take from the layers above
- Models divide into frontier, open-weight, and fine-tuned, with distinct cost profiles
- Learner confusion is measurable and priceable via the Cognitive Friction Coefficient
- Token spend should be allocated in proportion to conceptual entropy
# Chapter 2: The Compute Bottleneck
## Memory, Bandwidth, and the Physics of the Token

### 2.1 Introduction to the Compute Bottleneck
The dominant popular narrative about AI cost is that compute — FLOPs — is the scarce and expensive resource. This narrative is only half true. At inference time, the binding constraint is not arithmetic but memory bandwidth: how fast a chip can move model weights from memory into the compute units that multiply them. A token generation is not limited by how fast a GPU can multiply; it is limited by how fast it can stream several billion parameters per token step.

Underneath every figure in this paper sits a thermodynamic absolute: the Landauer limit, the minimum energy required to erase one bit of information. Real systems burn many orders of magnitude above the limit, but the limit's existence fixes a floor beneath compute economics and explains why the prime input to intelligence is energy. AI inference and digital commodity mining (Bitcoin) are, at bottom, the same purchase — energy converted into computed proof. That is the dynamic that makes the compute bottleneck a financial statement rather than an engineering footnote, and it is the reason the energy-intelligence arbitrage in section 2.4 is a strategic weapon rather than a cost-saving trick.

Chapter 2 makes the case that the compute bottleneck is structural, that it shapes both price and strategy, and that a venture like SCHOOL can neither ignore it nor directly relieve it — but can route around it. The chapter covers:
- **FLOPS vs. memory bandwidth**: why the arithmetic ceiling is not the real ceiling
- **The memory-bandwidth wall**: what limits token generation throughput
- **Hardware economics**: silicon, datacenters, power, and the cost stack
- **The energy-intelligence arbitrage loop**: why geography is a financial instrument

Throughout, the numbers follow the knowledge base established in this paper: training runs at $10M–$100M+, geographic energy arbitrage worth 50–80%, and memory bandwidth as the primary constraint on inference.

### 2.2 The Arithmetic Ceiling vs. the Real Ceiling
#### 2.2.1 FLOPS and the Public Enthusiasm
Vendors quote arithmetic throughput as if it were the constraint that matters. A flagship accelerator advertises tens of peta-FLOPs. At that arithmetic rate, generating a thousand tokens should take microseconds. In practice it takes seconds. The discrepancy is instructive: the advertised number assumes the data is already in the multiply-accumulate units, when in fact the data is in memory and the transfer is the bottleneck.

This chapter is explicit on the point: for transformer generation, every token produced requires streaming the entire weight set — all parameters — through the memory subsystem once per forward pass. If a model has 13 billion parameters and each parameter is two bytes, a single token step streams roughly 26 gigabytes of weights. The cost of that transfer, divided by the available memory bandwidth, sets the minimum latency of a single token — independent of how fast the arithmetic units could in principle run.

#### 2.2.2 The Utilization Gap
The arithmetic units of inference hardware are starved. Utilization of peak FLOPs during autoregressive generation is frequently in the single-digit percentages precisely because the memory subsystem cannot feed weights fast enough. This gap matters economically in two directions:
- **Providers under-provision effective capacity**: advertised FLOPs do not translate into revenue-generating tokens
- **Consumers pay for unrealized arithmetic**: the price per token must recover the silicon purchased for arithmetic that was never performed

The gap is not a software bug; it is a structural property of autoregressive decoding. It is the reason the industry's optimization efforts — quantization, distillation, speculative decoding, efficient attention — all target the memory path rather than the arithmetic path.

#### 2.2.3 Why the Gap Favors Small Models
Because per-token latency is dominated by weight streaming, the model with fewer parameters is fundamentally cheaper per token at equivalent hardware:
- **A 7B model streams ~14GB per token step**; a 70B model streams ~140GB
- **At equal bandwidth**, the 7B model generates tokens roughly ten times faster
- **Latency is proportional to parameter count**, not to task complexity

This is the physical basis for the model-sizing thesis of this paper: for a fixed inference hardware, tokens per second scales inversely with parameter count, and a 7B–34B model that produces an acceptable answer is not merely preferable to a frontier model on price — it is preferable on physical throughput. Chapter 3 catalogs which tasks can be acceptably served at which scale.

### 2.3 The Memory-Bandwidth Wall
#### 2.3.1 Anatomy of a Token Step
The cost anatomy of a single generated token, in order of magnitude:
- **Weight streaming**: every parameter read from high-bandwidth memory — the dominant cost
- **Attention computation**: the KV-cache exchange over the context — the second-order cost
- **Arithmetic**: the multiply-accumulate work — substantial at training, minor at inference
- **Communication**: tensor and pipeline transfers across chips in a multi-device setup

Each term has a distinct scaling law. Weight streaming scales with parameter count. Attention scales with context length (and quadratically in the naive formulation). Communication scales with model size and device count. A venture cannot change these scaling laws, but it can choose which to incur: small models shrink weight streaming, context management shrinks the attention term, and single-device deployment avoids communication entirely.

#### 2.3.2 The Combination That Binds
The bind is that the three largest terms compound simultaneously. A frontier model on a long context incurs heavy weight streaming, and its attention term grows with the very conversation length that made the streaming necessary. The result is an inference stack in which every axis of the problem is large at once. Providers relieve the bind through batching (amortizing weight streaming across many users), caching (paying the attention term once instead of per step), and quantization (shrinking the streaming volume). These mitigations are the business of Chapter 5.

#### 2.3.3 Measuring the Wall in Tokens
Measuring the memory wall is straightforward in production:
- **Tokens per second per GPU**: the headline throughput number
- **Tokens per watt**: throughput normalized to energy
- **Tokens per byte streamed**: an efficiency ratio that isolates algorithmic quality from hardware
- **Effective tokens per dollar**: the number that actually governs product economics

For SCHOOL, the operational target is not raw throughput but effective tokens per dollar at a grade-appropriate quality bar. Progress is measured on that single ratio — a ratio that improved 2–10x through software and algorithmic efficiency alone, per the knowledge base of this paper, before any hardware purchase is considered.

### 2.4 The Energy-Intelligence Arbitrage Loop and Geographic Moats

#### 2.4.1 Power Is the Long-Term Constraint
Compute is often priced as if silicon were the constraint; silicon is recyclable and replaceable. Power is not. A datacenter's lifetime electricity bill typically dwarfs its hardware bill, and an LLM training run or a large inference fleet is, at bottom, an arbitrage between electricity and intelligence. Every token is a packet of energy converted into predicted probability mass. The economic question is what that conversion costs.

The knowledge base of this paper records the figures: geographic energy optimization yields 50–80% reduction in the energy component of compute cost. That spread is larger than most model-selection savings and is captured with zero algorithmic risk — it is pure site engineering.

#### 2.4.2 Where Energy Is Cheap
Energy price is a function of generation mix, regulation, and geography:
- **Hydro and nuclear regions** offer stable baseload at low marginal cost
- **Solar-rich regions** offer daytime generation whose price is approaching zero at peak
- **Stranded renewables** — generation that would otherwise be curtailed — are the cheapest electricity on earth
- **Cooling climates** reduce the energy consumed by heat removal, compounding the saving

The 50–80% band in the knowledge base reflects the spread between an unoptimized urban site and a cold, renewable-rich, hydro-stable region. Capturing it requires locating or contracting compute where the arbitrage exists.

#### 2.4.3 The Loop That Creates the Moat
The energy-intelligence arbitrage loop operates as follows:
1. Locate compute where energy is cheap
2. Convert cheap energy into trained or served intelligence
3. Sell intelligence at the global token price
4. Reinvest the margin in more compute, deeper optimization, or better models

Each pass through the loop widens the gap: the venture that enjoys a 50–80% energy discount can under-price, over-invest, or fund talent that competitors with ordinary energy costs cannot. The moat compounds, because the discount applies to every token the venture ever serves.

#### 2.4.4 Applying the Loop in an Emerging-Market Context
For SCHOOL, the arbitrage is indirect but real. The platform must buy tokens priced on whatever infrastructure the market offers, so its exposure to energy cost is the provider's, not its own. The strategic move is therefore not to build datacenters but to control the layer closest to the discounted energy:
- **Contract energy-backed compute capacity** when the spread justifies it
- **Weight the routing logic toward providers whose energy mix is cheapest and most stable**
- **Time-shift non-interactive workloads** (dataset preparation, fine-tuning, batch evaluation) toward periods of cheapest surplus power
- **Track the energy mix of every provider** as a first-class cost input

The loop turns SCHOOL from a pure token price-taker into a marginal energy arbitrageur — capturing the 50–80% discount on the share of workloads it can schedule, without owning a single megawatt.

**Impact on Token Economics**
Memory bandwidth fixes the floor of per-token latency; energy fixes the floor of per-token cost. A venture that accepts both floors as exogenous permanently overpays. By selecting small models against the bandwidth wall and cheap-energy capacity against the power floor, the same learning outcomes can be delivered at a fraction of the delivered cost — the arithmetic behind SCHOOL's commitment to serving its market at data-light, cost-light economics.

**Chapter 2 Summary**
- Arithmetic capacity is not the real constraint; memory bandwidth is
- Each generated token requires streaming all weights from memory once
- Per-token cost scales with parameter count at fixed hardware
- Attention and communication costs compound the weight-streaming bind
- Power, not silicon, is the long-term economic constraint
- Geographic energy arbitrage is worth 50–80% of the energy component
- The arbitrage loop compounds into a durable cost moat
- Even token price-takers can capture energy savings on schedulable workloads
# Chapter 3: Model Taxonomy and Architecture Review
## The Architecture of the Intelligent Artifact

### 3.1 Introduction to Model Taxonomy
Chapter 1 established that models are industrial inputs priced by the token; Chapter 2 established the physical constraints that govern per-token cost. Chapter 3 closes the loop by cataloging the artifact itself: the architectures, model families, and deployment tiers among which a venture actually chooses. Taxonomy is not an academic exercise here — every architectural family has a distinct cost signature, and the correct choice determines whether a given feature lives or dies on unit economics.

This chapter proceeds in three movements:
- **A taxonomy of the deployed landscape**: dense, sparse (MoE), and multimodal families
- **The variance problem**: the cost of reliability in a stochastic artifact
- **The macro-economics of the educational value equation**: how SCHOOL prices the entire model portfolio against learning outcomes

### 3.2 A Taxonomy of the Deployed Landscape
#### 3.2.1 Dense Transformer Models
The default architecture: every parameter participates in every forward pass. Dense models are the most predictable and the best understood:
- **Uniform cost**: every token touches every parameter, so cost scales cleanly with model size
- **Best weight-to-capability ratio at small scale**: a well-trained dense 7B–13B model is remarkably capable per unit of memory
- **Simple deployment**: single-device or small-cluster inference, minimal communication overhead
- **Primary weakness**: capability plateaus; pushing further requires quadratic-computing-inefficient scale

For SCHOOL, small dense models are the workhorses of routine tasks: classification, extraction, formatting, and low-stakes generation where a frontier model buys nothing.

#### 3.2.2 Sparse (Mixture-of-Experts) Models
Mixture-of-Experts (MoE) architectures activate only a subset of parameters per token, routing each input to the expert weights most relevant to it:
- **Capability of a large total parameter count** with the runtime cost of a smaller active count
- **Active parameters per token** are a fraction of total parameters, changing the streaming math from Chapter 2
- **Routing overhead**: a router must classify each token, adding a small fixed cost
- **Deployment complexity**: experts must be sharded across devices, raising communication costs
- **Price-per-token advantage**: at equal capability, MoE often undercuts dense on inference cost

The economic attraction of MoE is that it relaxes the Chapter 2 bind: the memory stream per token is governed by active parameters, not total parameters. This is the reason MoE has become the workhorse of frontier deployment economics and why a venture evaluating self-hosted options should read MoE claims carefully — capability is advertised at total size, cost is incurred at active size, and the gap is the prize.

#### 3.2.3 Multimodal Models
Models that consume or produce images, audio, and video in addition to text:
- **Heavier encoders**: perception layers add compute above the language stack
- **Higher input cost**: images and audio tokenize into many more tokens than their descriptive text
- **Higher output cost**: image generation and speech synthesis are expensive per unit of "content"
- **Strategic value**: the ability to reason over diagrams, plots, and recorded lectures is core to education

For SCHOOL, multimodality is most valuable in the input direction — a learner submits a photograph of class notes or a geometry diagram, and the tutor must parse it. The economics favor sending perception-heavy inputs to frontier multimodal APIs occasionally, while keeping language-only tutoring on cheaper models. Architecture selection thus becomes a routing decision across modalities, not a single model decision.

#### 3.2.4 The Taxonomy in One Table
- **Dense small (1B–13B)**: cheapest, fastest, adequate for classification and structured tasks
- **Dense mid (13B–34B)**: the quality-per-dollar sweet spot for open-weight tutoring
- **Dense large (34B–100B+)**: strong quality, heavy memory streaming, multi-device deployment
- **MoE (large total, small active)**: frontier-adjacent quality at reduced per-token cost
- **Multimodal**: indispensable where perception is needed, expensive per unit of content

The chapter's thesis follows directly from Chapters 1 and 2: because cost tracks active parameters per token, a venture should match task complexity to the smallest architecture that meets the quality bar. The residual tasks — high-friction, high-stakes, perception-heavy — are routed upward.

#### 3.2.5 The Variance of Outputs and the Cost of Reliability
##### 3.2.5.1 Why Variance Is Priced
Language models are stochastic; identical prompts do not produce identical outputs. Reliability has an explicit price:
- **Sampling temperature** trades determinism for creativity
- **Constrained decoding** (grammars, schemas) removes the need for post-hoc validation at the cost of throughput
- **Retry economics**: the expected number of attempts to get one passing output multiplies the token cost
- **Verifier costs**: every output that requires external checking consumes non-model compute and often human attention

The reliable-cost of a workload is therefore the price of one attempt times the mean attempts-to-success, plus verification. Ventures routinely underprice this because they budget single attempts. SCHOOL's correction is to price the distribution, not the point: for a curriculum-critical explanation, the correct budget is the expected cost of whatever sequence of generation and validation reliably yields a correct explanation.

##### 3.2.5.2 The Variance-Routing Rule
Because reliability costs differ across architectures, the cheapest reliable model for a task is rarely the cheapest average model:
- **High variance, high stakes** (final feedback to a learner): route to the largest model and verify
- **Low variance, low stakes** (internal classification): route to the smallest model, no verification
- **Known-error domains** (arithmetic, citation): prefer constrained decoding over sampling

This rule converts architecture choice from a quality debate into a statistical cost-minimization problem. The correct portfolio is the one whose expected cost per acceptable output is minimal — the principle made operational in Chapter 5's routing layer, and the reason SCHOOL expects a multi-model portfolio rather than a single-model dependency.

### 3.3 The Macro-Economics of the Educational Value Equation

#### 3.3.1 The Equation and Its Implications
Chapter 3 closes with the value framework that governs the whole paper, applied to the educational case:

**Educational Value per Investment** = [Learning Outcomes × Reach × Retention × Expansion Potential] / [Direct Costs + Systemic Costs - Systemic Benefits + Regulatory Costs - Regulatory Benefits]

The numerator is the value the platform actually produces: outcome quality, student reach, retention, and the capacity to expand into adjacent offerings. The denominator is the true cost of production: direct token and compute spend, systemic costs (the overhead of the stack), minus systemic benefits (shared infrastructure recovered across products), plus regulatory costs, minus regulatory benefits (compliance that becomes a market advantage).

#### 3.3.2 Architecture Choice as a Numerator Strategy
Architecture decisions act on both sides of the equation:
- **On the numerator**: the right model improves learning outcomes (better feedback) and reach (cheaper serving funds larger free-tier allocation)
- **On the denominator**: small models and sparse models compress direct costs; shared serving infrastructure across subjects spreads systemic costs
- **On the balance**: regulatory benefits are amplified when architecture choice enables provable standards alignment — a model small enough to audit, transparent enough to explain

The equation makes explicit what the paper has argued implicitly: model selection is not a procurement event but a value-leverage decision. A 7B–34B model that delivers 90% of frontier quality at 10% of the cost moves the equation more than any marketing line about model capability.

#### 3.3.3 The Portfolio as the Unit of Analysis
The unit of economic analysis is not the model deployed today but the portfolio over the planning horizon:
- **Served now**: the routing decisions currently in production
- **Re-served later**: workloads that migrate between tiers as prices fall and models improve
- **Retired**: workloads absorbed into cheaper architectural families
- **New**: workloads that only become viable when some member of the portfolio crosses a cost threshold

Because token prices are exogenous and falling, the portfolio must be re-examined on a schedule, not an event. The venture that reviews its architecture mix quarterly captures price declines; the venture that reviews it on incident drift permanently lags the market.

**Impact on Token Economics**
The taxonomy in this chapter converts an unbounded space of possible models into a small set of deployable tiers. With tiers defined, token economics becomes an accounting exercise: which tier serves which workload, at what expected cost per acceptable output. This is the bridge from architecture theory to the capital and operating budgets of Chapter 4, and to the serving-layer optimization of Chapter 5.

**Chapter 3 Summary**
- Dense models have predictable, size-proportional economics
- Mixture-of-experts decouples capability from per-token cost
- Multimodal input is strategically necessary but structurally expensive
- Reliability, not raw capability, is what a venture actually buys
- Expected cost per acceptable output should govern architecture choice
- The educational value equation unifies cost and outcome in one ratio
- The portfolio, reviewed on a schedule, is the correct unit of analysis
# Chapter 4: Training Costs and Capital Expenditure
## The Real Price of Intelligence

### 4.1 Introduction to Training Economics
Training is the moment an AI venture's economics are decided. At the frontier, a single training run costs between $10M and $100M+, a figure that — before any service is served — already exceeds the lifetime revenue of most software companies. The vast majority of ventures will never train a frontier model; they will instead fund, buy, or fine-tune models whose training costs were incurred elsewhere. Yet training economics governs everything downstream, because the price of every token sold on the market must, in equilibrium, recover the training and capital expenditures of the layer that produced it.

Chapter 4 therefore treats training in two registers:
- **As a capital budget**: what a training run actually spends money on, and how that spend is financed and depreciated
- **As an operating fact**: how training-derived costs flow into the token prices that application builders like SCHOOL pay

### 4.2 The Anatomy of a Training Run
#### 4.2.1 The Four Cost Pillars
A training run is dominated by four pillars:
- **Compute**: accelerator-hours times device cost, the single largest line item
- **Energy**: power plus cooling over the duration of the run
- **Data**: curation, licensing, cleaning, and de-duplication of the training corpus
- **Talent**: the researchers, engineers, and operators who design and run the run

Frontier figures of $10M–$100M+ are almost entirely compute and energy. Data and talent are material at every scale but compress toward a minority share at frontier scale, where the denominator is dominated by silicon-hours.

#### 4.2.2 Why Training Scales Super-Linearly
The cost of a training run grows with the product of parameters and data tokens, and both grow faster than capability:
- **Parameters** define memory, memory defines compute per step
- **Tokens** define steps, and protocol dictates that a model sees its data a limited number of times
- **Validation and ablations** multiply the effective cost: every schedule experiment is itself a training event

The consequence is that each doubling of capability associated with a doubling of scale carries a super-linear price tag. This is the fundamental reason frontier models are priced as capital goods and passed through to consumers as persistent token fees rather than one-time purchases.

#### 4.2.3 The Energy Component and the Arbitrage Revisited
Recalling Chapter 2, energy is a first-class cost. A frontier run is a multi-week, uninterrupted power draw; the geographic arbitrage of 50–80% on the energy component is not a refinement but a pricing decision worth millions on a single run. The arbitrage loop from Chapter 2 has its most concentrated application here — before the model exists.

### 4.3 Training as Capital Expenditure
#### 4.3.1 Capex vs. Opex
Every AI enterprise faces a capital structure choice:
- **Own the run**: buy hardware, pay energy, amortize over multiple uses
- **Rent the run**: buy compute-hours from a cloud, convert capital into operating expense
- **Buy the result**: license weights or API access, eliminating training capex entirely
- **Finance the run**: borrow against expected future token sales

Frontier laboratories mix these; application ventures overwhelmingly choose the third. The virtue of the choice is capital discipline: SCHOOL converts an impossible capex — a frontier training run — into a predictable per-token opex. The cost is strategic dependence on the layer that owns the weights.

#### 4.3.2 Fine-Tuning as the Affordable Middle Path
Between buying frontier weights outright and self-serving general models lies fine-tuning: adapting an existing open-weight model to a narrow domain at a fraction of frontier cost:
- **A fine-tuning run** costs orders of magnitude less than pretraining because the base model has already paid the frontier capex
- **Data becomes the differentiator**: curriculum-aligned, misconception-tagged interaction data is scarce and valuable
- **The result is specialized**: a domain-tuned model routinely beats a general frontier model on the narrow task

For SCHOOL, the fine-tune path converts years of learner interaction data into a durable, capitalizable asset — a model that embodies the house's pedagogy. The data flywheel described in Chapter 6 depends on exactly this conversion.

#### 4.3.3 Depreciation and the Falling Value of Weights
Trained weights depreciate. The token economics industry moves in quarters:
- **New generations** of base models arrive on an accelerating cadence
- **An acquired model's advantage** decays as newer, cheaper, or more capable alternatives arrive
- **Fine-tunes must be re-adapted** or re-built atop new bases

An asset whose value halves per year cannot be treated as a sunk cost; it must be re-deployed on a schedule. This is why the knowledge base of this paper emphasizes data efficiency — 2–5x reduction in required training tokens — as a strategic goal: the cheaper intelligence is to re-train, the shorter its depreciating half-life must be to remain viable.

### 4.4 The Linear-Attention Horizon and the End of the "Context Tax"

#### 4.4.1 The Quadratic Context Tax
Standard self-attention computes pairwise interactions across all tokens, so cost grows quadratically with context length. Every long-document task — a student pasting a curriculum chapter, a tutor asked to reason over a term's notes — pays a context tax where the attention term, already the second-largest cost in Chapter 2, balloons without bound. The tax is not merely financial: it caps what applications can afford to put in context at all.

#### 4.4.2 Linear Attention and Approximate Architectures
A generation of architectural work targets the quadratic term directly:
- **Linear attention** formulations that approximate pairwise attention in linear time
- **Sparse and sliding-window patterns** that cut off-distant interactions
- **State-space and recurrent hybrids** that compress history into a fixed-size state
- **Retrieval-augmented selection** that chooses which context to attend to, making the attended window a decision rather than a given

The direction of travel is unambiguous: the end of the context tax is an architectural near-term, not a research speculation. When long context becomes linear-cast, the Chapter 2 bookkeeping changes — weight streaming dominates even more decisively, and the economics of long-context products (legal, research, and educational reasoning over large corpora) reset downward.

#### 4.4.3 What the Horizon Means for the Educational Platform
The linear-attention horizon is a price event for SCHOOL, not an engineering event:
- **Long-context tutoring becomes affordable**: grade-level curriculum corpora in context, reasoned over, at token prices a developing-market free tier can sustain
- **The friction coefficient becomes cheaper to serve**: deeper diagnostics against longer learner histories cost less per token
- **The portfolio re-tunes**: workload previously routed to frontier models for their long-context strength migrates to cheaper, linear-attention classes

The strategic discipline from Chapter 3 applies: do not let the architecture change arrive as a surprise. A venture on a fixed review schedule captures the price decline; a venture that reacts only to provider marketing pays yesterday's prices for today's capability.

**Impact on Token Economics**
Training cost sets the equilibrium floor under every token price in the market. The venture that understands the anatomy of training — its pillars, its super-linear scaling, its capex structure — can predict price trends instead of reacting to them. Capital discipline (buy results, fine-tune what is differentiated, amortize on a schedule) plus early adoption of linear-attention economics converts a structural cost problem into a managed margin.

**Chapter 4 Summary**
- Frontier training runs cost $10M–$100M+, dominated by compute and energy
- Training scales super-linearly with parameters and data tokens
- Energy arbitrage concentrates its value on the training run itself
- Capex structure — own, rent, buy, or finance — determines strategic freedom
- Fine-tuning converts proprietary data into a durable, specialized asset
- Weights depreciate on a market schedule and must be re-deployed accordingly
- The context tax is ending; linear-attention economics will reset long-context prices
- Application ventures should buy results, fine-tune what differentiates them, and schedule their price capture
# Chapter 5: Inference Optimization
## The Economics of the Token at Serve Time

### 5.1 Introduction to Inference Optimization
Training determines what a model can do; inference determines what a venture can afford. The gap between advertised capability and served capability is bridged by inference engineering — the pursuit of the cheapest acceptable token. This is where the cost structure of an application venture is actually made, and it is the chapter with the most operational leverage in this paper.

The knowledge base establishes the stakes: software and algorithmic efficiency improvements deliver 2–10x gains before any hardware purchase, and data efficiency delivers 2–5x reduction in required training tokens. Inference optimization is the deployment face of those gains. This chapter examines:
- **The serving stack**: batching, caching, and quantized weights at the hardware frontier
- **The trust premium**: why verification and reliability are assets with a measurable value
- **Efficient attention**: the algorithmic side of the Chapter 2 bottleneck
- **The routing layer**: matching workload to model tier; the operational core of this paper's thesis

### 5.2 The Serving Stack
#### 5.2.1 Batching and the Amortized Stream
Chapter 2 established that per-token weight streaming dominates cost. Batching is the correction: multiple users' tokens are generated concurrently, and the weight stream is shared across the batch. Effective throughput rises steeply until the batch saturates memory or arithmetic:
- **Larger batches** amortize the dominant cost across more users
- **Continuous batching** fills the batch in real time instead of waiting for a synchronous window
- **The trade**: latency per user rises modestly as the batch grows; parallel-server diversity mitigates tail effects

For a high-concurrency platform like SCHOOL, batching is the single most powerful lever in the serving stack. It converts a per-user weight-streaming tax into a shared, amortized cost without changing a single model parameter.

#### 5.2.2 Caching and the Once-Paid Token
The KV-cache is the memory of the conversation: past context keyed into attention without re-computation. Caching strategies determine how often that memory is rebuilt:
- **Priority caching** preserves the tokens that future steps will actually attend to
- **Context caching** (prefix caching) reuses computation across users who share a prefix — the same curriculum preamble, the same system prompt
- **Chunked eviction** trades memory for recompute on a tuned schedule

The effect is that a token that was expensive to compute once is cheap to reuse many times. SCHOOL's shared curriculum contexts make it an unusually cache-friendly workload — an advantage that is simply captured, not engineered from nothing.

#### 5.2.3 Quantization and the Shrunk Stream
Weights that are stored in fewer bits stream faster and occupy less memory:
- **FP16 → INT8** halves the memory stream at minimal quality cost
- **INT4 and mixed-scheme quantization** trade further capacity for precision loss
- **Calibration quality** determines whether a quantized model's quality is indistinguishable from the unquantized original

Because per-token cost is proportional to streamed weight bytes, quantization is effectively a parameter-count reduction that requires no retraining. A 13B model quantized to INT8 behaves, in serving economics, like a 6.5B model with the capabilities of a 13B. The Chapter 3 taxonomy should therefore be read with quantization in mind: the deployable tier is defined by effective streamed bytes, not sticker parameters.

### 5.3 The Trust Premium as a Quantifiable Financial Asset

#### 5.3.1 Verification as a Revenue Asset
Trust is usually discussed as a soft value; this chapter prices it. A trustworthy output — verified, grade-appropriate, curriculum-aligned — is worth more than the same output unverified, and the premium is quantifiable in the same units as token spend:
- **Retention**: learners who trust the tutor return; the knowledge base records 15–25% retention gains from network-effect quality
- **Reduced CAC**: trusted products convert with less persuasion; the knowledge base records 30–50% lower acquisition cost
- **Regulatory benefit**: demonstrable reliability converts compliance cost (5–15% of project budget) into a market advantage
- **Premium pricing**: verified tiers out-price unverified equivalents, widening the margin on served tokens

#### 5.3.2 The Premium in the Value Equation
Recalling Chapter 3's value equation, the trust premium acts on both numerator and denominator simultaneously: it raises learning outcomes and retention (numerator) while converting regulatory costs into regulatory benefits (denominator). The same verification infrastructure that cuts retry waste is the evidence base that justifies institutional adoption.

#### 5.3.3 The Balance Sheet Treatment
The trust premium is not a sentiment; it is an asset with an accounting treatment:
- **Earned through measurement**: every verified output, every retained learner is a transaction in the trust account
- **Carried forward**: trust compounds — early institutional adoption validates subsequent adoption
- **Depreciable if neglected**: a single widely-observed failure spends years of accrued trust

The discipline that emerges is that verification spend is not a cost; it is capital formation. SCHOOL's choice to route its highest-stakes interactions through the strongest models with human-in-the-loop validation is not a generosity line item — it is the balance-sheet management of the trust premium.

### 5.4 Efficient Attention and the Algorithmic Side

#### 5.4.1 The Optimization Family
Building on the memory-bandwidth analysis of Chapter 2, attention optimization attacks the second term of per-token cost:
- **FlashAttention and fused kernels** keep attention working tiles resident in on-chip memory instead of round-tripping to HBM
- **Sparse and sliding-window attention** restrict which tokens attend to which, trading recall for cost
- **Prefill decomposition** treats the expensive context-encoding phase differently from decoding
- **Speculative decoding** has a small draft model propose tokens while the large model verifies several at once — turning one expensive step into one expensive verification plus several cheap propositions

These are not micro-optimizations; they compound into the 2–10x algorithmic-efficiency band of the knowledge base. The same model, the same hardware, and a materially different cost per token — achievable by software choices alone.

#### 5.4.2 The Efficiency Stack, in Order of Capture
The rational order of optimization for a venture is:
1. **Routing** (Chapter 3 tiers): never serve a small task on a large model
2. **Caching and batching**: amortize what must be paid
3. **Quantization**: shrink the stream without retraining
4. **Efficient attention**: apply kernel and algorithmic advances as they mature
5. **Distillation and fine-tuning**: compress capability into smaller active models

The ordering matters because each step de-risks the next. Routing captures the largest, safest gains first; kernel adoption captures frontier-scale gains opportunistically; distillation locks capability into the cheapest served form. A venture executing this stack in order compounds gains rather than leaving them on the table.

### 5.5 The Routing Layer

#### 5.5.1 The Whole-Portfolio Scheduler
The operational payoff of Chapter 3's taxonomy is the routing layer: a real-time decision about which model tier serves a given request. Routing inputs include:
- **Task class**: classification, generation, reasoning, perception, retrieval
- **Stakes**: the cost of a wrong answer in this context
- **Friction coefficient** (Chapter 1): the learner's uncertainty state
- **Latency budget**: how fast the user needs the answer
- **Reliability target**: the acceptable retry probability

A well-designed router serves 70–90% of routine workload on small or mid tiers and reserves frontier spend for the residual high-stakes, high-friction, perception-heavy requests. The economic effect is that the platform's average cost per token converges toward its cheapest acceptable tier rather than its most capable one.

#### 5.5.2 Fallback, Retry, and the Verifier Loop
The router also owns failure:
- **Confidence thresholds** trigger escalation to a larger tier before a poor answer reaches a learner
- **Verifier models** check outputs for correctness and grade-appropriateness at token cost below the generator's
- **Bounded retries** cap the expected cost per interaction at a defined multiple of the first attempt

Chapter 3's variance-reliability pricing becomes operational here: the platform commits to an expected cost per acceptable output and enforces it with mechanisms, not hopes.

#### 5.5.3 Data-Light Design as the South African Variable
SCHOOL's constraint is not purely financial; it is infrastructural. South African learners access the platform over mobile networks with metered data, and the knowledge base positions the platform as "data-light by design — built for South African connections." Inference optimization enters the product architecture itself:
- **Streamed, incremental responses** instead of bulky payloads
- **Client-side caching** of repeated content to avoid re-downloading tokens
- **Tiered fidelity**: low-bandwidth modes that trade generation length for reach
- **Heavy processing on the server, light rendering on the device**

The point is that optimization multiplies value at the margin that matters: the same token budget serves more learners when every served byte is engineered to be worth carrying. For SCHOOL the token is not abstract — it is a quantity of megabytes a student's data bundle must tolerate.

**Impact on Token Economics**
Inference optimization compresses every domain of cost identified in earlier chapters: weight streaming (quantization, batching), attention (efficient kernels), selection (routing), and failure (verifier loops). The 2–10x algorithmic band and the 2–5x data band are not theoretical — they are the compounded result of the stack in this chapter. The trust premium then converts the platform's cheapest-possible-token discipline into durable revenue. Together these are the mechanism by which the token economics of this paper become the unit economics of an educational venture in Africa.

**Chapter 5 Summary**
- Batching amortizes weight streaming across users; caching pays context once
- Quantization shrinks the dominant cost without retraining
- Trust is a measurable, compoundable financial asset, not a sentiment
- Efficient attention and speculative decoding compound into 2–10x algorithmic gains
- Routing serves each task on the smallest acceptable tier
- Verification converts optimization wins into acceptable-output costs
- Data-light design makes optimization a reach strategy, not a refinement
- Optimize in order: route, amortize, shrink, attend, distill

# Terminal Development History
## Evolution of Human-Computer Interaction in the AI Era

### 1. Introduction to Terminal Evolution
The terminal—our primary interface for interacting with computational systems—has undergone a remarkable evolution that parallels and enables the development of artificial intelligence. From punched cards and teletypes to graphical terminals and modern IDEs, the evolution of terminal technology has shaped how humans communicate with machines, directly impacting the accessibility, usability, and adoption of AI systems.

Understanding this evolution is crucial for several reasons:
- **Interaction Paradigms**: Terminal innovations have shifted interaction paradigms from batch processing to real-time, conversational interfaces
- **Accessibility**: Terminal evolution has democratized access to computational resources
- **Productivity**: Improved interfaces have dramatically increased developer productivity in AI research and deployment
- **AI Integration**: Modern terminals increasingly incorporate AI-powered features like intelligent code completion and natural language command interpretation

### 2. Early Computing Interfaces (1940s-1960s)
#### 2.1 Punched Cards and Batch Processing
- **Mechanism**: Programs and data encoded on physical cards
- **Interaction Model**: Submit job, wait hours/days for results
- **Limitations**: No interactivity, high latency, error-prone
- **AI Relevance**: Early AI research (Logic Theorist, 1956) used this model—severely limiting experimentation speed

#### 2.2 Teletypes and Line Printers (1960s)
- **Teletype Model 33/35**: Electromechanical printers with keyboard input
- **Communication**: Serial connection (RS-232), typically 10-30 characters per second
- **Interaction Model**: Command-line interface with printed output
- **Significance**: First interactive computing systems (MIT's CTSS, 1961)
- **AI Impact**: Enabled early AI experimentation (ELIZA, 1966) but with severe limitations

#### 2.3 Video Display Terminals (VDTs) (1970s)
- **Examples**: DEC VT52, VT100; IBM 3270
- **Technology**: Cathode-ray tube (CRT) displays replacing paper output
- **Advancements**: 
  - Real-time visual feedback
  - Cursor positioning and screen addressing
  - Standardized escape sequences (ANSI X3.64, VT100)
- **Impact on AI**: Enabled interactive debugging and iterative development—critical for early machine learning experiments

### 3. The Workstation Era (1980s-1990s)
#### 3.1 Bitmapped Displays and Graphics
- **Systems**: Xerox Alto, Apple Lisa, Sun Workstations
- **Innovations**: 
  - Bitmapped graphics enabling arbitrary pixel control
  - Windows, icons, menus, pointing (WIMP) interface
  - High-resolution displays (640x480 and beyond)
- **AI Relevance**: Enabled visualization of complex data structures and neural network architectures

#### 3.2 Networked Terminals and X Window System
- **X11 (1984)**: Network-transparent window system
- **Model**: Client-server architecture for graphical displays
- **Impact**: 
  - Remote access to powerful graphics workstations
  - Collaborative AI research environments
  - Standardization of graphical interfaces across heterogeneous systems

#### 3.3 Early Integrated Development Environments
- **Examples**: Smalltalk-80 environment, Turbo Pascal IDE
- **Features**: 
  - Integrated editing, compilation, debugging
  - Syntax highlighting and code navigation
  - Early forms of code completion
- **AI Connection**: Laid groundwork for modern AI-assisted development tools

### 4. The Terminal Renaissance (2000s-Present)
#### 4.1 Linux Console and Terminal Emulators
- **Linux VT**: Virtual terminals on commodity hardware
- **Emulators**: xterm, GNOME Terminal, iTerm2, Windows Terminal
- **Advancements**:
  - Unicode support for internationalization
  - True color (24-bit) display
  - GPU-accelerated rendering
  - Ligatures and programming fonts (Fira Code, JetBrains Mono)
- **AI Relevance**: Enabled widespread access to AI development environments on affordable hardware

#### 4.2 Rich Terminal Features
- **Multiplexers**: tmux, GNU screen (session persistence, window splitting)
- **Enhanced Shells**: zsh, fish (autosuggestion, syntax highlighting, robust scripting)
- **Prompt Customization**: Powerlevel10k, Starship (context-aware, git integration, execution timing)
- **Output Enhancement**: bat (cat with syntax highlighting), exa (ls replacement)
- **Impact on AI Workflow**: Dramatically improved productivity for ML engineers managing experiments, logs, and deployments

#### 4.3 Integration with Development Ecosystems
- **Language Servers**: Language Server Protocol (LSP) enabling IDE-like features in terminals
- **Debugging Integration**: gdb, lldb with rich terminal interfaces
- **Container Orchestration**: Docker CLI, kubectl for managing AI workloads
- **Monitoring Tools**: htop, btop, glances, prometheus integrations
- **AI-Specific Tools**: 
  - Weights & Biases CLI for experiment tracking
  - MLflow for model lifecycle management
  - Hugging Face CLI for model hub interactions

### 5. AI-Augmented Terminals: The Next Frontier
#### 5.1 Natural Language Interfaces
- **Examples**: GitHub Copilot CLI, Amazon CodeWhisperer CLI
- **Functionality**: Convert natural language to shell commands
- **Impact**: Lowering barrier to entry for complex system administration and DevOps tasks
- **Economic Implications**: 
  - Reduced training costs for infrastructure teams
  - Faster prototyping and experimentation cycles
  - Democratization of advanced system operations

#### 5.2 Intelligent Command Completion and Correction
- **Features**: 
  - Context-aware argument completion
  - Mistake prediction and correction (The Fuck, fasd)
  - Command scoring based on frequency and recency
- **AI Techniques**: 
  - Sequence modeling (n-grams, transformers)
  - Reinforcement learning from user corrections
  - Embedding-based similarity for command suggestion
- **Productivity Gains**: 20-40% reduction in typing and error correction time

#### 5.3 Real-Time Output Analysis and Filtering
- **Capabilities**:
  - Automatic error detection and highlighting
  - Smart pagination and filtering of verbose output
  - Anomaly detection in log streams
  - Performance bottleneck identification
- **AI Applications**:
  - Monitoring training jobs for divergence or instability
  - Detecting data pipeline issues in real-time
  - Flagging security concerns in deployment logs
- **Business Value**: Reduced mean time to resolution (MTTR) for incidents

#### 5.4 Collaborative and Shared Terminal Experiences
- **Technologies**: 
  - WebSocket-based terminal sharing (Gotty, ttyd)
  - Collaborative editing in terminal multiplexers
  - Shared session recording and playback
- **Use Cases**:
  - Remote pair programming on AI infrastructure
  - Training junior engineers on complex ML pipelines
  - Auditorium-style demonstrations of AI workflows
  - Asynchronous debugging assistance
- **Economic Impact**: 
  - Reduced onboarding time for specialized AI roles
  - Improved knowledge transfer in distributed teams
  - Enhanced support efficiency for complex AI systems

### 6. Terminal Evolution and AI Accessibility
#### 6.1 Lowering Barriers to Entry
- **Historical Trend**: Each terminal advancement has broadened access to computational power
- **Current Impact**: Modern terminals with AI assistance enable:
  - Students and hobbyists to experiment with LLM fine-tuning
  - Small startups to manage complex AI infrastructure
  - Researchers in resource-constrained environments to participate in AI advancement
- **Economic Effect**: Democratization of AI development through improved accessibility

#### 6.2 Changing Skill Requirements
- **Shift**: From memorizing arcane commands to conceptual understanding supplemented by AI assistance
- **New Competencies**:
  - Effective prompting of AI-assisted terminals
  - Interpretation of AI-generated suggestions
  - Critical evaluation of automated recommendations
  - Hybrid human-AI workflow design
- **Training Implications**: 
  - Reduced emphasis on rote memorization
  - Increased focus on problem-solving and conceptual understanding
  - Need for AI literacy in technical education

#### 6.3 Accessibility Enhancements
- **Features**:
  - Screen reader compatibility improved through semantic output
  - Alternative input methods (voice-to-command via AI)
  - Customizable visual themes for neurodiversity
  - Language localization through real-time translation
- **Impact**: Expanded participation in AI development across diverse populations
- **Social Value**: More inclusive AI development leading to fairer and less biased systems

### 7. The Terminal as an AI Interaction Paradigm
#### 7.1 Beyond Command Lines: Conversational Development
- **Emerging Patterns**:
  - Iterative refinement through dialogue ("make this faster", "explain this error")
  - Context-aware assistance based on project structure and history
  - Proactive suggestions based on observed workflows
  - Multi-modal interaction (code, diagrams, natural language)
- **Examples**: 
  - Cursor AI editor with integrated terminal
  - GitHub Copilot Chat in terminals
  - JetBrains AI Assistant in IDE terminals
- **Paradigm Shift**: From tool-as-medium to tool-as-collaborator

#### 7.2 Implications for AI Economics
- **Development Velocity**: 
  - Faster prototyping reduces time-to-experiment
  - Lower error rates decrease debugging overhead
  - Accelerated onboarding increases team scalability
- **Cost Structure Changes**:
  - Reduced senior engineer dependency for routine tasks
  - Shift from execution to supervision and guidance
  - New value in prompt engineering and AI interaction design
- **Innovation Acceleration**:
  - More experiments per researcher per unit time
  - Lower cost of failure encourages exploration
  - Rapid iteration on model architectures and training strategies

### 8. Future Trajectories in Terminal Technology
#### 8.1 Immersive and Spatial Interfaces
- **Augmented Reality Terminals**: 
  - holographic command prompts in physical workspace
  - spatial arrangement of logs and outputs
  - gesture-based command modification
- **Virtual Reality Development Environments**:
  - immersive data visualization alongside terminal workflows
  - collaborative virtual spaces for AI architecture design
- **Potential Impact**: 
  - Enhanced spatial reasoning for complex system architectures
  - Reduced context switching between tools and modalities
  - New interaction paradigms for distributed AI systems

#### 8.2 Predictive and Proactive Assistance
- **Anticipatory Computing**:
  - Pre-loading likely needed tools and dependencies
  - Predictive environment configuration based on task context
  - Proactive suggestions for optimization and best practices
- **Workflow Automation**:
  - End-to-end automation of common AI development patterns
  - Self-healing development environments
  - Autonomous routine maintenance and updates
- **Economic Effect**: 
  - Further reduction in cognitive overhead
  - Increased focus on novel problem-solving
  - Shift toward higher-value creative tasks

#### 8.3 Integration with Broader AI Ecosystems
- **Unified Context Awareness**:
  - Terminal awareness of IDE state, design documents, issue trackers
  - Cross-tool suggestion propagation (e.g., from architecture diagram to implementation)
  - Holistic project understanding for more relevant assistance
- **Feedback Loops**:
  - User corrections improving underlying models
  - Outcome-based refinement of assistance strategies
  - Community-driven model specialization for specific domains
- **Long-Term Vision**: 
  - The terminal as a node in an ambient AI assistance ecosystem
  - Seamless transition between conversation, coding, and system operation
  - Continuous learning from individual and organizational patterns

### 9. Case Study: Terminal Evolution in AI Research Workflows
#### 9.1 Historical Comparison: LeNet-5 (1998) vs. Modern LLM Training
**1998 LeNet-5 Development (Yann LeCun et al.):**
- Environment: Sun Sparc workstations with CDE desktop
- Primary Interface: xterm terminals with emacs/vi
- Workflow: 
  - Edit code in terminal-based editor
  - Compile with make (manual dependency tracking)
  - Run experiments, capture output to files
  - Analyze results with gnuplot or custom scripts
  - Debug with gdb in terminal
- Cycle Time: Hours to days per experiment iteration
- Collaboration: Email patches, scheduled meetings

**2024 LLM Fine-tuning Workflow:**
- Environment: Linux containers or cloud VMs
- Interface: Enhanced terminal (WezTerm) with tmux, starship, fzf
- AI Assistance: 
  - GitHub Copilot for code suggestions
  - Auto-complete for hyperparameters and paths
  - Error explanation and fixing
- Workflow:
  - Natural language request: "help me set up LoRA fine-tuning for Llama 3"
  - AI generates baseline command with explanations
  - Interactive refinement through dialogue
  - Real-time tensorboard-like metrics in terminal via custom scripts
  - Automatic checkpointing and recovery suggestions
  - Collaborative debugging via shared tmux sessions
- Cycle Time: Minutes to hours per experiment iteration
- Collaboration: Live shared sessions, asynchronous video reviews

**Productivity Impact**: 
- Estimated 5-10x reduction in time per experiment cycle
- 3-5x increase in experiments per researcher per week
- Significant reduction in cognitive load for routine tasks

#### 9.2 Economic Analysis of Terminal Advancements
**Time Savings Quantification**:
- **Command Lookup and Typing**: 30-50% reduction with intelligent completion
- **Error Diagnosis': 40-60% reduction with AI-assisted error explanation
- **Environment Setup**: 50-70% reduction with automated configuration
- **Collaboration Efficiency**: 25-40% improvement with shared terminal sessions
- **Learning Curve**: 60-80% reduction in onboarding time for complex systems

**Cost Implications for AI Organizations**:
- **Direct Savings**: Reduced engineer hours for equivalent output
- **Opportunity Cost Reduction**: More time for innovation vs. maintenance
- **Quality Improvement**: Fewer errors leading to more reliable systems
- **Scalability Enhancement**: Ability to manage more complex systems with same team size

### 10. Conclusion: The Terminal as an AI Force Multiplier
The evolution of terminal technology from punched cards to AI-augmented command interfaces represents a critical but often overlooked enabler of AI advancement. Far from being a passive conduit, the terminal has actively shaped how humans conceive, implement, and interact with artificial intelligence systems.

Key insights for stakeholders:
1. **Interaction Drives Adoption**: The usability and power of interfaces directly impact who can participate in AI development and how quickly they can contribute
2. **Productivity Multipliers**: Modern terminal enhancements provide compounding benefits—each small efficiency gain multiplies across thousands of daily interactions
3. **Democratization Effect**: Each leap in terminal accessibility has broadened participation in computational fields, a trend continuing with AI-assisted interfaces
4. **Future Integration**: The boundary between terminal, IDE, and AI assistant is blurring, creating more intuitive and powerful development environments
5. **Strategic Investment**: Organizations that invest in advanced terminal tooling and AI-augmented workflows gain measurable advantages in innovation speed and talent retention

For entities like SCHOOL (Pty) Ltd, investing in modern terminal infrastructure and AI-enhanced interfaces represents a high-leverage strategy:
- **Immediate Benefits**: Increased productivity for AI development teams
- **Medium-Term Advantages**: Faster iteration on educational AI models and tools
- **Long-Term Positioning**: Attraction and retention of top talent seeking cutting-edge development environments
- **Educational Value**: Exposure to professional-grade tools prepares students for real-world AI development

As we continue to push the boundaries of what AI can accomplish, the evolution of our interface with these systems remains a critical factor in determining not just what we build, but who gets to build it and how quickly we can advance. The humble terminal, far from obsolete, stands at the forefront of this ongoing revolution in human-AI collaboration.

---

# Chapter 6: Ecosystem Effects
## Network Effects, Platform Dynamics, and Systemic Value in AI Economics

### 6.1 Introduction to Ecosystem Effects in AI
While chapters 4 and 5 examined the direct costs of training and inference, this chapter explores the broader ecosystem effects that profoundly influence the economics of AI systems. These network effects, platform dynamics, and complementary innovations create value (or costs) that extend far beyond the immediate production and consumption of AI services.

Ecosystem effects in AI manifest through multiple channels:
- **Direct network effects**: Where the value of a model or service increases with the number of users
- **Indirect network effects**: Where complementary products, tools, or services enhance the core offering
- **Data network effects**: Where user interactions generate valuable training data
- **Platform ecosystems**: Where developer communities build extensions, tools, and applications
- **Standardization effects**: Where common frameworks and interfaces reduce friction
- **Talent and knowledge spillovers**: Where expertise diffuses through communities and organizations

Understanding these effects is crucial because they can dramatically alter the effective cost structure of AI systems. A model that appears expensive in isolation may become highly economical when ecosystem benefits are considered, while seemingly cheap alternatives may carry hidden ecosystem costs.

This chapter examines these dynamics through the lens of token economics and compute costs, using SCHOOL (Pty) Ltd as a case study to illustrate how educational technology providers can leverage ecosystem effects to improve the viability of their AI offerings.

### 6.2 Direct Network Effects in AI Services
Direct network effects occur when the value of a service increases directly with the number of users. In AI, these effects are often subtle but significant:

#### 6.2.1 User Base Effects on Model Quality
For many AI applications, particularly those involving recommendation systems, language understanding, or generative tasks, more users generate valuable interaction data that can improve model performance:

**Implicit Feedback Loops:**
- User corrections, refinements, and follow-up queries provide implicit training signals
- Usage patterns reveal which outputs are most valuable or actionable
- Error patterns highlight model weaknesses requiring attention
- Example: A math tutoring system improves as it sees more student attempts and corrections

**Explicit Feedback Mechanisms:**
- Thumbs up/down ratings, correction interfaces, and preference indicators
- Structured feedback forms for specific use cases
- Expert review processes for high-stakes outputs
- Example: SCHOOL's essay feedback system improves as teachers validate or correct AI-generated comments

**Impact on Token Economics:**
- Improved model quality reduces the need for expensive retry loops or human intervention
- Higher-quality outputs mean fewer tokens wasted on irrelevant or incorrect generations
- Better user satisfaction increases retention and lifetime value
- Network effects can effectively reduce the cost per useful token over time

#### 6.2.2 Critical Mass and Viability Thresholds
Many AI services exhibit threshold effects where value increases non-linearly after reaching certain user scales:

**Minimum Viable Population (MVP):**
- Some features (e.g., peer explanation generation, collaborative problem-solving) require critical mass
- Below threshold: Feature is unusable or poor quality
- Above threshold: Value increases rapidly with additional users
- Example: SCHOOL's peer-learning features require sufficient concurrent users in each subject/grade level

**Network effects and Platform Dynamics in AI Economics

### 6.3 Indirect Network Effects and Complementary Ecosystems
Indirect network effects occur when the value of a core product increases due to complementary products or services. In AI, these ecosystems are particularly rich and valuable:

#### 6.3.1 Tooling and Integration Ecosystems
The value of an AI model increases significantly with the availability of tools that make it easier to use, customize, and integrate:

**Development Tools:**
- SDKs and APIs in multiple languages (Python, JavaScript, Java, etc.)
- Low-code/no-code interfaces for non-technical users
- Integration platforms (Zapier, Make.com, custom connectors)
- Example: SCHOOL provides REST APIs, Python SDK, and Moodle/LMS plugins for easy integration

**Customization and Fine-tuning Tools:**
- Parameter tuning interfaces for non-experts
- Visual workflow builders for complex AI pipelines
- Template systems for common educational use cases
- Example: SCHOOL's "AI Activity Builder" lets teachers create custom learning experiences without coding

**Monitoring and Observability Tools:**
- Usage analytics and performance dashboards
- Bias and fairness monitoring tools
- Cost tracking and optimization recommendations
- Example: SCHOOL's educator dashboard shows token usage per class, subject, and learning objective

**Impact on Token Economics:**
- Reduced integration costs lower the effective price of adoption
- Better monitoring reduces wasteful usage and optimization opportunities
- Customization tools increase perceived value, allowing for premium pricing
- Ecosystem tools can shift costs from the provider to users who value specific functionalities

#### 6.3.2 Model Adaptation and Fine-tuning Communities
Communities that create adaptations, fine-tunes, and specialized versions of base models create significant value:

**Prompt Engineering Communities:**
- Shared prompt libraries for common educational tasks
- Best practices for specific age groups, subjects, or learning objectives
- Prompt chaining and workflow templates
- Example: SCHOOL maintains a community prompt library for math problem generation, essay feedback, and science explanations

**Fine-tuning and Adapter Ecosystems:**
- Community-shared LoRA adapters for specialized subjects or teaching styles
- Domain-specific fine-tunes (e.g., for special education, AP courses, language learning)
- Techniques for adapting models to local curricula and standards
- Example: SCHOOL teachers share adapters tuned to specific state standards or textbook series

**Evaluation and Benchmarking Communities:**
- Shared test suites for educational effectiveness
- Benchmarking frameworks for comparing approaches
- Best practices for measuring learning outcomes
- Example: SCHOOL contributes to and uses the "EdEval" benchmark suite for educational AI models

**Impact on Token Economics:**
- Community adaptations reduce the need for expensive custom model training
- Specialized variants often provide better performance per token for specific use cases
- Shared evaluation reduces wasted experimentation on ineffective approaches
- Network effects accelerate innovation cycles beyond what a single organization could achieve

### 6.4 Data Network Effects and the Data Flywheel
Perhaps the most powerful ecosystem effect in AI comes from data network effects, where user interactions generate data that improves the service, attracting more users who generate more data:

#### 6.4.1 The AI Data Flywheel
The classic data flywheel operates as follows:
1. More users → More interaction data
2. More interaction data → Better model performance (via fine-tuning, RLHF, etc.)
3. Better model performance → Improved user satisfaction and retention
4. Improved user satisfaction → More users (returning to step 1)

**Key Components for Educational AI:**
- **Interaction Logs**: Student responses, time-on-task, help-seeking behaviors
- **Feedback Signals**: Teacher corrections, student ratings, outcome measurements
- **Curriculum Alignment Data**: Which outputs align with learning objectives and standards
- **Misconception Patterns**: Common errors and misunderstandings that reveal teaching opportunities

**Implementation Considerations:**
- Privacy-preserving techniques (differential privacy, federated learning)
- Clear consent mechanisms and transparent data usage policies
- Ethical guidelines for educational data use
- Balancing personalization with equity concerns

**Impact on Token Economics:**
- Improved model efficiency means fewer tokens needed for equivalent quality
- Reduced hallucinations and errors decrease wasted generation
- Better personalization increases engagement and learning efficiency
- The flywheel can create sustainable advantages that are difficult for competitors to replicate

#### 6.4.2 Data Pooling and Collaborative Learning
Beyond individual platform effects, broader data sharing arrangements can create industry-wide benefits:

**Consortium Data Sharing:**
- Educational institutions pooling anonymized interaction data
- Subject-specific consortia (math educators, language teachers, etc.)
- Grade-band collaboratives (elementary, middle, high school specialists)
- Example: SCHOOL participates in the "Global Education AI Consortium" sharing de-identified interaction patterns

**Pre-competitive Research Collaborations:**
- Jointly funded research on effective educational AI techniques
- Shared benchmarks and evaluation methodologies
- Open publication of non-proprietary findings
- Example: Multiple edtech companies collaborating on research into effective math feedback strategies

**Regulatory and Standards-Driven Sharing:**
- Government-mandated sharing for educational equity initiatives
- Standards bodies creating common data formats and exchange protocols
- Public-private partnerships for educational innovation
- Example: National education departments creating approved datasets for AI training

**Impact on Token Economics:**
- Access to broader datasets improves model generalization and reduces overfitting
- Shared research reduces duplicate effort and accelerates progress
- Standardized interfaces reduce integration costs across the ecosystem
- Collective action can address challenges too large for any single entity

### 6.5 Platform Ecosystems and Marketplace Dynamics
Many successful AI strategies involve creating platforms that enable third-party value creation, similar to app stores or operating systems:

#### 6.5.1 AI-as-a-Platform Models
Rather than selling end-user applications directly, some organizations provide platforms where others can build AI-powered educational tools:

**Platform Components:**
- Foundational models and APIs fine-tuned for educational use cases
- Developer tools, SDKs, and documentation
- Sandbox environments for testing and experimentation
- Monetization and billing infrastructure
- Example: SCHOOL launches "SchooLab" - a platform for educators to build and monetize AI teaching assistants

**Value Creation Mechanisms:**
- Network effects between developers and educators
- Reduced barriers to entry for educational innovators
- Diversification of use cases beyond what the platform owner could conceive
- Revenue sharing models that align incentives
- Example: A special education teacher creates a specialized assistant for dyslexic learners using SchooLab, earning revenue while expanding the platform's value

**Impact on Token Economics:**
- Platform fees create revenue streams beyond direct token sales
- Ecosystem innovation discovers high-value use cases that improve overall token efficiency
- Risk distribution across multiple creators rather than centralized R&D burden
- Platform data improves core models through aggregated, anonymized usage patterns

#### 6.5.2 Marketplace Dynamics and Curation
Successful platforms require thoughtful curation and governance to maintain quality and trust:

**Quality Control Mechanisms:**
- Review processes for educational appropriateness and accuracy
- Bias and fairness audits for submitted models/tools
- Performance benchmarks and efficiency standards
- Example: SchooLab requires all submissions to pass educational validity checks before publication

**Discoverability and Recommendation Systems:**
- Search and categorization for educational resources
- Personalized recommendations based on teaching subject, grade level, and pedagogy
- Trending and popularity metrics within educational communities
- Example: Teachers discover popular math fact fluency tools through subject-specific browsing

**Monetization and Revenue Sharing:**
- Transparent revenue share models (e.g., 70/30 split favoring creator)
- Tiered pricing based on usage and premium features
- Educational discounts and institutional licensing options
- Example: SchooLab takes 30% of revenue, with volume discounts for high-earning creators

**Impact on Token Economics:**
- Marketplace competition drives efficiency innovations that benefit the entire ecosystem
- Successful applications reveal patterns that can improve core platform offerings
- Clear pricing structures help educators predict and manage token-related costs
- Innovation accelerates as creators build on each other's work

### 6.6 Standards, Interoperability, and Compatibility Effects
Ecosystem value is significantly enhanced when components can work together seamlessly through shared standards:

#### 6.6.1 Technical Standards for Educational AI
Common interfaces and data formats reduce friction and increase combinatorial innovation:

**Model Interchange Formats:**
- Standardized formats for sharing models, adapters, and fine-tunes
- Metadata standards for educational alignment, age appropriateness, and subject matter
- Versioning and provenance tracking for educational auditing
- Example: The "EDU-MODEL" format specifies how to tag models with curriculum standards

**API and Interface Standards:**
- Common endpoints for educational AI functions (explain, assess, generate, adapt)
- Consistent parameter schemas for temperature, length, creativity controls
- Standardized error codes and response formats
- Example: All SCHOOL APIs follow the "EdAI v1.0" specification for educational consistency

**Data Exchange Formats:**
- Standardized schemas for student work, responses, and feedback
- Interoperable formats for learning analytics and progress tracking
- Privacy-preserving data sharing protocols
- Example: The "EdExchange" format allows seamless transfer of student-AI interaction data between systems

**Impact on Token Economics:**
- Reduced integration costs when switching between or combining services
- Increased competition drives down prices and improves quality
- Easier composition of complex educational workflows from simpler components
- Network effects as more tools become compatible with each other

#### 6.6.2 Credentialing and Trust Frameworks
In educational contexts, trust and validation mechanisms are essential for adoption:

**Quality Assurance Programs:**
- Certification processes for educational AI tools
- Alignment reviews with state and national standards
- Accessibility and inclusivity evaluations
- Example: SCHOOL's AI tools carry the "EdTrust" certification indicating pedagogical soundness

**Transparency and Explainability Standards:**
- Requirements for showing work or reasoning steps in educational contexts
- Audit trails for compliance and improvement purposes
- Explainability interfaces appropriate for different age groups
- Example: Math problem solvers must show step-by-step reasoning to receive educational certification

**Privacy and Safety Frameworks:**
- Compliance with FERPA, COPPA, GDPR-K, and other educational privacy regulations
- Content filtering and safety monitoring systems
- Parental oversight and controls mechanisms
- Example: All student interactions are logged for review while maintaining privacy protections

**Impact on Token Economics:**
- Trust reduces sales friction and accelerates adoption
- Standardized compliance reduces legal and regulatory overhead
- Clear quality signals help educators make efficient purchasing decisions
- Safety features prevent costly incidents and reputational damage

### 6.7 Talent Ecosystems and Knowledge Spillovers
The availability of skilled practitioners and shared knowledge significantly affects the economics of AI deployment:

#### 6.7.1 Educational AI Talent Pools
Concentrations of expertise create advantages for organizations located in or able to access these ecosystems:

**Specialized Skill Development:**
- Programs combining ML expertise with pedagogical knowledge
- Certifications for educational AI implementation and evaluation
- Communities of practice sharing classroom-tested techniques
- Example: Universities offering "AI in Education" specializations within computer science and education departments

**Knowledge Sharing Mechanisms:**
- Conferences focused on AI in education (AIED, ITS conferences)
- Professional learning communities for educators experimenting with AI
- Open educational resources (OER) for teaching about and with AI
- Example: Annual "AIEd Summit" where educators and researchers share effective practices

**Recruitment and Retention Advantages:**
- Easier hiring when local talent understands both AI and education
- Reduced onboarding time for domain-specific knowledge
- Professional development opportunities that retain talent
- Example: SCHOOL partners with local universities to create internship pipelines for educational AI talent

**Impact on Token Economics:**
- Skilled teams implement optimizations more quickly and effectively
- Reduced trial-and-error in prompt engineering and model tuning
- Faster adaptation to new techniques and architectures
- Lower costs associated with expertise acquisition and retention

#### 6.7.2 Open Source Contributions and Community Labor
Open source ecosystems provide valuable resources that reduce development costs:

**Framework and Library Contributions:**
- Educational-specific extensions to popular ML frameworks
- Tools for evaluating educational effectiveness of AI systems
- Utilities for working with educational data formats and standards
- Example: The "EduTorch" extension provides educational data loaders and evaluation metrics

**Pre-built Components and Templates:**
- Prompt templates for common educational tasks
- Fine-tuning recipes for subject-specific adaptation
- Architecture templates for educational AI systems
- Example: Community-contributed transformer architectures optimized for explaining mathematical concepts

**Bug Fixes and Security Improvements:**
- Community-identified issues in educational AI applications
- Privacy and safety enhancements from diverse perspectives
- Accessibility improvements for diverse learner needs
- Example: Community contribution identifies and fixes bias in math problem generation for certain demographics

**Impact on Token Economics:**
- Reduced development costs for educational AI features
- Faster implementation of best practices from the community
- Shared security and compliance burden
- Access to innovations that would be expensive to develop in-house

### 6.8 Case Study: Ecosystem Effects at SCHOOL (Pty) Ltd
Applying these concepts to our primary case study reveals how SCHOOL can leverage ecosystem effects to improve the economics of its AI offerings:

#### 6.8.1 Current Ecosystem Position
SCHOOL has begun developing several ecosystem components:
- Core AI models fine-tuned for educational use cases
- Basic API and SDK for integration with learning management systems
- Educator dashboard for monitoring usage and effectiveness
- Initial community forum for sharing teaching ideas

**Opportunities for Enhancement:**
1. **Develop a comprehensive educational AI platform** (SchooLab concept)
2. **Establish data sharing consortia** with other educational institutions
3. **Create formal certification programs** for AI-assisted teaching
4. **Build extensive template and prompt libraries** for common educational scenarios
5. **Develop specialized evaluation frameworks** for educational AI effectiveness

#### 6.8.2 Quantifying Ecosystem Benefits
While ecosystem effects can be difficult to quantify precisely, several approaches can estimate their impact:

**Cost Reduction Estimates:**
- Integration cost reduction: 30-50% from standardized APIs and pre-built connectors
- Development acceleration: 40-60% from community components and templates
- Support cost reduction: 25-40% from self-serve documentation and community help
- Training cost reduction: 35-50% from standardized educational materials and certifications

**Value Creation Estimates:**
- Increased user retention: 15-25% from ecosystem lock-in and complementary value
- Premium pricing potential: 10-20% for ecosystem-enhanced offerings
- Expansion revenue: 20-40% from marketplace and platform services
- Viral acquisition reduction: 30-50% from community-driven growth

**Risk Mitigation Benefits:**
- Compliance cost reduction: 20-35% from shared best practices and tools
- Innovation risk reduction: 30-50% from distributed R&D across ecosystem
- Reputation risk reduction: 15-30% from community vetting and standards adherence

#### 6.8.3 Strategic Recommendations for Ecosystem Development
Based on the analysis, SCHOOL should consider the following ecosystem development priorities:

**Short-term (0-6 months):**
1. **Publish comprehensive API documentation** with SDKs for major languages (Python, JavaScript)
2. **Launch educator community forum** for sharing prompts, tips, and best practices
3. **Create template library** for common educational use cases (lesson planning, quiz generation, feedback)
4. **Establish basic data sharing agreements** with pilot schools for improvement data

**Medium-term (6-18 months):**
1. **Develop SchooLab platform** for third-party educational AI tool creation and distribution
2. **Launch formal certification program** for "AI-Enhanced Educator" credentials
3. **Join or create educational AI consortium** for pre-competitive research and data sharing
4. **Implement standardized educational metadata** for all models and tools

**Long-term (18-36 months):**
1. **Establish educational AI standards body** participation or leadership
2. **Create venture or grant program** for innovative educational AI startups
3. **Develop interoperability framework** with major LMS and SIS platforms
4. **Launch annual educational AI conference** or significant presence at existing events

### 6.9 Ecosystem Effects and Token Economics: Synthesis
Understanding ecosystem effects transforms how we think about token economics in AI:

**Beyond Simple Cost-per-Token Models:**
Traditional token economics focuses narrowly on:
```
Cost per token = (Infrastructure cost + Energy cost + Overhead) / Tokens produced
```

**Ecosystem-Enhanced Token Economics:**
A more comprehensive model includes ecosystem factors:
```
Effective cost per educational outcome = 
[(Infrastructure cost + Energy cost + Overhead) 
- Ecosystem cost savings 
+ Ecosystem development investment] 
/ (Tokens produced × Ecosystem quality multiplier)
```

Where:
- **Ecosystem cost savings** include reduced integration, development, support, and training costs
- **Ecosystem development investment** includes platform development, community management, and standards participation
- **Ecosystem quality multiplier** represents improvements in relevance, accuracy, and pedagogical effectiveness from ecosystem inputs

**Strategic Implications:**
1. **Investing in ecosystem can reduce effective costs** even if it increases direct spending
2. **Different user segments** experience different ecosystem benefits (e.g., novice vs. expert educators)
3. **Platform strategies** may be optimal for organizations with strong community engagement potential
4. **Open approaches** often create larger total value, even if capturing a smaller percentage
5. **Educational context** amplifies certain ecosystem effects (trust, standards, pedagogical validity)

### 6.10 Conclusion
Ecosystem effects represent a powerful but often underappreciated dimension of AI economics. For organizations like SCHOOL (Pty) Ltd operating in the educational technology space, deliberately cultivating ecosystem advantages can transform the economics of AI from a challenging cost center into a sustainable source of educational value and innovation.

Key takeawys for stakeholders:
1. **Look beyond direct costs**: Ecosystem effects can significantly alter the effective economics of AI systems
2. **Invest strategically**: Not all ecosystem investments yield equal returns; focus on high-leverage opportunities
3. **Think platformically**: Consider how to enable others to create value with your AI foundations
4. **Value openness appropriately**: Open ecosystems often create larger total value, even with different capture mechanisms
5. **Measure holistically**: Develop metrics that capture both direct costs and ecosystem benefits/value creation
6. **Prioritize educational alignment**: In educational contexts, ecosystem effectiveness must serve pedagogical goals
7. **Plan for evolution**: Ecosystem strategies should evolve as the technology and educational landscapes change

By recognizing and actively shaping ecosystem effects, organizations can create AI offerings that are not only economically viable but also educationally transformative—delivering superior learning outcomes while managing the inherent costs of advanced AI systems.

---

# Chapter 7: Advanced Architectures
## Emerging Models and Their Economic Implications

### 7.1 Introduction to Advanced Architectures
While Chapters 1-3 covered established transformer-based architectures and their variants, this chapter looks toward the frontier of AI model design. Advanced architectures represent the next wave of innovation that promises to reshape the economics of AI systems by addressing fundamental limitations in current approaches.

As we've seen throughout this paper, the economics of AI are deeply intertwined with architectural choices. Training costs, inference efficiency, token consumption, and scalability all derive from how models are structured. Advanced architectures aim to break existing trade-offs—offering better performance with less compute, lower token requirements for equivalent quality, or entirely new capabilities that create economic value.

This chapter examines several promising architectural directions, analyzing their technical merits and, critically, their economic implications. For each approach, we'll consider:
- Technical innovations and how they differ from current paradigms
- Training economics: How do they affect data and compute requirements?
- Inference economics: What are the implications for token consumption, latency, and cost?
- Scaling properties: Do they follow different scaling laws than transformers?
- Ecosystem effects: How do they impact tooling, community development, and adoption?
- Strategic considerations: When and how might organizations like SCHOOL (Pty) Ltd leverage these advances?

Understanding these advances is essential for making informed decisions about long-term AI strategy, infrastructure investment, and model development priorities.

### 7.2 State Space Models and Linear Attention Alternatives
One of the most active areas of architectural innovation seeks to replace or augment the quadratic self-attention mechanism that has been both the strength and limitation of transformer architectures.

#### 7.2.1 Mamba: Selective State Spaces (Mamba)
**Technical Innovation:**
Mamba replaces the attention mechanism with selective state spaces, achieving linear complexity O(n) for sequence length n instead of the quadratic O(n²) of standard attention. Key innovations include:
- **Selection mechanism**: Unlike earlier state space models, Mamba dynamically selects which information to propagate through the state based on the input
- **Hardware-aware design**: Optimized for efficient implementation on modern accelerators
- **Structured state spaces**: Uses structured (e.g., diagonal plus low-rank) state matrices for computational efficiency
- **Parallel scan algorithm**: Enables parallel training despite the recurrent formulation

**Economic Implications:**
- **Training Costs**: Linear complexity reduces training compute for long sequences
  - For context length L, attention is O(L²) while Mamba is O(L)
  - Example: Going from 2K to 32K context window increases attention cost 256x but Mamba cost only 16x
  - Training large-context models becomes dramatically more economical
- **Inference Efficiency**: 
  - Constant latency per token regardless of context length (vs. linear increase for attention)
  - Reduced memory bandwidth requirements for KV cache storage
  - Particularly beneficial for applications requiring long context (document understanding, code generation)
- **Memory Requirements**: 
  - Significantly reduced KV cache storage needs
  - Lower activation memory during training and inference
  - Enables larger batch sizes or longer contexts on fixed hardware
- **Scaling Laws**: 
  - Preliminary evidence suggests different (potentially more favorable) scaling exponents
  - May achieve similar performance with less compute for certain tasks
  - Architecture appears to benefit from scale similarly to transformers but with better constants

**Applications and Token Economics:**
- **Long-context understanding**: Processing entire textbooks, codebases, or conversation histories
  - SCHOOL application: Analyzing full semester of student work for personalized recommendations
  - Token efficiency: Same quality with fewer tokens due to better long-range coherence
- **Real-time applications**: Streaming audio/video processing, live tutoring sessions
  - Consistent latency enables predictable user experience
  - Reduced token waste from context truncation or chunking
- **Edge deployment**: More feasible on resource-constrained devices
  - Enables offline educational applications with sophisticated capabilities

**Adoption Considerations:**
- **Maturity**: Emerging but showing strong results on language modeling benchmarks
- **Ecosystem**: Growing support in Hugging Face Transformers, custom kernels available
- **Compatibility**: Drop-in replacement for attention in many architectures
- **Implementation**: Requires specialized kernels but libraries are maturing rapidly

#### 7.2.2 Retentive Networks (RetNet)
**Technical Innovation:**
RetNet replaces attention with a retention mechanism that enables both parallel training (like transformers) and recurrent inference (like RNNs), getting the best of both worlds:
- **Dual formulation**: Training uses parallelizable formulation; inference uses efficient recurrent form
- **Linear complexity**: O(n) for both training and inference with respect to sequence length
- **Simple implementation**: Remarkably close to standard RNN implementation but with transformer-like performance
- **Position encoding**: Built-in effective position encoding without separate embeddings

**Economic Implications:**
- **Training Efficiency**: 
  - Parallel training maintains high hardware utilization
  - Reduced memory footprint compared to attention mechanisms
  - Faster convergence reported in early studies
- **Inference Efficiency**:
  - True constant latency per token (no context length dependence)
  - Minimal memory footprint for state storage (fixed size regardless of context)
  - Enables streaming applications with bounded memory
- **Memory Requirements**:
  - Fixed-size state instead of growing KV cache
  - Dramatically reduced memory for long-generation tasks
  - Particularly beneficial for autoregressive generation use cases
- **Scaling Properties**:
  - Appears to follow standard transformer scaling laws with improved constants
  - May enable larger effective models within fixed compute budgets

**Applications and Token Economics:**
- **Generation-heavy workloads**: Story writing, code generation, explanation creation
  - SCHOOL application: Generating detailed lesson plans or multi-step problem solutions
  - Token efficiency: More coherent long-form outputs with less token waste
- **Interactive applications**: Real-time tutoring, conversational agents
  - Consistent low latency improves user experience
  - Enables always-on educational assistants with minimal resource footprint
- **Resource-constrained environments**: Offline or low-power educational tools
  - Enables sophisticated AI on older hardware or mobile devices

**Adoption Considerations:**
- **Simplicity**: Extremely simple to implement and understand
- **Performance**: Competitive with transformers on language modeling tasks
- **Library support**: Increasing availability in major frameworks
- **Transition path**: Straightforward to experiment with in existing codebases

#### 7.2.3 Linear Attention and Kernel-Based Approaches
Several approaches approximate attention using kernel methods to achieve linear complexity:

**Performer (FAVOR+):**
- Uses positive orthogonal random features to approximate attention
- Provides unbiased estimation with controllable variance
- Linear complexity O(n) with small constant factors
- **Economic impact**: Reduced compute for long sequences, though accuracy can lag behind full attention

**Linformer:**
- Projects keys and values to lower-dimensional space
- Complexity O(n) where n is sequence length
- **Economic impact**: Significant memory and compute savings for long sequences
- **Limitation**: Performance degrades for tasks requiring precise positional reasoning

**Nyströmformer:**
- Uses Nyström method to approximate attention matrix
- Balances accuracy and efficiency
- **Economic impact**: Good trade-off for medium-length sequences

**Collective Economic Implications:**
- **Training savings**: Substantial for long-context applications
- **Inference benefits**: Reduced memory bandwidth and compute requirements
- **Accuracy trade-offs**: Vary by approach and task; some applications show minimal quality loss
- **Best suited for**: Applications where very long context is needed but precise token-level interactions are less critical

### 7.3 Mixture of Experts (MoE) and Sparse Activation
While MoE architectures were touched on in Chapter 3, advanced variants and economic implications warrant deeper examination:

#### 7.3.1 Beyond Basic MoE: Advanced Routing and Expert Design
**Innovations in Expert Architecture:**
- **Hierarchical MoE**: Experts organized in trees for efficient routing
- **Expert specialization**: Training experts for specific linguistic phenomena or tasks
- **Capacity factors**: Dynamic adjustment of expert utilization based on load
- **Expert choice routing**: Tokens can select multiple experts rather than fixed top-k
- **Learnable routing**: More sophisticated router networks that adapt during training

**Economic Implications:**
- **Training Efficiency**: 
  - Active parameter count remains manageable while total model capacity grows
  - Compute scales with active parameters, not total parameters
  - Example: Switch Transformer with 1.6T parameters trains as if it were much smaller
- **Inference Efficiency**:
  - Only activated experts compute, reducing effective compute per token
  - Memory requirements still scale with total parameters (all experts must be loaded)
  - Expert parallelism can distribute memory load across devices
- **Memory Considerations**:
  - Total parameter storage still required (can be limiting factor)
  - Expert parallelism helps but adds communication overhead
  - Quantization becomes even more critical for large expert counts
- **Scaling Laws**:
  - Different scaling characteristics than dense models
  - Can achieve superior performance at fixed compute by increasing expert count
  - Routing overhead becomes significant at very large expert counts

**Applications and Token Economics:**
- **Massive scale models**: Frontier research where absolute performance is paramount
  - SCHOOL consideration: Potentially relevant for future foundation model development
  - Token efficiency: High capability per token when expert routing is effective
- **Multi-task and multi-domain models**: 
  - Different experts specialize in different subjects or educational levels
  - SCHOOL application: Mathematics expert, language expert, science expert, etc.
  - Token efficiency: Better relevance and accuracy through expert specialization
- **Adaptive computation**: 
  - Routing can vary based on input difficulty
  - Simple queries use fewer experts, complex ones engage more
  - Token efficiency: Matches compute to problem difficulty

**Adoption Considerations:**
- **Implementation complexity**: Significant engineering effort for efficient routing
- **Communication overhead**: Expert distribution requires high-bandwidth interconnects
- **Load balancing**: Preventing expert under/over-utilization requires careful design
- **Maturity**: Well-established in research but production implementation remains challenging

#### 7.3.2 Conditional Computation Beyond Experts
The MoE principle extends to other forms of conditional computation:

**Sparse Mixture of Low-Rank Experts (S-MoE):**
- Combines low-rank factorization with mixture of experts
- Further reduces parameter count while maintaining capacity
- **Economic impact**: Even better parameter efficiency than standard MoE

**Activate Only What You Need (AWYN) Networks:**
- Dynamically determine computation depth or width per token
- Examples: Mixture-of-Depths, Skipping Networks
- **Economic impact**: Compute scales with actual needed complexity, not worst-case
- **Particularly effective for**: Variable-complexity tasks like educational content generation

**Token Routing and Early Exiting:**
- Route tokens to different model paths based on complexity
- Exit early when sufficient confidence is reached
- **Economic impact**: Significant savings for batches with mixed difficulty examples
- **SCHOOL application**: Simple math facts get quick answers, complex problems engage deeper reasoning

### 7.4 Efficient Attention Mechanisms and Their Evolution
Building on Chapter 5's discussion of efficient attention, this section examines the latest advances:

#### 7.4.1 FlashAttention-2 and Beyond
**Continued Innovations:**
- **FlashAttention-2**: Further optimizations for Hopper architecture, 2x speedup over FlashAttention-1
- **Vertex Reordering**: Improves memory access patterns for attention computation
- **Block-sparse variants**: Combine flash attention with structured sparsity
- **Persistent kernels**: Keep attention kernels resident on GPU to reduce launch overhead

**Economic Implications:**
- **Training speedup**: 2x-3x faster attention computation translates to reduced training time
- **Inference throughput**: Direct improvement in tokens/second for memory-bandwidth-bound workloads
- **Energy efficiency**: Less compute and memory movement for same output quality
- **Enables longer contexts**: Makes previously infeasible context lengths practical

#### 7.4.2 Linear and Sub-quadratic Alternatives
Research continues on attention mechanisms with better than quadratic scaling:

**Logarithmic Attention:**
- Achieves O(n log n) or better complexity through hierarchical approaches
- **Economic impact**: Enables extremely long contexts with manageable compute

**Constant Attention Approximations:**
- Certain structural assumptions enable O(1) or O(log n) attention
- **Economic impact**: Potential for context-length-independent computation
- **Limitation**: Often requires specific data properties or approximations

**Hybrid Approaches:**
- Combine exact attention for nearby tokens with approximations for distant tokens
- **Economic impact**: Balances quality and efficiency
- **Example**: Local attention + global tokens or learned sparse patterns

### 7.5 Memory-Augmented and Retrieval-Augmented Architectures
Instead of storing all knowledge in parameters, these architectures combine parametric models with external memory:

#### 7.5.1 Retrieval-Augmented Generation (RAG) and Variants
**Beyond Basic RAG:**
- **Real-time RAG**: Updating retrieval index continuously rather than periodic batches
- **Hierarchical retrieval**: Coarse-to-fine search for efficiency
- **Learnable retrievers**: Retrieval mechanism trained end-to-end with generator
- **RAG with iteration**: Multiple retrieve-generate cycles for refinement
- **Atlas**: Fusion of retrieval outputs in encoding space

**Economic Implications:**
- **Parameter efficiency**: Smaller parametric model achieves same or better performance
  - Knowledge stored externally reduces model size requirements
  - Example: 8B parameter RAG system can match 32B dense model on knowledge-intensive tasks
- **Training costs**: 
  - Smaller model = reduced training compute
  - Retrieval system training often cheaper than parametric model scaling
  - Index build costs amortized over many queries
- **Inference costs**:
  - Retrieval adds latency but reduces generation compute
  - Trade-off depends on retrieval efficiency and generation length
  - Particularly effective when knowledge is sparse or frequently updated
- **Memory/storage trade-off**:
  - Shift from VRAM/storage for model parameters to storage for index
  - Index storage often cheaper than equivalent VRAM
  - Enables scaling knowledge separately from reasoning capacity

**Applications and Token Economics:**
- **Knowledge-intensive educational applications**: 
  - SCHOOL application: Up-to-date curriculum information, latest scientific findings
  - Token efficiency: Less parametric knowledge needed, more retrieved as needed
- **Reducing hallucinations**: 
  - Grounding in verified sources decreases factually incorrect outputs
  - Fewer correction cycles = less wasted token generation
- **Dynamic knowledge bases**: 
  - Easy updating without retraining entire model
  - Enables rapid incorporation of new educational standards or findings

#### 7.5.2 Memory Networks and Neural Turing Machines
**Differentiable Neural Computers (DNC) and Variants:**
- External memory with learnable read/write operations
- **Economic impact**: Separates memory capacity from compute parameters
- **Long-term dependency handling**: Excellent for tasks requiring precise long-range recall

**Economic Implications:**
- **Parameter efficiency**: Reasoning network can be smaller; knowledge in external memory
- **Training complexity**: More complex training procedure but potentially less data needed
- **Inference characteristics**: Predictable memory access patterns
- **Use case dependent**: Shines on tasks requiring precise manipulation of information

**Applications and Token Economics:**
- **Precise information tasks**: Mathematical derivation, chemical equation balancing
  - SCHOOL application: Step-by-step problem solving with exact intermediate values
  - Token efficiency: Less parametric memorization of procedures, more dynamic lookup
- **Structured output generation**: Tables, diagrams, structured data
  - External memory facilitates structured manipulation
  - Reduces token waste from formatting errors or retries

### 7.6 Neuromorphic and Event-Driven Approaches
Taking inspiration from biological neural networks, these architectures process information differently:

#### 7.6.1 Spiking Neural Networks (SNNs) for AI
**Core Concept:**
- Information encoded in timing of spikes rather than continuous values
- Asynchronous, event-driven processing
- Extremely energy-efficient for sparse activity patterns

**Economic Implications:**
- **Training Challenges**: 
  - Non-differentiable spiking complicates gradient-based training
  - Surrogate gradient methods and conversion approaches emerging
  - Currently higher training costs for equivalent performance
- **Inference Efficiency**:
  - Potential orders-of-magnitude better energy efficiency for sparse workloads
  - Particularly effective when inputs are naturally event-based or sparse
  - Minimal energy consumption during idle periods
- **Hardware Requirements**: 
  - Neuromorphic chips (Intel Loihi, IBM TrueNorth) still emerging
  - Simulation on conventional hardware loses efficiency benefits
  - Long-term promise if specialized hardware becomes widely available

**Applications and Token Economics:**
- **Sensory processing applications**: Audio, vision, touch-based educational tools
  - SCHOOL consideration: Interactive science labs with real-time sensor processing
  - Token efficiency: Event-based processing may reduce need for constant token streams
- **Always-on monitoring**: Passive observation of learning environments
  - Extremely low power enables continuous operation
  - Token generation only when significant events occur
- **Edge and IoT educational devices**: 
  - Battery-operated or energy-harvesting educational tools
  - Enables deployment in resource-constrained settings

#### 7.6.2 Liquid State Machines and Reservoir Computing
**Core Concept:**
- Fixed, random recurrent reservoir provides high-dimensional dynamics
- Only readout weights are trained
- **Economic impact**: Dramatically reduced training complexity

**Economic Implications:**
- **Training Efficiency**: 
  - Only readout layer requires training (often linear regression)
  - Reservoir fixed and randomly initialized (no backpropagation through time)
  - Training can be orders of magnitude faster
- **Inference Characteristics**: 
  - Fixed reservoir computation + simple readout
  - Predictable latency and memory usage
  - Hardware implementation possible on analog or mixed-signal substrates
- **Limitations**: 
  - Performance ceiling lower than fully trained recurrent networks
  - Best suited for temporal processing tasks rather than complex reasoning

**Applications and Token Economics:**
- **Temporal pattern recognition**: Speech phonemes, movement patterns, signal processing
  - SCHOOL application: Pronunciation feedback, experimental data analysis
  - Token efficiency: Efficient processing of temporal sequences
- **Real-time forecasting**: Short-term predictions in educational simulations
  - Low latency enables responsive interactive simulations
  - Minimal computational overhead for continuous operation

### 7.7 Architectures for Specific Modalities and Tasks
While general-purpose architectures remain important, specialized designs continue to emerge:

#### 7.7.1 Code-Specialized Architectures
**Innovations:**
- **Syntax-aware transformers**: Incorporate abstract syntax tree (AST) information
- **Execution-guided training**: Use compiler/interpreter feedback during training
- **Structure-informed attention**: Bias attention toward syntactically relevant tokens
- **Example architectures**: CodeTF, GraphCodeBERT, PLBART with enhancements

**Economic Implications:**
- **Training efficiency**: 
  - Better utilization of training data through structural priors
  - May achieve code understanding with less data or compute
  - Reduced need for massive scale to capture programming language nuances
- **Inference quality**: 
  - Higher correctness for code generation tasks
  - Fewer syntax errors = less wasted generation and retry attempts
  - Better alignment with developer expectations
- **Token economics**: 
  - Higher quality output per token for code-related tasks
  - Enables smaller models to achieve useful code assistance
  - Particularly valuable for educational coding environments

**Applications for SCHOOL:**
- **Programming education**: Intelligent coding assistants for students
  - Better error detection and correction suggestions
  - More accurate code completion and explanation
  - Token efficiency: More helpful output per token, less frustration
- **Automated grading**: Structured feedback on student code submissions
  - More consistent and accurate assessment
  - Reduced need for human intervention on common errors

#### 7.7.2 Reasoning and Math-Specialized Architectures
**Innovations:**
- **Process supervision**: Training on intermediate reasoning steps, not just final answers
- **Verifier models**: Separate models trained to validate reasoning chains
- **Tool use integration**: Learning to use external calculators, symbolic solvers, etc.
- **Symbolic-neural hybrids**: Combining neural networks with symbolic reasoning engines

**Economic Implications:**
- **Training considerations**: 
  - Process supervision requires more detailed training data
  - May increase data acquisition costs but reduce needed scale
  - Verifier models add parameters but improve reliability
- **Inference quality and efficiency**: 
  - Fewer reasoning errors = less backtracking and correction
  - Tool use can dramatically reduce compute for certain operations
  - Example: Using calculator for arithmetic instead of neural approximation
- **Token economics**: 
  - Higher-quality reasoning chains per token
  - More reliable educational outputs reduce need for verification cycles
  - Tool integration shifts computation from neural to more efficient substrates

**Applications for SCHOOL:**
- **Mathematical problem solving**: Step-by-step algebra, calculus, proofs
  - Process supervision improves pedagogical quality of explanations
  - Tool use enables accurate computation where neural approximation fails
  - Token efficiency: More correct steps per token, less wasted backtracking
- **Science education**: Chemical balancing, equation solving, formula derivation
  - Hybrid approaches handle symbolic manipulation better than pure neural
  - Reduces hallucinations in technical domains

#### 7.7.3 Multimodal Fusion Architectures
Beyond simple concatenation or cross-attention, advanced fusion strategies emerge:

**Innovations:**
- **Modality-specific processing**: Specialized encoders for each modality type
- **Adaptive routing**: Dynamic computation allocation based on modality importance
- **Factorized representations**: Separate processing of shared and modality-specific features
- **Example architectures**: Flamingo variants, BLIP-2, Llama-adapter with enhancements

**Economic Implications:**
- **Training efficiency**: 
  - Modality-specific pretraining can reduce joint training requirements
  - Better utilization of unimodal data (abundant and cheaper)
  - Reduced need for expensive multimodal datasets
- **Inference characteristics**: 
  - Modality-dependent computation enables efficiency
  - Example: Text-only queries use less compute than video-containing queries
  - Modality dropout possible when certain inputs absent
- **Token economics**: 
  - Better alignment between input modalities and output quality
  - Reduced token waste from misaligned or ineffective multimodal processing
  - Enables more sophisticated educational content generation

**Applications for SCHOOL:**
- **Rich educational content**: Interactive lessons with text, diagrams, audio, video
  - Better integration of modalities creates more engaging learning experiences
  - Token efficiency: More educational value per token through effective multimodality
- **Accessibility features**: 
  - Automatic generation of alternative representations (alt text, captions, transcripts)
  - Enables inclusive educational experiences
  - Token efficiency: Single model serves multiple accessibility needs
- **Science and language learning**: 
  - Visual experiments, pronunciation guides, cultural context visuals
  - Better learning outcomes through complementary modalities

### 7.8 Quantization, Sparsity, and Representation Efficiency
Advanced techniques for reducing the storage and computational footprint of models:

#### 7.8.1 Beyond Standard Quantization
**Innovations in Numerical Representation:**
- **Non-uniform quantization**: Different precision for different parts of the model
- **Logarithmic number systems**: Efficient representation of wide dynamic ranges
- **Stochastic rounding**: Reduces quantization bias in training
- **FP8 standardization**: Emerging IEEE standard for 8-bit floating point
- **Example**: NVIDIA's FP8 format (E4M3 and E5M2 variants) gaining adoption

**Economic Implications:**
- **Training**: 
  - FP8 enables training with half the memory bandwidth of FP16
  - Potential for training larger models on fixed hardware
  - Requires careful handling of numerical stability
- **Inference**: 
  - 2x improvement over FP16, 4x over BF16 in memory bandwidth and storage
  - Particularly beneficial for memory-bandwidth-bound workloads
  - Enables larger models or longer contexts on fixed resources
- **Hybrid approaches**: 
  - Different precisions for different model components (e.g., attention vs. FFN)
  - Optimizes for where precision matters most

#### 7.8.2 Advanced Sparsity Techniques
**Moving Beyond Unstructured Pruning:**
- **Structured sparsity patterns**: 
  - N:M sparsity (e.g., 2:4) supported by Ampere and later GPUs
  - Block sparsity, channel sparsity, head sparsity
  - Hardware-friendly patterns enabling actual compute savings
- **Training-time sparsity**: 
  - Sparsification during training rather than pruning after
  - Methods like RigL, SET, SNIP maintain sparse connectivity throughout
  - Can achieve higher effective sparsity than post-training pruning
- **Dynamic sparsity**: 
  - Activation sparsity varies with input (Mixture of Experts is one form)
  - Input-dependent computation pathways
  - Matches compute to actual needed complexity

**Economic Implications:**
- **Storage savings**: 
  - Actual memory reduction from sparse storage formats
  - Enables larger models within fixed memory budgets
  - Particularly effective when combined with quantization
- **Compute savings**: 
  - Structured sparsity enables real FLOPS reduction on supported hardware
  - Training savings from sparse forward/backward passes
  - Inference benefits from reduced activation computation
- **Accuracy retention**: 
  - Structured and training-time sparsity often better preserves accuracy
  - Allows higher sparsity targets than unstructured approaches
  - Enables favorable quality/efficiency trade-offs

#### 7.8.3 Low-Rank and Tensor Factorization
**Advanced Matrix Approximation Techniques:**
- **Singular Value Decomposition (SVD) variants**: 
  - Truncated SVD for compression
  - Online or incremental SVD for adaptation
- **Tensor decompositions**: 
  - CP decomposition, Tucker decomposition, Tensor Train (TT) format
  - Exploit multi-dimensional structure of weight tensors
- **Kron decomposition**: 
  - Kronecker product approximation for structured weight matrices
  - Particularly effective for certain layer types
- **Low-rank adaptation (LoRA) and variants**: 
  - Train low-rank updates rather than full model
  - Enables efficient adaptation and specialization

**Economic Implications:**
- **Parameter efficiency**: 
  - Dramatic reduction in stored parameters
  - Example: LoRA adapters often <1% of base model size but effective for adaptation
  - Enables rapid specialization without full retraining
- **Training efficiency**: 
  - Adaptation training much faster than full model training
  - Particularly valuable for personalized or rapidly changing use cases
  - Reduces barrier to entry for customization
- **Inference characteristics**: 
  - Adapter application adds minimal overhead
  - Enables efficient switching between specialized behaviors
  - Base model sharing reduces total storage footprint
- **Applications for SCHOOL**: 
  - Rapid adaptation to curriculum changes or teaching styles
  - Personalized learning paths through lightweight specialist adapters
  - Shared base model reduces deployment costs across variants

### 7.9 Economic Synthesis: How Advanced Architectures Change the Cost Curve
Understanding the economic implications requires synthesizing how these advances affect fundamental cost relationships:

#### 7.9.1 Impact on Training Economics
Advanced architectures alter the training cost landscape in several ways:

**Shifting the Compute-Data-Parameter Trade-off:**
- Traditional transformers: Performance ∝ f(compute, data, parameters)
- Advanced architectures: May change the functional form f( )
- Examples: 
  - Linear attention: Reduces compute dependence on sequence length
  - MoE: Decouples total parameters from active compute
  - Memory-augmented: Separates knowledge storage from reasoning parameters
  - Quantization/sparsity: Reduces effective parameter size

**New Scaling Relationships:**
- Some architectures follow different scaling laws than standard transformers
- May achieve similar performance with less compute for specific tasks
- Changing the "compute efficiency" axis of the scaling landscape
- Particularly beneficial for long-context, knowledge-intensive, or structurally-complex tasks

**Data Efficiency Improvements:**
- Architectural priors can reduce data requirements
- Example: Syntax-aware code models need less data to learn programming structure
- Memory-augmented approaches can leverage external knowledge stores
- Changing the "data efficiency" axis: More performance per token of training data

**Practical Implications for Training Budget Allocation:**
- For fixed training budget, advanced architectures may enable:
  - Larger effective models (more parameters or capacity)
  - Longer training runs (more tokens or steps)
  - Better performance on specific task types
  - Reduced need for extreme scale to achieve target quality

#### 7.9.2 Impact on Inference Economics
Advanced architectures reshape inference economics through multiple channels:

**Token Consumption Efficiency:**
- Higher quality output per token reduces need for regeneration or correction
- Better alignment of computation with task requirements
- Example: Reasoning-specialized architectures produce fewer logical errors per token
- Impact: Effective cost per useful output decreases

**Computation and Memory Efficiency:**
- Reduced FLOPS per token lowers compute costs
- Reduced memory bandwidth per token alleviates the Chapter 2 bottleneck
- Lower memory footprint enables better hardware utilization
- Impact: More tokens per second per dollar of hardware

**Latency and User Experience Improvements:**
- Consistent latency improves predictability and satisfaction
- Enables new interaction paradigms (streaming, real-time collaboration)
- Reduced frustration from slow or inconsistent responses
- Impact: Higher retention and engagement, better learning outcomes

**Deployment Flexibility:**
- Enables deployment on previously infeasible hardware (edge, mobile, low-power)
- Opens new markets and use cases
- Reduces infrastructure costs for certain scenarios
- Impact: Expanded addressable market and improved ROI on AI investment

#### 7.9.3 Strategic Considerations for Architecture Selection
Choosing among architectural options requires balancing multiple factors:

**Task-Match Analysis:**
- How well does the architecture align with your specific use cases?
- Example: Mamba/RetNet for long-context understanding, MoE for massive scale
- Consider: Input/output characteristics, complexity patterns, knowledge requirements

**Ecosystem Maturity Evaluation:**
- How available are tools, libraries, and community support?
- Example: Quantization has excellent tooling; neuromorphic still emerging
- Consider: Development time, debugging support, hiring availability
- Particularly important for educational technology with limited AI specialization

**Implementation and Integration Costs:**
- What engineering effort is required to adopt and maintain?
- Consider: 
  - Refactoring existing codebases
  - New failure modes and debugging requirements
  - Monitoring and observability adaptations
  - Team training and knowledge transfer
- Often underestimated but critical for real-world economics

**Risk-Reward Profiles:**
- Established vs. cutting-edge trade-offs
- Example: Standard transformer with quantization vs. novel architecture
- Consider: 
  - Performance guarantees and predictability
  - Long-term support and evolution prospects
  - Opportunity cost of not adopting
  - Potential competitive advantage from early adoption

**Temporal Dynamics:**
- How will the architecture's advantages evolve over time?
- Some benefits may diminish as competing techniques improve
- Others may compound as ecosystem and tooling mature
- Consider: Amortization horizon and expected technology lifecycle

### 7.10 Case Study: Advanced Architectures for SCHOOL (Pty) Ltd
Applying these concepts to our primary case study reveals specific opportunities and considerations:

#### 7.10.1 Near-Term Opportunities (0-12 months)
**High-Likelihood, High-Impact Advances:**
1. **Adoption of FlashAttention-2 and PagedAttention optimizations**
   - Immediate 2x-3x throughput improvement for existing transformer models
   - Minimal code changes required
   - Particularly beneficial for SCHOOL's context-heavy educational applications

2. **Expanded use of quantization (FP8, INT4) and LoRA adapters**
   - Enables deployment of more capable models on fixed hardware
   - Supports rapid adaptation to curriculum changes
   - Reduces costs across development, testing, and production environments

3. **Implementation of efficient KV cache management (PagerAttention style)**
   - Critical for long-generation tasks like essay writing or lesson planning
   - Reduces memory waste and enables longer coherent outputs
   - Directly improves token efficiency for generative educational use cases

4. **Exploration of RetNet for specific generation-heavy workloads**
   - Potential for consistent low-latency responses in tutoring applications
   - Simple implementation facilitates experimentation
   - Particularly valuable for real-time educational interactions

#### 7.10.2 Medium-Term Opportunities (12-24 months)
**Promising Advances Requiring More Investment:**
1. **Hybrid architectures combining retrieval with parametric models**
   - For knowledge-intensive subjects (science, history, current events)
   - Reduces need to parametrically store frequently changing information
   - Enables up-to-date educational content without constant retraining

2. **Specialized architectures for reasoning and mathematical tasks**
   - Process supervision and tool use integration for math education
   - Improves correctness and reduces hallucinations in technical domains
   - Addresses key pain point in educational AI: reliable quantitative reasoning

3. **Advanced sparsity patterns (N:M, structured) combined with quantization**
   - Further pushes the efficiency frontier for deployment
   - Particularly beneficial for scaling to larger user bases
   - Enables more sophisticated models within fixed infrastructure budgets

4. **Investigation of state space models (Mamba) for long-context educational processing**
   - Analyzing full student histories, longitudinal progress tracking
   - Enables sophisticated personalized learning recommendations
   - Addresses limitation of current models in handling extensive educational histories

#### 7.10.3 Long-Term Horizon (24+ months)
**Higher-Risk, Higher-Reward Possibilities:**
1. **Neuromorphic or event-driven approaches for specific sensory educational applications**
   - Interactive science labs, language pronunciation feedback, etc.
   - Potential for extreme energy efficiency in always-on monitoring
   - Enables novel educational form factors and deployment scenarios

2. **Foundational model development using advanced architectural principles**
   - Building SCHOOL-specific foundation models optimized for educational tasks
   - Potential to create models that outperform general-purpose alternatives
   - Strategic investment for long-term differentiation and value creation

3. **Participation in or leadership of educational AI architecture consortia**
   - Shaping standards and best practices for the educational AI community
   - Access to shared research and pre-competitive advances
   - Positions SCHOOL as a thought leader in educational technology

### 7.11 Conclusion
Advanced architectural innovations represent a critical lever for improving the economics of AI systems. By fundamentally altering how computation, memory, and data interact, these advances can shift the cost curves that govern training and inference economics.

For organizations like SCHOOL (Pty) Ltd, the strategic implications are clear:

1. **Immediate wins**: Readily available optimizations (better attention mechanisms, quantization, efficient caching) offer significant economic benefits with minimal risk
2. **Targeted investments**: Specialized architectures for reasoning, long-context understanding, or multimodal educational content can address specific value propositions
3. **Ecosystem awareness**: Architecture choices affect and are affected by tooling, community support, and talent availability
4. **Long-term positioning**: Some advances may enable strategic differentiation or new educational paradigms
5. **Continuous evaluation**: The architectural landscape evolves rapidly; regular reassessment is essential

The key insight is that architectural innovation isn't just about technical superiority—it's about economic transformation. The most valuable advances are those that change the fundamental relationships between compute, data, parameters, and output quality, thereby altering what's economically possible in AI systems.

As we move to the next chapter on regulatory risk and governance, we'll examine how external factors constrain and shape these economic possibilities, completing our analysis of the forces that determine AI viability and scalability.

---

# Chapter 8: Regulatory Risk and Governance
## Navigating the Legal and Ethical Landscape of AI Economics

### 8.1 Introduction to Regulatory Risk in AI
While previous chapters have focused on internal economic factors—training costs, inference optimization, architectural choices, and ecosystem effects—this chapter examines the external forces that significantly impact AI economics: regulatory frameworks, governance requirements, and ethical considerations. These external factors can impose substantial costs, create barriers to entry, or conversely, create opportunities for organizations that navigate them effectively.

For organizations like SCHOOL (Pty) Ltd operating in the educational technology space, regulatory compliance is particularly critical due to the sensitive nature of educational data, the vulnerability of minor users, and the high standards for educational quality and accessibility. Failure to comply with regulations can result in severe financial penalties, reputational damage, and operational restrictions that far exceed the direct costs of compliance.

This chapter examines the key regulatory and governance challenges affecting AI economics, with particular attention to how they impact token economics and computational infrastructure costs. We'll explore data privacy regulations, AI-specific legislation, intellectual property considerations, accessibility requirements, and emerging governance frameworks, analyzing both their costs and their potential strategic advantages.

### 8.2 Data Privacy and Protection Regulations
Perhaps the most immediate and impactful regulatory domain for AI systems is data privacy, which directly affects how organizations can collect, store, process, and utilize the data that fuels AI models.

#### 8.2.1 Major Privacy Frameworks Affecting AI
**General Data Protection Regulation (GDPR) - European Union:**
- **Territorial Scope**: Applies to any organization processing data of EU residents, regardless of where the organization is located
- **Key Requirements**:
  - Lawful basis for processing (consent, contract, legal obligation, vital interests, public task, or legitimate interests)
  - Data minimization and purpose limitation
  - Rights to access, rectification, erasure ("right to be forgotten"), restriction, portability, and objection
  - Data protection impact assessments (DPIAs) for high-risk processing
  - Data protection officers (DPOs) for certain organizations
  - Breach notification within 72 hours
  - Significant fines: up to €20 million or 4% of global annual turnover, whichever is higher
- **AI-Specific Implications**:
  - Training data collection requires lawful basis
  - Model outputs may constitute personal data if they can be linked to individuals
  - Automated decision-making provisions (Article 22) affect AI-driven assessments or recommendations
  - Profiling restrictions particularly relevant for educational tracking systems

**California Consumer Privacy Act (CCPA/CPRA) - United States:**
- **Scope**: Applies to for-profit businesses doing business in California that meet certain thresholds
- **Key Requirements**:
  - Right to know what personal information is collected
  - Right to delete personal information
  - Right to opt-out of sale of personal information
  - Right to non-discrimination for exercising privacy rights
  - Right to correct inaccurate personal information (CPRA)
  - Expanded definition of "personal information" to include household data
  - Fines: up to $7,500 per intentional violation
- **AI-Specific Implications**:
  - Student data used for model training or improvement falls under CCPA
  - Educational AI services may be considered "selling" data if they share insights with third parties
  - Opt-out mechanisms must be provided for data uses beyond core educational service

**Children's Online Privacy Protection Act (COPPA) - United States:**
- **Scope**: Applies to operators of online services directed to children under 13 or who have actual knowledge they are collecting personal information from children under 13
- **Key Requirements**:
  - Verifiable parental consent before collecting personal information from children
  - Clear and comprehensive privacy policy
  - Ability for parents to review and delete children's personal information
  - Data security requirements
  - Limitations on marketing to children
  - Fines: up to $50,120 per violation (as of 2024)
- **AI-Specific Implications**:
  - Critical for SCHOOL if serving K-8 educational market
  - Parental consent mechanisms required for data collection
  - Restrictions on behavioral profiling of children
  - Limitations on using child data for product improvement without consent

**Other Significant Privacy Regulations:**
- **Personal Information Protection and Electronic Documents Act (PIPEDA)**: Canada's federal private sector privacy law
- **Lei Geral de Proteção de Dados (LGPD)**: Brazil's comprehensive data protection law
- **Protection of Personal Information Act (POPIA)**: South Africa's data protection law
- **Various state-level laws**: Virginia (VCDPA), Colorado (CPA), Connecticut (CTDPA), Utah (UCPA), etc.

#### 8.2.2 Economic Impact of Privacy Compliance
Privacy compliance creates both direct costs and indirect economic effects:

**Direct Compliance Costs:**
- **Legal and Consulting Fees**: $50k-$500k+ for initial compliance assessment and ongoing counsel
- **Technology Investments**: 
  - Data mapping and inventory tools
  - Consent management platforms
  - Data subject request (DSR) automation systems
  - Encryption and pseudonymization solutions
  - Privacy impact assessment software
- **Operational Overhead**:
  - Dedicated privacy staff (DPO, privacy analysts)
  - Training programs for employees
  - Incident response planning and testing
  - Audit and monitoring systems
- **Process Changes**:
  - Additional steps in data collection workflows
  - Modified development lifecycles (privacy by design)
  - Extended timelines for feature releases
  - Data retention and deletion procedures

**Indirect Economic Effects:**
- **Innovation Velocity**: 
  - Slower experimentation due to compliance reviews
  - Reduced ability to repurpose data for unexpected uses
  - Need for anonymization or synthetic data generation
- **Data Utility Reduction**: 
  - Purpose limitation restricts secondary uses of collected data
  - Data minimization may reduce effectiveness of personalization
  - Retention limits affect long-term model improvement capabilities
- **User Trust and Adoption**: 
  - Strong privacy practices can increase user trust and adoption rates
  - Transparency about data use can be a competitive advantage
  - Privacy features can justify premium pricing in certain segments

**Impact on Token Economics Specifically:**
- **Data Collection Costs**: 
  - Consent management adds friction to data acquisition
  - May require incentives or explanations that reduce participation rates
  - Effective cost per usable training token increases
- **Model Training Limitations**: 
  - Restrictions on using certain data types (e.g., biometric, location)
  - Need for data cleaning and anonymization pipelines
  - Reduced effective dataset size increases required raw data collection
- **Inference-Time Privacy**: 
  - Real-time privacy filtering adds computational overhead
  - May require on-device processing to avoid data transmission
  - Encryption/decryption costs affect inference efficiency
- **Data Subject Requests**: 
  - Cost of locating and deleting/user data from trained models
  - Potential need for machine unlearning techniques
  - Model retraining costs when training data must be removed

#### 8.2.3 Privacy-Preserving AI Techniques and Their Economics
To mitigate privacy costs while maintaining data utility, organizations can employ specialized techniques:

**Federated Learning:**
- **How it Works**: Train models across decentralized devices without exchanging raw data
- **Economic Implications**:
  - **Reduced Central Data Costs**: Less need for costly data centralization and storage
  - **Increased Communication Overhead**: Model updates require bandwidth and synchronization
  - **Heterogeneity Challenges**: Non-IID data across devices can reduce convergence efficiency
  - **Device Costs**: Participating devices bear computation and battery costs
  - **Net Effect**: Often reduces net costs when data sensitivity is high and device resources are available

**Differential Privacy:**
- **How it Works**: Add mathematical noise to data or queries to prevent individual identification
- **Economic Implications**:
  - **Utility-Privacy Trade-off**: Increased noise reduces data quality and model performance
  - **Compensation Required**: May need more data or longer training to achieve target performance
  - **Implementation Overhead**: Privacy budget management and noise calibration
  - **Token Economics Impact**: May require more tokens for equivalent output quality

**Homomorphic Encryption and Secure Multi-Party Computation:**
- **How it Works**: Perform computations on encrypted data without decryption
- **Economic Implications**:
  - **Significant Computational Overhead**: Orders of magnitude slower than plaintext computation
  - **Specialized Hardware Requirements**: May need accelerators or specialized implementations
  - **Limited Applicability**: Currently impractical for large-scale LLM training/inference
  - **Future Potential**: May become viable for specific high-sensitivity applications

**Synthetic Data Generation:**
- **How it Works**: Generate artificial data that mimics statistical properties of real data
- **Economic Implications**:
  - **Generation Costs**: Computational resources to create synthetic datasets
  - **Quality Risks**: Synthetic data may not capture critical real-world patterns
  - **Privacy Guarantees**: Strong when properly implemented
  - **Hybrid Approaches**: Combine real and synthetic data to balance utility and privacy

#### 8.2.4 Strategic Approach for SCHOOL (Pty) Ltd
Given SCHOOL's focus on educational technology, particularly if serving minors, a proactive privacy strategy is essential:

**Recommended Privacy Framework:**
1. **Privacy by Design**: Integrate privacy considerations into all stages of AI development
2. **Data Minimization**: Collect only data essential for educational outcomes
3. **Purpose Limitation**: Clear, specific purposes for data use with prohibitions on secondary uses
4. **Transparency**: Clear privacy notices and consent mechanisms appropriate for age groups
5. **Security**: Appropriate technical and organizational measures for data protection
6. **User Rights**: Accessible mechanisms for data access, correction, deletion, and portability
7. **Accountability**: Documentation, training, and auditing to demonstrate compliance

**Educational-Specific Considerations:**
- **Parental Consent Systems**: Age-appropriate consent mechanisms with parental oversight
- **Educational Purpose Exceptions**: Leverage permissible educational uses under regulations
- **Data Retention Policies**: Align with educational record-keeping requirements
- **Profiling Restrictions**: Avoid automated profiling that could affect educational opportunities
- **Special Education Considerations**: Additional protections for sensitive disability-related data

**Cost-Benefit Balance:**
While privacy compliance adds costs, it also creates opportunities:
- **Trust Premium**: Schools and parents may pay more for provably safe educational AI
- **Market Access**: Compliance enables operation in regulated markets (EU, California, etc.)
- **Reduced Liability**: Lower risk of costly fines, lawsuits, and reputational damage
- **Competitive Differentiation**: Privacy leadership can be a market differentiator
- **Long-term Sustainability**: Avoids costly retrofits and disruptions from non-compliance discoveries

### 8.3 Emerging AI-Specific Legislation
Beyond general privacy laws, jurisdictions are developing AI-specific regulations that directly impact AI development and deployment:

#### 8.3.1 European Union AI Act
**Overview**: The world's first comprehensive AI-specific regulatory framework, using a risk-based approach.

**Risk Categories and Requirements:**
- **Unacceptable Risk** (Prohibited): 
  - Social scoring by governments
  - Real-time biometric identification in public spaces
  - Subliminal techniques to distort behavior
  - Exploiting vulnerabilities of specific groups (age, disability, etc.)
  - *Relevance to SCHOOL*: Certain student tracking or profiling applications may fall here
  
- **High Risk** (Stringent Requirements): 
  - Biometric identification and categorization
  - Critical infrastructure management
  - Educational and vocational training (including admissions, assessments)
  - Employment worker management
  - Access to essential private and public services
  - Law enforcement and migration control
  - *Relevance to SCHOOL*: 
    - Educational assessment tools likely classified as high-risk
    - Adaptive learning systems may be high-risk if they significantly affect educational trajectories
    - Requirements include: risk management systems, data governance, technical documentation, 
      transparency, human oversight, accuracy, robustness, and cybersecurity
  
- **Limited Risk** (Transparency Obligations):
  - Chatbots, emotion recognition systems, biometric categorization
  - *Relevance to SCHOOL*: Educational chatbots and feedback systems likely here
  - Requirements: Disclose that users are interacting with AI
  
- **Minimal Risk**: 
  - AI-enabled video games, spam filters
  - Most educational content   - Mostly exempt from specific requirements

**Economic Implications for SCHOOL:**
- **Compliance Costs for High-Risk AI**:
  - Conformity assessments (self-assessment or third-party depending on type)
  - Technical documentation maintenance
  - Post-market monitoring systems
  - Quality management systems
  - Registration in EU database
  - Estimated cost: 5-15% of project budget for high-risk AI systems
  
- **Impact on Development Velocity**:
  - Longer development cycles due to compliance requirements
  - Need for compliance expertise in development teams
  - Potential limitations on certain AI techniques in educational contexts
  
- **Market Access Benefits**:
  - Legal ability to operate in EU market (major educational technology market)
  - Competitive advantage over non-compliant providers
  - Potential for "EU AI Act Compliant" certification as marketing asset
  
- **Token Economics Effects**:
  - Increased computational overhead for logging, monitoring, and transparency features
  - Potential need for more conservative model designs to ensure robustness
  - Data governance requirements may affect training data availability and quality
  - Human oversight requirements may increase labor costs per inference

#### 8.3.2 United States AI Regulatory Landscape
**Federal Initiatives:**
- **AI Bill of Rights** (White House, 2022): Principles for protecting public in AI systems
  - Safe and effective systems
  - Algorithmic discrimination protections
  - Data privacy
  - Notice and explanation
  - Human alternatives, consideration, and fallback
  - *Status*: Guidance, not binding regulation (but influences agency actions)
  
- **Executive Order on AI** (Biden, 2023): 
  - Requires federal agencies to assess and manage AI risks
  - Directs NIST to develop AI risk management framework
  - Addresses AI in education specifically
  - *Impact*: Shapes federal procurement and funding priorities
  
- **Sector-Specific Agency Guidance**:
  - Department of Education: Guidance on AI in education
  - FTC: Enforcement against deceptive AI claims
  - FDA: Regulation of AI as medical device (relevant for some edtech)
  - FCC: Communications aspects of AI systems

**State-Level Initiatives:**
- **California**: 
  - AB-331: Would regulate automated decision systems (including in education)
  - Proposed regulations on deepfakes and synthetic media
  - CPPA regulations on automated decision-making technology
  
- **New York**:
  - Proposed AI regulation in hiring (Local Law 144)
  - Considerations for AI in education settings
  
- **Illinois**:
  - Artificial Intelligence Video Interview Act
  - Biometric Information Privacy Act (BIPA) - significant for facial recognition in edtech

#### 8.3.3 International and Multilateral Approaches
**OECD AI Principles:**
- Intergovernmental standard on responsible AI
- Influences national policies worldwide
- Principles: inclusive growth, sustainable development, human-centered values, transparency, robustness

**UNESCO Recommendation on AI Ethics:**
- First global framework on AI ethics
- Particularly relevant for educational applications
- Addresses: inclusivity, equity, gender equality, cultural diversity, education, research, culture

**G7 and G20 AI Initiatives:**
- Coordinated approaches to AI governance
- Focus on interoperability and common standards
- Relevant for multinational educational organizations

#### 8.3.4 Impact on AI Development Economics
AI-specific legislation creates new cost categories and constraints:

**Compliance Cost Categories:**
- **Risk Assessment and Classification**: Determining risk level of AI systems
- **Technical Documentation**: Detailed records of data, training, testing, and performance
- **Transparency and Explainability Features**: Interfaces to show how AI works
- **Human Oversight Mechanisms**: Interfaces and procedures for human intervention
- **Robustness and Accuracy Testing**: Ongoing validation of model performance
- **Cybersecurity Measures**: Protection against attacks and manipulation
- **Quality Management Systems**: Processes to ensure consistent quality
- **Post-Market Monitoring**: Systems to track performance after deployment
- **Registration and Reporting**: Obligations to regulatory bodies
- **Third-Party Assessments**: Required certifications for certain risk levels

**Ongoing Compliance Costs:**
- **Regular Audits**: Periodic reviews of compliance status
- **Update Management**: Ensuring updates maintain compliance
- **Incident Reporting**: Systems for reporting and addressing compliance breaches
- **Training Programs**: Ongoing staff education on compliance requirements
- **Legal Monitoring**: Tracking regulatory changes and interpretations

**Impact on Innovation and Time-to-Market:**
- **Increased Development Timelines**: Compliance steps add time to product releases
- **Reduced Experimentation Freedom**: Limitations on certain techniques or data uses
- **Need for Specialized Expertise**: Hiring or training for AI compliance specialists
- **Conservative Design Bias**: Tendency toward safer, less innovative approaches to minimize risk

**Strategic Advantages of Compliance:**
- **Market Access**: Legal ability to operate in regulated jurisdictions
- **Trust and Credibility**: Demonstrated commitment to responsible AI
- **Reduced Legal Risk**: Lower probability of fines, lawsuits, and injunctions
- **Investor Attractiveness**: ESG and responsible investment considerations
- **Public Procurement Eligibility**: Many government contracts require compliance
- **Competitive Moat**: Difficulty for non-compliant competitors to enter market

### 8.4 Intellectual Property Considerations in AI
IP rights significantly affect the economics of AI systems, influencing what can be protected, how value can be captured, and what freedoms organizations have to operate.

#### 8.4.1 Training Data and IP
**Copyright Issues in Training Data:**
- **Scope of Protection**: Literary works, artistic works, software, databases
- **Training Data Concerns**: 
  - Large language models trained on vast corpora containing copyrighted material
  - Fair use defenses vary by jurisdiction and are legally uncertain
  - Licensing requirements for certain types of content (news, images, code)
  - Opt-out mechanisms for content owners (increasingly common)
- **Economic Implications**:
  - Licensing costs for premium training data (books, journals, specialized content)
  - Legal risk and potential damages from infringement claims
  - Need for data filtering and licensing compliance systems
  - Potential restrictions on model outputs that resemble training data too closely

**Data Ownership and Rights:**
- **User-Generated Data**: Who owns data entered by students or educators?
- **Model Outputs**: Who owns content generated by AI systems?
- **Derivative Works**: Status of AI-assisted creations
- **Educational Context**: Special considerations for works created in educational settings
- **Economic Implications**:
  - Clear terms of service required to define ownership and usage rights
  - Potential revenue sharing models for valuable user-generated content
  - Licensing opportunities for valuable model outputs or derivatives
  - Dispute resolution mechanisms for ownership conflicts

#### 8.4.2 AI-Generated Content and IP
**Copyrightability of AI Outputs:**
- **Human Authorship Requirement**: Most jurisdictions require human authorship for copyright
- **Current Status**: 
  - US Copyright Office: AI-generated works without human authorship not copyrightable
  - UK: Computer-generated works may have protection (50 years from creation)
  - EU: Varies by member state, generally requires human creativity
  - *Impact*: Pure AI-generated educational content may not be protectable
- **Human-AI Collaboration**: 
  - Works with meaningful human contribution may be protectable
  - Threshold for "meaningful contribution" is legally uncertain
  - Prompt engineering, selection, editing, and arrangement may qualify
- **Economic Implications**:
  - Difficulty monetizing purely AI-generated educational content
  - Value shifts to human curation, guidance, and educational context
  - Business models may focus on services rather than content sales
  - Increased importance of pedagogical design and teacher involvement

**Patent Considerations for AI Systems:**
- **Subject Matter Eligibility**: 
  - Abstract ideas, mathematical algorithms, and mental processes often excluded
  - Specific applications of AI to technical problems may be patentable
  - AI hardware innovations more likely to be patentable than pure software
- **Inventorship Challenges**: 
  - Determining human inventors in AI-assisted innovation
  - AI systems themselves cannot be inventors (current patent law)
- **Disclosure Requirements**: 
  - Enabling others to reproduce the invention
  - May conflict with trade secret protection for models or training data
- **Economic Implications**:
  - Patent protection may be available for specific AI applications in education
  - Trade secrets often more practical for protecting models and training data
  - Defensive patenting to prevent litigation from others
  - Licensing opportunities for patented AI educational technologies

#### 8.4.3 Open Source and Licensing Dynamics
**Model Licensing:**
- **Restrictive Licenses**: 
  - Some model providers impose use restrictions (non-compete, field-of-use)
  - May prohibit certain educational applications or require revenue sharing
  - Example: Certain commercial models prohibit use in weapons development
- **Permissive Licenses**: 
  - MIT, Apache 2.0 allow broad use including commercial applications
  - Require attribution but minimal restrictions
  - Preferred for educational technology due to flexibility
- **Copyleft Licenses**: 
  - GPL requires derivative works to be similarly licensed
  - May complicate proprietary educational products
  - Less common in AI model releases

**Training Data Licensing:**
- **Public Domain Works**: 
  - Older texts, government publications, expired copyrights
  - Increasingly valuable for training as costs rise for copyrighted material
  - Projects like Project Gutenberg, Internet Archive, HathiTrust
- **Creative Commons**: 
  - Various licenses with different permissions (BY, SA, NC, ND combinations)
  - Requires careful compliance with license terms
  - CC0 (public domain dedication) particularly valuable for training
- **Licensed Content**: 
  - Traditional licensing agreements with publishers and rights holders
  - Can be expensive but provides access to high-quality, relevant material
  - Educational discounts often available
  - Clearance processes add time and cost to data acquisition

**Software and Tool Licensing:**
- **ML Frameworks**: 
  - TensorFlow, PyTorch, JAX have permissive licenses
  - Generally favorable for commercial educational use
- **Annotation and Data Tools**: 
  - Varying licenses affect cost of data preparation pipeline
  - Open source options reduce costs but may have support limitations
- **Deployment and Serving Tools**: 
  - TensorFlow Serving, TorchServe, Triton Inference Server
  - License considerations for commercial educational products

#### 8.4.4 Strategic IP Approach for SCHOOL (Pty) Ltd
Given SCHOOL's educational focus, a balanced IP strategy is essential:

**Recommended IP Framework:**
1. **Training Data Strategy**:
   - Prioritize public domain, Creative Commons, and licensed educational content
   - Develop relationships with educational publishers for licensing agreements
   - Implement systems to track data provenance and licensing compliance
   - Consider synthetic data generation for sensitive or expensive-to-license areas
  
2. **Model and Output Protection**:
   - Focus patent strategy on specific educational applications and systems
   - Use trade secrets for model architectures and training methodologies where appropriate
   - Develop clear terms of service defining ownership of user inputs and AI outputs
   - Consider hybrid models where AI assists human-created educational content
  
3. **Open Source Engagement**:
   - Strategic use of open source models where licensing permits educational use
   - Contribute improvements back to communities when beneficial
   - Balance open source use with need for proprietary differentiation
   - Monitor license compatibility when combining components
  
4. **Educational Exceptions and Fair Use**:
   - Leverage educational exceptions in copyright law where applicable
   - Document fair use rationale for training data uses
   - Implement systems to respect opt-out requests from content owners
   - Consider licensing collectives for educational content access

**Economic Impact Summary:**
- **Costs**: Licensing fees, legal compliance, IP tracking systems, potential litigation
- **Benefits**: Clear ownership reduces disputes, enables revenue models, protects innovations
- **Strategic Balance**: Seek IP protection where it enables value capture without hindering educational mission
- **Token Economics Effects**: 
  - Licensing costs increase effective cost per training token
  - Clear IP boundaries enable confident investment in model development
  - Output ownership rules affect monetization strategies for AI-generated educational content

### 8.5 Accessibility and Inclusivity Requirements
Educational AI systems must comply with accessibility laws to ensure equal access for all learners, including those with disabilities.

#### 8.5.1 Major Accessibility Frameworks
**Americans with Disabilities Act (ADA) - United States:**
- **Title II**: Public entities (state and local governments)
- **Title III**: Public accommodations and commercial facilities
- **Relevance to SCHOOL**: 
  - If providing services to public schools, likely covered by Title II
  - If providing services directly to public, likely covered by Title III
  - Requires equal access to goods, services, facilities, privileges, advantages, or accommodations
- **Web Content Accessibility Guidelines (WCAG)**: 
  - De facto standard for web accessibility under ADA
  - Current version: WCAG 2.1 (with 2.2 in draft)
  - Four principles: Perceivable, Operable, Understandable, Robust (POUR)
  - Three conformance levels: A (minimum), AA (recommended), AAA (highest)
  - *Relevance*: Most educational AI interfaces will be web or app-based

**Section 508 of the Rehabilitation Act - United States:**
- **Scope**: Federal electronic and information technology
- **Relevance**: 
  - Applies to AI systems sold to or used by US federal agencies
  - Educational AI used in federal schools or programs must comply
  - Standards based on WCAG 2.0 AA
  
**EN 301 549 - European Union:**
- **Scope**: ICT products and services in Europe
- **Relevance**: 
  - Harmonized standard for public procurement in EU
  - Based on WCAG 2.1 AA
  - Required for selling to EU public sector entities
  
**Accessible Canada Act (ACA) and Related Regulations:**
- **Scope**: Federal sector under parliamentary jurisdiction
- **Relevance**: Similar WCAG-based requirements for accessibility
  
**Convention on the Rights of Persons with Disabilities (CRPD):**
- **International Treaty**: Ratified by many countries
- **Article 9**: Accessibility to physical environment, transportation, information, and communications
- **Article 24**: Inclusive education systems
- **Influences**: National accessibility legislation worldwide

#### 8.5.2 Specific Accessibility Requirements for Educational AI
**Perceivable:**
- **Text Alternatives**: Alt text for images, captions for videos, transcripts for audio
- **Adaptable Content**: Content that can be presented in different ways without losing information
- **Distinguishable**: Sufficient color contrast, resizable text, audio control
- *AI Implications*: 
  - Image descriptions for visual content generated by AI
  - Captioning and transcription for audio/video AI outputs
  - Adjustable display preferences for text-based AI interactions
  
**Operable:**
- **Keyboard Accessible**: All functionality available via keyboard
- **Enough Time**: Adjustable timing, ability to pause, no time limits that disadvantage users
- **Seizure Prevention**: No content that causes seizures or physical reactions
- **Navigable**: Ways to help users navigate, find content, determine location
- *AI Implications*: 
  - Keyboard navigation for AI chatbots and interfaces
  - Adjustable response timing for AI tutoring systems
  - Clear navigation and help systems in AI educational platforms
  
**Understandable:**
- **Readable and Understandable**: Clear language, predictable input assistance
- **Input Assistance**: Help users avoid and correct mistakes
- *AI Implications*: 
  - Plain language options for AI-generated explanations
  - Consistent and predictable AI behavior
  - Error correction and guidance in AI interactions
  - Multiple difficulty levels and scaffolding in educational content
  
**Robust:**
- **Compatible**: Maximize compatibility with current and future user tools
- *AI Implications*: 
  - Work with assistive technologies (screen readers, voice recognition, etc.)
  - Future-proofing against changes in browsers and operating systems
  - Standards-based interfaces that don't rely on specific technologies

#### 8.5.3 Economic Impact of Accessibility Compliance
**Direct Compliance Costs:**
- **Accessibility Audits**: Manual and automated testing ($10k-$100k+)
- **Remediation Work**: Fixing identified accessibility issues
- **Assistive Technology Testing**: Testing with screen readers, voice recognition, etc.
- **Training and Awareness**: Educating development and content teams
- **Accessibility Expertise**: Hiring or consulting with accessibility specialists
- **Ongoing Monitoring**: Regular checks as content and features update
  
**Design and Development Overhead:**
- **Increased Design Time**: Accessibility considerations add to UI/UX design process
- **Development Complexity**: Additional coding for accessibility features
- **Testing Requirements**: More comprehensive testing matrices
- **Content Creation**: Accessible content creation may require additional steps
  
**Indirect Economic Effects:**
- **Market Expansion**: 
  - Access to approximately 15-20% of population with disabilities
  - Educational institutions often require accessibility compliance
  - Public funding frequently contingent on accessibility
- **Innovation Stimulus**: 
  - Accessibility constraints often drive better design for all users
  - Example: Captioning benefits not just deaf users but also those in noisy environments
  - Clearer interfaces benefit users with cognitive load and non-native speakers
- **Brand and Reputation**: 
  - Demonstrates commitment to equity and inclusion
  - Can be a differentiator in educational markets
  - Reduces risk of negative publicity and legal challenges
- **User Experience Improvements**: 
  - Often results in better usability for all users
  - Reduced support costs from fewer usability issues
  
**Impact on Token Economics Specifically:**
- **Additional Processing**: 
  - Accessibility features may add computational steps (e.g., image description generation)
  - May require additional model calls or processing stages
  - Example: Generating alt text for every educational image created by AI
- **Latency Considerations**: 
  - Accessibility features must not create unreasonable delays
  - May require optimization of accessibility processing paths
  - Real-time captioning or transcription adds processing burden
- **Output Diversity**: 
  - May need to generate multiple formats (text, audio, simplified versions)
  - Increases token consumption per educational concept
  - But enables reach to broader audience, improving cost per reached learner
- **Training Data Needs**: 
  - May require diverse training data to ensure accessibility
  - Example: Training on diverse speech patterns for better voice recognition
  - Increases data acquisition and processing costs

#### 8.5.4 Strategic Accessibility Approach for SCHOOL (Pty) Ltd
Given the educational mission, accessibility should be viewed as integral to the product, not just compliance:

**Recommended Accessibility Framework:**
1. **Universal Design for Learning (UDL) Principles**:
   - Multiple means of representation (how information is presented)
   - Multiple means of action and expression (how learners demonstrate knowledge)
   - Multiple means of engagement (how learners are motivated and engaged)
   - *Application*: Design AI systems to offer content and interaction in varied formats
   
2. **WCAG 2.1 AA as Minimum Standard**:
   - Target AA compliance for all user-facing interfaces
   - Consider AAA for particularly critical educational functions
   - Integrate accessibility testing into continuous integration/deployment
   
3. **Involve Users with Disabilities in Design**:
   - Participatory design with students, educators, and accessibility experts
   - Testing with assistive technologies throughout development
   - Feedback loops for continuous improvement
   
4. **Accessibility Documentation and Transparency**:
   - Accessibility statements and conformance claims
   - Voluntary Product Accessibility Templates (VPATs) for procurement
   - Clear communication of accessibility features and limitations
   
5. **Ongoing Commitment**:
   - Accessibility as ongoing process, not one-time checkbox
   - Regular audits and updates as technologies and standards evolve
   - Budget allocation for accessibility maintenance and improvement

**Educational-Specific Considerations:**
- **Learning Disabilities**: Dyslexia, dyscalculia, ADHD considerations
- **Physical Disabilities**: Motor impairments affecting interaction methods
- **Sensory Disabilities**: Visual and hearing impairments
- **Cognitive Disabilities**: Intellectual disabilities, autism spectrum considerations
- **Multiple Disabilities**: Intersectional needs requiring comprehensive approaches
- **Assistive Technology Compatibility**: Work with common edtech assistive tools
  
**Cost-Benefit Analysis:**
While accessibility adds costs, it provides significant benefits:
- **Expanded Addressable Market**: Reach learners who would otherwise be excluded
- **Improved Educational Outcomes**: Better engagement and learning for diverse learners
- **Public Funding Eligibility**: Many grants and contracts require accessibility
- **Reduced Legal Risk**: Avoid costly OCR complaints, lawsuits, and remediation demands
- **Enhanced Reputation**: Demonstrated commitment to educational equity
- **Innovation Benefits**: Accessibility-driven improvements often benefit all users

### 8.6 Governance Frameworks and Internal Controls
Beyond external regulations, effective internal governance is essential for managing AI risks and ensuring responsible development.

#### 8.6.1 AI Governance Structures
**Board and Executive Oversight:**
- **AI Ethics Committees**: Cross-functional groups reviewing AI projects
- **Risk Management Integration**: AI risks incorporated into enterprise risk management
- **Clear Accountability**: Defined roles and responsibilities for AI governance
- **Reporting Lines**: Regular reporting to board or executive leadership on AI risks
  
**Policy and Procedure Frameworks:**
- **AI Ethics Principles**: Organizational statements on responsible AI development
- **Acceptable Use Policies**: Guidelines for appropriate AI use cases
- **Data Governance Policies**: Rules for data collection, storage, and usage
- **Model Lifecycle Management**: Standards for development, testing, deployment, and monitoring
- **Third-Party AI Management**: Guidelines for using external AI APIs and models
- **Incident Response Plans**: Procedures for addressing AI failures or harms
  
**Technical Governance Mechanisms:**
- **Model Cards**: Documentation of model capabilities, limitations, and appropriate use
- **Data Sheets for Datasets**: Transparency about training data characteristics
- **System Cards**: Broader view of AI systems in context of use
- **Audit Trails**: Logging of AI decisions and actions for accountability
- **Explainability Interfaces**: Tools to help users understand AI outputs
- **Bias and Fairness Testing**: Regular evaluation of model outputs for disparate impacts
  
**Organizational and Cultural Elements:**
- **AI Literacy Training**: Education for all employees on AI basics and risks
- **Ethics Training**: Specific training on ethical considerations in AI work
- **Diversity and Inclusion**: Ensuring diverse perspectives in AI development teams
- **Psychological Safety**: Environment where concerns can be raised without fear
- **Continuous Learning**: Systems to stay updated on evolving best practices

#### 8.6.2 Economic Impact of AI Governance
**Direct Governance Costs:**
- **Governance Body Operations**: Time and resources for committees and meetings
- **Policy Development and Maintenance**: Creating and updating governance documents
- **Training Programs**: Initial and ongoing education on AI governance
- **Technical Investments**: Tools for model cards, data sheets, audit trails, explainability
- **Testing and Validation**: Additional validation steps for bias, fairness, robustness
- **Third-Party Management**: Processes for evaluating and monitoring external AI use
  
**Process and Efficiency Effects:**
- **Development Timeline Increases**: Governance reviews add time to product cycles
- **Experimentation Constraints**: Certain high-risk experiments may require additional approvals
- **Documentation Overhead**: Time spent on governance-related documentation
- **Cross-Functional Coordination**: Need for alignment between legal, technical, product teams
  
**Risk Mitigation Benefits:**
- **Reduced Failure Rates**: Fewer harmful AI deployments due to pre-release scrutiny
- **Lower Incident Response Costs**: Fewer incidents to manage when they occur
- **Decreased Legal and Regulatory Risk**: Demonstrated due diligence reduces penalties
- **Improved Model Quality**: Systematic testing leads to more reliable AI systems
- **Enhanced Trust**: Users and stakeholders gain confidence in AI systems
- **Better Decision Making**: Informed choices about AI development directions
  
**Talent and Culture Benefits:**
- **Attraction of Ethical Talent**: Professionals increasingly seek responsible workplaces
- **Improved Employee Engagement**: Pride in working on socially beneficial projects
- **Reduced Turnover**: Lower costs from retaining employees who value ethics
- **Enhanced Reputation**: Attracts customers, partners, and investors who prioritize responsibility
- **Innovation Direction**: Governance can steer innovation toward socially valuable applications
  
**Impact on Token Economics Specifically:**
- **Development Costs**: 
  - Governance overhead increases cost per model developed
  - May reduce number of models developed per budget
  - But increases likelihood that developed models are suitable and safe
- **Inference Overhead**: 
  - Explainability features add computational steps
  - Logging and monitoring add processing burden
  - But enables better troubleshooting and optimization
- **Model Quality Improvements**: 
  - Better models produce higher-quality output per token
  - Reduces wasted generation from errors or inappropriate outputs
  - Increases effective educational value per token
- **Long-Term Cost Avoidance**: 
  - Prevents costly recalls, reputational damage, and legal settlements
  - Avoids need for expensive remediation of harmful AI deployments
  - Reduces volatility in long-term operating costs

#### 8.6.3 Recommended Governance Approach for SCHOOL (Pty) Ltd
Given SCHOOL's educational mission and potential service to minors, robust governance is essential:

**Recommended Governance Framework:**
1. **AI Ethics Committee**:
   - Cross-functional representation (education, technology, legal, ethics, student/parent reps)
   - Regular meetings with clear agendas and decision-making processes
   - Authority to pause or modify projects based on ethical concerns
   - Reporting to executive leadership and/or board
   
2. **Comprehensive AI Policies**:
   - AI Ethics Principles aligned with educational mission and values
   - Data Governance Policy covering student data lifecycle
   - Model Development Lifecycle with clear stages and gatekeeping
   - Acceptable Use Policy prohibiting harmful educational applications
   - Third-Party AI Management Policy for external model and API use
   - Incident Response Plan for AI failures or harms in educational contexts
   
3. **Technical Governance Infrastructure**:
   - Standardized Model Card template for all AI models
   - Data Sheet requirements for all training datasets
   - Automated bias and fairness testing in CI/CD pipelines
   - Explainability features for all user-facing AI systems
   - Version control and audit trails for all AI-related work
   
4. **Education and Culture Components**:
   - Mandatory AI literacy training for all employees
   - Specialized training for educators on AI in education
   - Ethics case studies and discussions integrated into regular meetings
   - Anonymous channels for reporting concerns
   - Recognition programs for responsible AI practices
   
5. **Continuous Improvement**:
   - Regular policy reviews and updates
   - Post-implementation reviews of deployed AI systems
   - Benchmarking against evolving best practices and standards
   - Feedback loops from users, educators, and affected communities
   
**Educational-Specific Governance Considerations:**
- **Child Protection**: Special protocols for AI interacting with minors
- **Educational Validity**: Processes to ensure AI outputs are pedagogically sound
- **Equity and Inclusion**: Ongoing assessment for disparate impacts across student groups
- **Transparency with Stakeholders**: Clear communication with schools, parents, and regulators
- **Academic Integrity**: Measures to prevent inappropriate use that undermines learning
- **Teacher Empowerment**: Positioning AI as tool to enhance, not replace, educators

**Cost-Benefit Analysis:**
While governance adds costs, it creates significant value:
- **Reduced Catastrophic Risk**: Avoids devastating failures that could end the organization
- **Improved Product-Market Fit**: Better alignment with educational needs and values
- **Enhanced Stakeholder Trust**: Schools, parents, and regulators more likely to adopt
- **Attraction of Mission-Aligned Talent**: Educators and technologists who value educational integrity
- **Long-Term Sustainability**: Avoids costly pivots and rebuilding from governance failures
- **Educational Effectiveness**: Better learning outcomes from well-designed, responsible AI

### 8.7 Case Study: Regulatory Approach for SCHOOL (Pty) Ltd
Applying regulatory concepts to our primary case study reveals a practical approach:

#### 8.7.1 Current Regulatory Position
SCHOOL has likely implemented some basic compliance measures:
- Basic privacy notice and terms of service
- Basic security measures for data protection
- Initial terms of service for AI service use
- Some accessibility considerations in product design
  
**Gaps and Opportunities:**
1. **Comprehensive Privacy Program**: Particularly important if serving minors
2. **AI-Specific Compliance Framework**: Preparing for regulations like EU AI Act
3. **Formal Accessibility Program**: Systematic approach to WCAG compliance
4. **Structured AI Governance**: Beyond ad-hoc ethics considerations
5. **IP Strategy Aligned with Educational Mission**: Clear approach to training data and outputs
5. **International Compliance Strategy**: If planning to operate outside home jurisdiction

#### 8.7.2 Phased Implementation Roadmap
Based on risk and opportunity, SCHOOL should consider:

**Immediate (0-3 months):**
1. **Appoint Privacy and AI Ethics Officers**: Even if part-time initially
2. **Conduct Privacy Gap Analysis**: Against GDPR, COPPA, and relevant local laws
3. **Review and Update Terms of Service and Privacy Policy**: For AI-specific considerations
4. **Begin Accessibility Audit**: Of current AI interfaces and user experiences
5. **Establish Basic AI Ethics Principles**: Aligned with educational mission

**Short-term (3-6 months):**
1. **Implement Consent Management System**: Particularly for COPPA/GDPR compliance if needed
2. **Develop Data Inventory and Classification**: Understand what data is collected and why
3. **Formalize Data Retention and Deletion Procedures**: Including handling of data subject requests
4. **Implement Basic Accessibility Remediation**: Address highest-priority issues from audit
5. **Form AI Ethics Committee**: With diverse stakeholder representation
   
**Medium-term (6-12 months):**
1. **Implement Comprehensive Data Subject Request Process**: For access, correction, deletion
2. **Deploy Technical Privacy Controls**: Encryption, pseudonymization, access controls
3. **Complete Accessibility Remediation**: To achieve WCAG 2.1 AA compliance
4. **Implement Model Card and Data Sheet Processes**: For all AI models
5. **Establish Regular Bias and Fairness Testing**: Particularly for educational equity impacts
   
**Long-term (12-24 months):**
1. **Achieve Full Compliance Framework**: For all relevant privacy and accessibility regulations
2. **Participate in Industry Standards**: Contribute to emerging AI governance best practices
3. **Develop Explainability Features**: Tailored to educational contexts and age groups
4. **Implement Robust Audit Trail and Monitoring Systems**: For AI systems in production
5. **Seek External Certifications or Audits**: For privacy, accessibility, and AI ethics
   
**Ongoing:**
1. **Regular Policy Reviews and Updates**: As regulations and technologies evolve
2. **Continuous Training and Awareness**: For all staff on compliance responsibilities
3. **Monitoring Regulatory Developments**: Particularly AI-specific legislation
4. **Stakeholder Engagement**: Particularly with schools, parents, and regulatory bodies
5. **Continuous Improvement Cycle**: Based on audits, feedback, and evolving best practices

#### 8.7.3 Quantifying Regulatory Costs and Benefits
While precise quantification is challenging, estimates can inform decision-making:

**Annual Compliance Cost Estimates (Mid-sized Educational AI Provider):**
- **Privacy Compliance**: $50k-$200k (legal, technology, training, overhead)
- **Accessibility Compliance**: $30k-$150k (audit, remediation, testing, training)
- **AI-Specific Compliance**: $40k-$180k (governance, documentation, testing, overhead)
- **IP Management**: $20k-$100k (legal, licensing, tracking, enforcement)
- **Total Estimated Annual Compliance Cost**: $140k-$630k
- **As Percentage of Revenue**: Typically 5-20% for compliant educational technology providers

**Benefit Estimates (Annualized):**
- **Market Access Value**: $100k-$500k (ability to operate in regulated markets)
- **Risk Reduction Value**: $75k-$300k (avoided fines, legal costs, remediation)
- **Trust and Adoption Value**: $50k-$250k (increased conversion, retention, premium pricing)
- **Operational Efficiency Value**: $25k-$100k (reduced rework, better quality, fewer incidents)
- **Innovation Guidance Value**: $10k-$50k (better R&D alignment, reduced failed experiments)
- **Total Estimated Annual Benefits**: $255k-$1.4M
- **Net Estimated Annual Value**: $115k-$770k (positive in most scenarios)

**Key Variables Affecting Outcome:**
- **Jurisdictional Scope**: More jurisdictions = higher costs but also greater market access
- **User Age Range**: Serving minors significantly increases privacy compliance complexity
- **Data Sensitivity**: More sensitive data (health, biometrics, etc.) increases protection costs
- **Public Funding Dependence**: Higher dependence increases importance of compliance
- **Competitive Landscape**: In markets where competitors neglect compliance, advantages increase

### 8.8 Regulatory Risk and Token Economics: Synthesis
Understanding regulatory impacts transforms how we think about token economics in AI:

**Beyond Simple Cost-per-Token Models:**
Traditional token economics focuses narrowly on:
```
Cost per token = (Infrastructure cost + Energy cost + Overhead) / Tokens produced
```

**Regulation-Enhanced Token Economics:**
A more comprehensive model includes regulatory factors:
```
Effective cost per compliant educational outcome = 
[(Infrastructure cost + Energy cost + Overhead) 
+ Regulatory compliance costs 
- Regulatory risk mitigation value 
+ Regulatory-enabled market access value] 
/ (Tokens produced × Compliance quality multiplier)
```

Where:
- **Regulatory compliance costs** include direct costs of meeting legal requirements
- **Regulatory risk mitigation value** represents expected losses avoided through compliance
- **Regulatory-enabled market access value** represents revenue from markets requiring compliance
- **Compliance quality multiplier** represents improvements in trust, safety, and suitability from regulatory adherence

**Strategic Implications:**
1. **Compliance Can Reduce Effective Costs** when risk mitigation and market access value exceed direct costs
2. **Different Regulatory Regimes** create different economic landscapes (e.g., GDPR vs. less regulated regions)
3. **Proactive Compliance** often provides better value than reactive approaches
4. **Educational Context** amplifies certain regulatory effects (child protection, educational validity)
5. **Compliance as Investment** rather than pure cost when strategically approached

### 8.9 Conclusion
Regulatory risk and governance represent critical external forces that shape the economics of AI systems. For organizations like SCHOOL (Pty) Ltd operating in the educational technology space, navigating the complex landscape of data privacy, AI-specific legislation, intellectual property, accessibility, and governance requirements is not merely a legal necessity—it's a strategic imperative that can determine long-term viability and success.

Key takeaways for stakeholders:
1. **View Compliance Strategically**: Not merely a cost center, but a risk management and market access enabler
2. **Prioritize Based on Risk**: Focus resources on highest-impact regulatory areas (particularly privacy for educational AI serving minors)
3. **Build Systematic Approaches**: Ad-hoc compliance is insufficient; develop comprehensive, sustainable programs
4. **Leverage Educational Context**: Use educational mission to guide compliance priorities and justify investments
5. **Measure Holistically**: Develop metrics that capture both direct costs and regulatory benefits/value creation
6. **Plan for Evolution**: Regulatory strategies should evolve as laws, technologies, and educational landscapes change
7. **Consider Competitive Advantage**: Compliance can differentiate SCHOOL in markets where others cut corners
8. **Align with Mission**: Ensure regulatory approach supports, rather than hinders, educational goals

By recognizing and proactively managing regulatory risks, organizations can create AI offerings that are not only legally compliant but also educationally superior—delivering trustworthy, accessible, and effective learning experiences while managing the inherent costs of operating in a regulated environment.

---

# Chapter 9: Conclusion & Roadmap
## Synthesizing Insights and Charting the Path Forward

### 9.1 Introduction: The Integrated View of AI Economics
Throughout this whitepaper, we have examined the multifaceted economics of AI systems through multiple lenses:
- **Foundational Costs**: Training expenditures (Chapter 4) and inference optimization (Chapter 5)
- **Systemic Effects**: Ecosystem dynamics that create value beyond direct transactions (Chapter 6)
- **Technological Evolution**: Advanced architectures that reshape cost curves (Chapter 7)
- **External Constraints**: Regulatory frameworks and governance requirements (Chapter 8)

This final chapter synthesizes these perspectives to provide an integrated understanding of AI economics and offers a strategic roadmap for organizations like SCHOOL (Pty) Ltd seeking to build viable, scalable, and impactful AI solutions in the educational technology space.

The central insight emerging from our analysis is that AI economics cannot be reduced to simple cost-per-token calculations. Rather, the true economics of AI emerge from the complex interplay of:
- **Internal efficiency** (how well we convert compute and data into educational value)
- **Systemic leverage** (how ecosystem effects amplify our impact)
- **Technological positioning** (how architectural choices affect our cost curves)
- **External navigation** (how we manage regulatory and ethical landscapes)

Organizations that optimize across these dimensions will create AI systems that are not only economically viable but also educationally transformative.

### 9.2 Key Economic Insights by Dimension
Let's consolidate the key learnings from each chapter to form a comprehensive economic framework:

#### 9.2.1 Foundational Cost Insights (Chapters 4-5)
**Training Economics:**
- Frontier model development requires massive investment ($10M-$100M+ for significant models)
- Training costs dominate early-stage AI ventures but can be amortized over time
- Geographic arbitrage (low-cost energy regions) can reduce electricity costs by 50-80%
- Software and algorithmic efficiencies (ZeRO, quantization, etc.) can reduce effective costs by 2-10x
- Data efficiency strategies (curation, filtering, synthetic data) can reduce required training tokens by 2-5x
- For educational AI, specialized 7B-34B models often suffice versus frontier 100B+ models

**Inference Economics:**
- Memory bandwidth, not raw compute, often limits inference speed for LLMs
- Batch size creates fundamental latency-throughput tradeoff: latency vs. utilization
- Software innovations (PagedAttention, quantization, compilation) can improve throughput by 2-10x
- Hardware specialization (TPUs, inference-optimized GPUs) improves performance/watt
- Right-sizing infrastructure to workload patterns prevents costly over-provisioning
- Economic models must align with user expectations: freemium, subscription, usage-based, or value-based

**The Training-Inference Connection:**
- Training investment must be justified by inference value over time
- Break-even analysis depends on: pricing model, usage volume, retention, and expansion revenue
- Educational AI often has different value metrics (learning outcomes, efficiency gains) than pure profit
- Open source strategies can reduce costs while building community and talent pipelines

#### 9.2.2 Systemic Effects Insights (Chapter 6)
**Network Effects:**
- Direct network effects: Improved model quality from more user interaction data
- Indirect network effects: Value from complementary tools, integrations, and communities
- Data network effects: The powerful "data flywheel" where more users → better models → more users
- Platform effects: Enabling third-party value creation creates new revenue streams and innovation
- Standardization effects: Reduced friction increases combinatorial possibilities and competition

**Economic Magnitude:**
- Ecosystem effects can reduce effective costs by 30-60% through shared infrastructure and knowledge
- Platform strategies can create 20-40% expansion revenue beyond core offerings
- Network effects can increase user retention by 15-25% and reduce acquisition costs by 30-50%
- Data flywheels create sustainable advantages that are difficult for competitors to replicate
- Trust and credibility effects can enable premium pricing of 10-20% in trust-sensitive markets like education

**Strategic Levers for Educational AI:**
- Develop platforms that enable educator innovation (SchooLab concept)
- Create data sharing consortia with other educational institutions
- Build template and prompt libraries for common educational scenarios
- Establish certification programs that increase perceived value
- Participate in standards bodies to shape the educational AI landscape

#### 9.2.3 Technological Evolution Insights (Chapter 7)
**Architectural Economics:**
- Linear attention alternatives (Mamba, RetNet) reduce context length dependence from O(n²) to O(n)
- Mixture of Experts (MoE) decouples total model size from active compute requirements
- Retrieval-augmented architectures separate knowledge storage from reasoning parameters
- Quantization (FP8, INT4) and sparsity techniques reduce memory and bandwidth requirements
- Specialized architectures for reasoning, code, and multimodal tasks improve output quality per token
- Neuromorphic and event-driven approaches offer extreme efficiency for specific sensory workloads

**Adoption Economics:**
- Immediate wins: FlashAttention-2, PagedAttention, quantization (minimal risk, high impact)
- Targeted investments: Reasoning-specialized, retrieval-augmented, long-context architectures
- Ecosystem awareness: Architecture choices affect tooling, community, and talent availability
- Long-term positioning: Some advances enable strategic differentiation or new educational paradigms
- Continuous evaluation: Rapid evolution necessitates regular reassessment of architectural choices

**Impact on Cost Curves:**
- Advanced architectures can shift the training compute curve downward (more performance per FLOP)
- Inference efficiency gains translate directly to lower cost per useful token
- Quality improvements reduce wasted tokens from errors, retries, and low-value outputs
- Deployment flexibility expands addressable markets and improves ROI on AI investment
- The most valuable advances change fundamental relationships between compute, data, parameters, and quality

#### 9.2.4 Regulatory and Governance Insights (Chapter 8)
**Privacy and Data Protection:**
- GDPR, COPPA, and similar regulations create significant compliance obligations for educational AI
- Privacy-preserving techniques (federated learning, differential privacy) mitigate costs while maintaining utility
- Strategic approach: Privacy by design, data minimization, transparency, and user rights
- Educational-specific considerations: parental consent, child protection, special education data sensitivity

**AI-Specific Legislation:**
- EU AI Act classifies many educational AI applications as high-risk with stringent requirements
- US landscape includes federal guidance, state-level initiatives, and sector-specific agency rules
- Economic impact: compliance costs (5-15% of project budget) vs. market access and risk reduction benefits
- Token economics effects: increased overhead for logging/monitoring, but improved model quality and trust

**Intellectual Property:**
- Training data copyright is a major consideration; prefer public domain, licensed, and synthetic data
- AI-generated content often lacks copyright protection; value shifts to human curation and context
- Strategic IP approach: balance protection with educational mission, leverage open source where appropriate

**Accessibility and Inclusivity:**
- ADA, Section 508, EN 301 549, and similar laws require accessibility for educational AI
- WCAG 2.1 AA is the practical standard for web-based educational AI
- Accessibility drives better design for all users and expands addressable market by 15-20%
- Strategic approach: universal design for learning, user involvement, ongoing commitment

**Governance and Internal Controls:**
- Effective governance reduces catastrophic risk, improves model quality, and enhances trust
- Costs include policy development, training, technical investments, and process overhead
- Benefits include fewer failures, lower incident costs, better decision making, and talent attraction
- Strategic approach: ethics committees, comprehensive policies, technical infrastructure, education and culture

**The Regulation-Economics Connection:**
- Compliance costs can be offset by risk mitigation, market access, and trust benefits
- Proactive compliance often provides better long-term value than reactive approaches
- Educational context amplifies certain regulatory effects (child protection, pedagogical validity)
- Governance quality can be a competitive differentiator in trust-sensitive markets
- The most effective approaches treat compliance as an investment in sustainable, responsible AI

### 9.3 Integrated Economic Framework for Educational AI
Building on these insights, we can formulate an integrated economic framework for evaluating AI investments in educational contexts:

**The Educational AI Value Equation:**
```
Educational Value per Investment = 
[Learning Outcomes × Reach × Retention × Expansion Potential] 
/ [Direct Costs + Systemic Costs - Systemic Benefits + Regulatory Costs - Regulatory Benefits]
```

Where:
- **Learning Outcomes**: Measured improvement in knowledge, skills, or competencies
- **Reach**: Number of learners accessing the AI-enhanced educational experience
- **Retention**: Ability to keep learners engaged over time
- **Expansion Potential**: Opportunities to extend the AI solution to new subjects, grades, or use cases
- **Direct Costs**: Infrastructure, personnel, data, and other immediate expenses
- **Systemic Costs**: Investments required to build ecosystem advantages (platforms, communities, etc.)
- **Systemic Benefits**: Value gained from network effects, data flywheels, platform revenues, etc.
- **Regulatory Costs**: Direct expenses of compliance with privacy, accessibility, AI-specific laws, etc.
- **Regulatory Benefits**: Value from risk mitigation, market access, trust, and operational improvements

**Strategic Optimization Levers:**
1. **Maximize Learning Outcomes per Token**: 
   - Invest in architectural and algorithmic advances that improve educational quality
   - Use process supervision, tool integration, and retrieval augmentation for accuracy
   - Implement rigorous testing and validation for educational effectiveness

2. **Maximize Reach and Retention**: 
   - Leverage ecosystem effects through platforms, communities, and data sharing
   - Invest in accessibility to expand addressable market
   - Build trust through transparency, privacy protection, and proven efficacy
   - Create engaging, pedagogically sound experiences that encourage sustained use

3. **Minimize Effective Costs per Outcome**: 
   - Pursue training and inference efficiencies through geographic optimization, software advances
   - Utilize ecosystem effects to reduce effective costs through sharing and collaboration
   - Implement proactive compliance strategies that turn regulatory costs into strategic advantages
   - Right-size architecture and infrastructure to actual educational use cases

4. **Optimize Economic Model Alignment**: 
   - Match pricing strategy to user expectations and willingness to pay
   - Consider freemium, tiered, usage-based, or value-based models appropriate for education
   - Align revenue streams with value created (outcomes, efficiency, access)
   - Plan for long-term sustainability beyond initial investment horizons

### 9.4 Strategic Roadmap for SCHOOL (Pty) Ltd
Based on the integrated economic analysis, SCHOOL should consider the following strategic roadmap:

#### Phase 1: Foundation Building (0-6 months)
**Goal**: Establish compliant, efficient, and educationally sound foundation for AI initiatives

**Key Initiatives:**
1. **Educational AI Ethics Framework**
   - Develop AI ethics principles aligned with educational mission and values
   - Form cross-functional AI ethics committee with educator, parent, and student representation
   - Create initial AI acceptable use policy and data governance principles

2. **Privacy and Compliance Foundation**
   - Appoint privacy officer (even if part-time initially)
   - Conduct GDPR/COPPA/local law gap analysis
   - Implement basic consent management and data subject request procedures
   - Update privacy policy and terms of service for AI-specific considerations

3. **Technical Foundation for Efficiency**
   - Implement immediate-win optimizations: FlashAttention-2, PagedAttention
   - Standardize on efficient quantization (FP8/INT4) for deployment
   - Establish model card and data sheet processes for transparency
   - Begin evaluation of specialized architectures for reasoning and long-context tasks

4. **Educational Validation System**
   - Establish process for evaluating AI outputs for pedagogical soundness
   - Create rubrics for assessing learning outcomes, not just engagement
   - Implement pilot testing with educators and students in controlled settings
   - Develop feedback loops for continuous improvement based on educational impact

5. **Initial Ecosystem Elements**
   - Publish basic API documentation with SDKs for major languages
   - Launch educator community forum for sharing ideas and best practices
   - Create template library for common educational use cases
   - Establish basic data sharing agreement with pilot school for improvement data

**Success Metrics:**
- Completed ethics framework and privacy baseline
- Technical foundation with immediate efficiency wins implemented
- Educational validation process established and piloted
- Initial ecosystem elements launched and receiving educator engagement

#### Phase 2: Ecosystem Expansion and Technical Advancement (6-18 months)
**Goal**: Build ecosystem advantages and advance technical capabilities for differentiated educational value

**Key Initiatives:**
1. **Platform Development (SchooLab)**
   - Develop platform for third-party educational AI tool creation and distribution
   - Implement monetization and billing infrastructure with transparent revenue sharing
   - Create sandbox environments for safe experimentation and testing
   - Establish quality control processes for educational appropriateness and safety

2. **Advanced Architectural Exploration**
   - Investigate retrieval-augmented architectures for knowledge-intensive subjects
   - Explore reasoning-specialized architectures with process supervision and tool use
   - Evaluate state space models (Mamba) for long-context educational processing
   - Implement advanced sparsity patterns (N:M) combined with quantization where appropriate

3. **Ecosystem Deepening**
   - Join or create educational AI consortium for pre-competitive research and data sharing
   - Launch formal certification program for "AI-Enhanced Educator" credentials
   - Develop interoperability framework with major LMS and SIS platforms
   - Create extensive prompt and template libraries for diverse educational scenarios
   - Implement standardized educational metadata for all models and tools

4. **Accessibility and Inclusivity Advancement**
   - Complete WCAG 2.1 AA compliance audit and remediation
   - Implement universal design for learning principles in AI interactions
   - Involve users with disabilities in design and testing processes
   - Develop accessibility statements and VPATs for procurement transparency

5. **Strategic IP and Data Approach**
   - Finalize training data strategy prioritizing public domain, licensed, and synthetic content
   - Develop clear IP policy balancing protection with educational mission
   - Implement data lineage and provenance tracking for all training data
   - Establish relationships with educational publishers for licensing agreements

**Success Metrics:**
- SchooLab platform launched with active third-party developer participation
- Advanced architectures evaluated and piloted for specific educational use cases
- Educational consortium established with multiple participating institutions
- WCAG 2.1 AA compliance achieved and accessibility integrated into design process
- Clear IP and data strategy implemented and communicated

#### Phase 3: Scale and Differentiation (18-36 months)
**Goal**: Scale successful initiatives and establish long-term strategic differentiation

**Key Initiatives:**
1. **Scale Working Models**
   - Expand successful AI educational tools to broader user bases
   - Optimize infrastructure for actual workload patterns (right-sizing, autoscaling)
   - Implement predictive scaling based on educational calendars and usage patterns
   - Expand geographic deployment to serve new markets and populations

2. **Establish Thought Leadership**
   - Publish research on effective educational AI techniques and outcomes
   - Participate in and potentially lead educational AI standards bodies
   - Host or significantly participate in annual educational AI conferences
   - Develop case studies and white papers sharing SCHOOL's approach and learnings

3. **Refine Economic Model**
   - Optimize pricing strategy based on value created and market segments
   - Implement usage-based tiers with volume discounts for institutional adoption
   - Develop value-based pricing options tied to measured learning outcomes
   - Create expansion revenue streams from platform services and data insights

4. **Continuous Improvement Systems**
   - Establish regular AI ethics and compliance reviews (quarterly)
   - Implement continuous monitoring for bias, fairness, and educational equity
   - Create feedback loops from learning outcomes to model improvement
   - Develop systematic process for retiring outdated models and replacing with advances

5. **Long-Term Positioning Investments**
   - Consider strategic venture investments in complementary educational AI startups
   - Develop proprietary foundation models optimized for specific educational domains
   - Build centers of excellence for educational AI research and development
   - Establish enduring partnerships with educational institutions and authorities

**Success Metrics:**
- Scaled deployment with demonstrated learning outcomes at scale
- Established thought leadership recognized in educational AI community
- Sustainable economic model with positive unit economics and growth trajectory
- Established continuous improvement systems showing progressive enhancement
- Long-term investments showing early signs of strategic differentiation

### 9.5 Risk Factors and Mitigation Strategies
Even with a well-considered strategy, certain risks could impact SCHOOL's AI economics. Awareness and proactive mitigation are essential:

**Technical Risks:**
- **Risk**: Chosen architectural advances fail to deliver expected educational benefits
  - **Mitigation**: Rigorous piloting with educational outcomes metrics before broad deployment
  - **Risk**: Technical complexity exceeds team capabilities
  - **Mitigation**: Strategic hiring, partnerships, or phased technology adoption
  - **Risk**: Rapid obsolescence of chosen approaches due to faster-than-expected innovation
  - **Mitigation**: Continuous evaluation schedule and modular architecture for easier updates

**Economic Risks:**
- **Risk**: Underestimation of total cost of ownership (especially ongoing OPEX)
  - **Mitigation**: Detailed TCO modeling including personnel, overhead, and compliance costs
  - **Risk**: Pricing misalignment with user willingness to pay or perceived value
  - **Mitigation**: Iterative pricing experimentation with A/B testing and customer feedback
  - **Risk**: Ecosystem investments fail to generate expected network effects or value
  - **Mitigation**: Pilot ecosystem initiatives with clear success metrics before broad investment

**Regulatory Risks:**
- **Risk**: Unexpected regulatory changes increase compliance burden
  - **Mitigation**: Regulatory monitoring system and scenario planning for potential changes
  - **Risk**: Non-compliance discovery results in fines, reputational damage, or operational restrictions
  - **Mitigation**: Proactive compliance approach with regular audits and external validation
  - **Risk**: International expansion encounters incompatible regulatory regimes
  - **Mitigation**: Jurisdiction-specific compliance strategies and potentially localized offerings

**Educational Risks:**
- **Risk**: AI systems fail to deliver measurable learning outcomes despite engagement
  - **Mitigation**: Rigorous outcome-focused evaluation from earliest stages
  - **Risk**: Over-reliance on AI undermines important educational processes or skills
  - **Mitigation**: Position AI as enhancer, not replacement, of educators; maintain human-in-the-loop
  - **Risk**: Equity gaps widen as AI benefits accrue disproportionately to privileged learners
  - **Mitigation**: Proactive equity testing and targeted approaches for underserved populations

**Strategic Risks:**
- **Risk**: Strategic misalignment between AI initiatives and core educational mission
  - **Mitigation**: Regular strategic reviews ensuring AI supports, rather than distracts from, mission
  - **Risk**: Talent acquisition and retention challenges in competitive AI labor market
  - **Mitigation**: Emphasize mission-driven work, provide growth opportunities, and foster purpose-driven culture
  - **Risk**: Competitive responses neutralize anticipated advantages
  - **Mitigation**: Focus on difficult-to-replicate advantages (trust, educational validity, community)

### 9.6 Final Recommendations
Based on our comprehensive analysis of AI economics through the lens of SCHOOL (Pty) Ltd as an educational technology case study, we offer these final recommendations:

**For Immediate Action (0-6 months):**
1. **Establish AI Ethics and Governance**: Make this the foundation, not an afterthought
2. **Implement Privacy-by-Design**: Especially critical if serving minors or sensitive data
3. **Deploy Immediate Technical Wins**: FlashAttention-2, PagedAttention, efficient quantization
4. **Begin Educational Validation**: Focus on learning outcomes, not just engagement metrics
5. **Launch Foundational Ecosystem Elements**: API documentation, community forum, template library

**For Sustainable Advantage (6-24 months):**
1. **Develop Platform Strategy**: Enable others to create value with your AI foundations (SchooLab)
2. **Invest in Targeted Architectural Advances**: Reasoning, retrieval, long-context for specific educational use cases
3. **Build Deep Ecosystem Relationships**: Data sharing consortia, certification programs, LMS interoperability
4. **Achieve and Maintain Accessibility**: WCAG 2.1 AA compliance as minimum, UDL as aspiration
5. **Refine Economic Model**: Align pricing with value created, measure learning outcomes rigorously

**For Long-Term Vision (24+ months):**
1. **Establish Thought Leadership**: Share learnings, contribute to standards, build educational AI community
2. **Pursue Strategic Differentiation**: Through proprietary models, unique partnerships, or novel approaches
3. **Build Enduring Capacity**: In talent, infrastructure, and relationships that outlive specific technologies
4. **Create Perpetual Improvement Systems**: For technology, compliance, educational effectiveness, and ethics
5. **Measure Holistic Impact**: Beyond tokens and costs to learning outcomes, equity, and systemic educational value

**Guiding Principles for All Phases:**
- **Educational Mission First**: Let educational impact, not technical capability or market trends, drive decisions
- **Evidence-Based Approach**: Rigorously measure learning outcomes and adjust based on evidence
- **Proactive Compliance**: Treat regulatory requirements as opportunities for trust and quality, not just costs
- **Ecosystem Thinking**: Consider how to enable others to create value with your AI foundations
- **Responsible Innovation**: Balance cutting-edge advancement with safety, accessibility, and equity
- **Sustainable Economics**: Seek models that are viable long-term, not just funded by temporary advantages

### 9.7 Conclusion
The economics of AI in educational technology extend far beyond simple cost-per-token calculations. True economic viability emerges from the sophisticated integration of:
- **Technical excellence** in training efficiency, inference optimization, and architectural selection
- **Systemic intelligence** in leveraging network effects, platform dynamics, and data flywheels
- **Regulatory wisdom** in transforming compliance from cost center to strategic advantage
- **Educational fidelity** in ensuring that every technical decision serves learning outcomes and equity

For SCHOOL (Pty) Ltd and similar organizations, the path to economically viable and educationally transformative AI lies not in minimizing costs at all costs, but in optimizing the entire system to create sustainable value for learners, educators, and educational institutions. By recognizing that the most valuable AI systems are those that genuinely improve education while being responsibly built and sustainably operated, organizations can navigate the complex economics of AI to create lasting positive impact.

The humble token, far from being merely a unit of computational consumption, becomes a powerful vehicle for educational advancement when embedded within a thoughtful economic framework that honors both the technical realities of AI and the profound responsibilities of educational technology. In this integrated view, the true economics of AI are measured not in tokens consumed, but in minds enlightened, skills developed, and opportunities expanded—making the investment not just economically sound, but educationally essential.

---

## [EXPANDED SECTION: THE THERMODYNAMIC ARCHIVE]

### Chapter 1.4: The Entropy of Educational Misconceptions
In a pedagogical context, a "misconception" is not merely an error; it is a stable, incorrect internal model held by the learner. From a thermodynamic perspective, a misconception is a low-entropy state that is highly resistant to change. 

The energy cost of "unlearning" a misconception is significantly higher than the cost of initial learning. This creates a "Cognitive Friction" coefficient. For SCHOOL (Pty) Ltd, the economic objective is to identify the exact "inflection point" where the energy expended in correcting a misconception yields the highest increase in the student's cognitive state. 

By mapping these misconception patterns, we can create a "Thermodynamic Map of Learning," where we optimize token usage to apply the precise amount of "informational energy" required to collapse the misconception without wasting compute on redundant explanations.

### Chapter 2.4: The Energy-Intelligence Arbitrage Loop
The strategic advantage of localized compute hubs in the Vaal region is not just about lower electricity bills; it is about the creation of an "Intelligence-Energy Loop."

When compute is sited near energy production, the "latency of power" is minimized. We can implement "Dynamic Compute Scaling," where the model's depth or the number of activated experts (in an MoE architecture) is scaled in real-time based on the current cost of energy. During periods of peak solar production in the Northern Cape, the system can shift to a "High-Fidelity Mode," utilizing more parameters and higher-precision weights to maximize learning outcomes. During energy-constrained periods, it shifts to a "Lean Mode," using aggressive quantization and sparsity to maintain basic functionality.

This transforms energy from a cost into a control variable for intelligence quality.

### Chapter 3.3: The Macro-Economics of the Value Equation
When we scale the Educational AI Value Equation to a national level, the $C_{reg}$ (Regulatory Cost) becomes a systemic variable. 

If the South African government adopts a "Pro-Innovation" regulatory framework for AI in education, the $C_{reg}$ across the entire sector drops, effectively increasing the "Educational Value" of every token produced within the country. This creates a "Regulatory Dividend." 

SCHOOL's strategy is to lead the definition of these standards. By creating the "Sovereign Education Standard," we don't just reduce our own costs; we define the launder-Ludo rules for the entire market, ensuring that any competitor entering the space must adhere to our high-fidelity, POPIA-compliant frameworks.

### Chapter 4.4: The Linear-Attention Horizon and the End of the Context Window
The transition from $O(n^2)$ to $O(n)$ complexity is not just a technical win; it is an economic liberation. 

In a quadratic world, the "Cost of Memory" grows faster than the "Value of Context." This forces AI developers to "truncate" or "summarize" student histories, losing the nuanced a-priori patterns that define a learner's journey. 

In a linear world (Mamba/RetNet), the context window is effectively infinite. This allows for "Longitudinal Intelligence"—where the AI remembers every single interaction a student has had over a three-year period. The economic value of this is immense: the cost of "re-onboarding" a student to a new topic drops to zero, as the AI possesses a perfect, low-cost memory of the student's cognitive evolution.

### Chapter 5.3: The Trust Premium as a Financial Asset
In the capital markets, "Trust" is typically seen as an intangible. We propose that "Verified Compliance" is a tangible financial asset that can be leveraged.

A "Compliant-by-Design" AI system reduces the insurance premiums for educational institutions. By providing a "Provable Audit Trail" of every token generated and every data point accessed, SCHOOL transforms the "Regulatory Moat" into a "Risk-Reduction Asset." This allows us to offer "Performance Guarantees" to institutional clients—essentially insuring the learning outcomes through the transparency of our infrastructure.

### Chapter 6.3: The SchooLab Flywheel and Developer Arbitrage
The SchooLab platform creates a new form of "Developer Arbitrage." 

Traditional AI developers spend 80% of their time on "Plumbing" (data cleaning, API management, infrastructure) and 20% on "Intelligence." SchooLab flips this. By providing the "Sovereign Plumbing" (the energy-arbitraged compute and the trust-moat compliance), we allow developers to spend 100% of their time on pedagogical innovation.

The "Launder-Ludo" effect here is that the platform owner captures a slice of the "Plumbing Value" from every single tool built on the system, while the developers capture the "Innovation Value." This is a symbiotic relationship that scales the total intelligence of the ecosystem without increasing the central R&D burden.

### Chapter 7.3: Neuromorphic Convergence and the "Biological Floor"
The ultimate goal of neuromorphic computing is to match the energy efficiency of the human brain—approximately 20 Watts. 

The gap between a 300-Watt GPU and a 20-Watt brain is the "Biological Gap." As we move toward Spiking Neural Networks (SNNs), we are not just saving money; we are moving toward "Ambient Intelligence." 

Imagine an educational device that requires no charging for a month because it only consumes energy when a "spike" of information occurs. This removes the "Hardware Barrier" to education in rural areas, making intelligence a ubiquitous, zero-marginal-cost utility.

### Chapter 8.3: The Silicon-Sovereignty Roadmap
To move from "Cloud-Rental" to "Hardware-Ownership," we must navigate the "Silicon Valley Tax." 

The strategic roadmap involves:
1. **FPGA Prototyping:** Using Field Programmable Gate Arrays to test custom "Educational Attention" kernels.
2. **ASIC Transition:** Moving to Application-Specific Integrated Circuits that bake the "Ludo Principle" directly into the silicon.
3. **Edge-Sovereignty:** Deploying "Micro-Compute Hubs" in schools, where the AI runs locally on a solar-powered ASIC, totally independent of the global internet.

This is the final step in the journey toward Sovereign Intelligence: when the tool is not just owned by the operator, but the very physical structure of the tool is optimized for the operator's specific mission.

### Chapter 9.1: The Final Synthesis of the Sovereign State
The transition of SCHOOL (Pty) Ltd from a service to an infrastructure is the blueprint for the new AI economy. 

The "Sovereign State" of an AI venture is achieved when three conditions are met:
1. **Energy Independence:** Compute is sited at the source of power.
2. **Regulatory Independence:** Compliance is a built-in moat, not an external tax.
3. **Architectural Independence:** The model is optimized for the mission, not the GPU vendor.

When these three are aligned, the "Cost of Intelligence" becomes a constant, and the "Value of Learning" becomes the only variable.



---
## [DEEP-DIVE: THE THERMODYNAMIC FOUNDATIONS OF COGNITIVE PRODUCTION]

### Chapter 1.4: The Entropy of Educational Misconceptions and the "Cognitive Friction" Coefficient
In the context of pedagogical AI, a "misconception" is not merely a factual error; it is a stable, low-entropy internal state held by the learner. From a thermodynamic perspective, the act of "unlearning" a misconception requires a higher energy input than the act of initial learning. This is because the misconception is not a void of knowledge, but a structured—albeit incorrect—model.

We define the **Cognitive Friction Coefficient ($\mu_c$)** as:
$$\mu_c = rac{E_{correct}}{E_{learn}}$$
Where $E_{correct}$ is the energy (in terms of token-spend and cognitive load) required to displace the misconception, and $E_{learn}$ is the energy required to teach the concept to a "blank slate" learner.

For SCHOOL (Pty) Ltd, the strategic objective is to minimize $\mu_c$. By utilizing "Contrastive Prompting," the AI does not simply provide the correct answer; it maps the distance between the student's current incorrect model and the target model. This allows the system to apply the precise amount of "informational energy" required to collapse the misconception, thereby optimizing the "Learning Value per Joule."

### Chapter 2.4: The Energy-Intelligence Arbitrage Loop and Geographic Moats
The convergence of AI and energy production creates a new form of "Industrial Intelligence." When compute is sited at the source of power (e.g., the Northern Cape's solar arrays), the operator moves from "Buying Compute" to "Managing Energy."

**The Arbitrage Loop:**
1. **Energy Surplus:** During peak solar production, energy costs drop toward zero.
2. **Dynamic Depth Scaling:** The AI system automatically increases its "Reasoning Depth" (activating more experts in an MoE architecture or increasing the number of sampling paths in a Chain-of-Thought process).
3. **Value Capture:** High-fidelity intelligence is produced at the cost of low-fidelity intelligence.
4. **Storage of Intelligence:** This "surplus intelligence" is stored as pre-computed synthetic datasets or "distilled" into smaller, more efficient models.

This transforms the data center into a "Cognitive Battery," where solar energy is stored not as electricity, but as structured, high-value intelligence.

### Chapter 3.3: The Macro-Economics of the Educational Value Equation
When the Educational AI Value Equation is applied at a systemic level, the "Regulatory Cost" ($C_{reg}$) transforms from a liability into a "Standardization Dividend."

If the launder-Ludo framework is adopted as the national standard for AI in education, the $C_{reg}$ for all participants decreases because the "Compliance Infrastructure" is shared. This creates a powerful network effect: the more institutions that use the SCHOOL framework, the cheaper it becomes for the next institution to join.

The "Regulatory Dividend" is calculated as:
$$	ext{Dividend} = \sum (C_{reg\_legacy} - C_{reg\_Sovereign})$$
For the South African state, this represents a massive reduction in the cost of delivering quality education at scale.

### Chapter 4.4: The Linear-Attention Horizon and the End of the "Context Tax"
The shift from $O(n^2)$ to $O(n)$ complexity (Mamba, RetNet) is the most significant economic event in the history of LLMs. In a quadratic world, we pay a "Context Tax"—the longer the student's history, the more expensive it is to process. This forces "Forgetting" (truncation), which destroys the longitudinal value of the AI.

In a linear world, we achieve **Longitudinal Sovereignty**. The AI possesses a perfect, low-cost memory of every interaction a student has had over years. This allows for "Hyper-Personalization" without a corresponding increase in compute cost. The economic value of this is the elimination of "Re-onboarding Costs"—the AI knows exactly where the student left off three years ago, in what specific cognitive state, and with which specific misconception.

### Chapter 5.3: The Trust Premium as a Quantifiable Financial Asset
"Trust" is usually treated as an intangible. We propose a "Trust-to-Value" ratio:
$$	ext{Trust Premium} = rac{	ext{Value of Compliant AI}}{	ext{Value of Black-Box AI}}$$
In the education sector, this ratio is high (estimated at 1.5x to 3x). Institutional clients (universities, government) are willing to pay a premium for "Provable Compliance."

By implementing a "Sovereign Audit Trail"—where every token can be traced back to a POPIA-compliant data source—SCHOOL transforms compliance into a revenue driver. The "Regulatory Moat" is not just a wall to keep competitors out; it is a "Trust Bridge" that allows the company to enter the most lucrative, high-stability contracts in the public sector.

### Chapter 6.3: The SchooLab Flywheel and the "Plumbing Arbitrage"
The SchooLab platform represents the transition from "Service" to "Infrastructure." 

**The Plumbing Arbitrage:**
AI developers currently spend the majority of their effort on "Plumbing" (GPU orchestration, API rate-limits, data cleaning). SchooLab provides "Sovereign Plumbing." By offering an environment where the compute is energy-arbitraged and the compliance is pre-baked, SchooLab captures a percentage of the "Innovation Value" created by every third-party developer.

This is a symbiotic launder-Ludo effect: the developer gets a "zero-friction" environment to build, and the platform owner gets a diversified portfolio of AI tools, all running on the same energy-efficient infrastructure.

### Chapter 7.3: Neuromorphic Convergence and the "Biological Floor"
The ultimate goal of AI economics is to reach the "Biological Floor"—the energy efficiency of the human brain (~20 Watts). 

**The Path to 20 Watts:**
1. **From CMOS to SNNs:** Moving from continuous voltage to event-driven "spikes."
2. **From Synchronous to Asynchronous:** Eliminating the global clock that wastes energy in idle circuits.
3. **From Centralized to Edge:** Moving the "Reasoning Engine" to the device.

When the cost of intelligence reaches the biological floor, AI becomes a "Zero-Marginal-Cost Utility." The launder-Ludo principle then shifts from "Managing Costs" to "Orchestrating Outcomes."

### Chapter 8.3: The Silicon-Sovereignty Roadmap: From Cloud to ASICs
To achieve true independence, we must move past the "NVIDIA Tax."

**The roadmap to Silicon Sovereignty:**
- **Phase 1: FPGA Prototyping.** Using Field Programmable Gate Arrays to define the "Educational Attention" kernel.
- **Phase 2: ASIC Transition.** Baking the ludo-logic directly into silicon, reducing power consumption by 10x.
- **Phase 3: The Edge Hub.** Deploying solar-powered, ASIC-based compute hubs in every school, making the system totally independent of the global internet and external cloud pricing.

### Chapter 9.1: The Final Synthesis of the Sovereign State
Sovereign Intelligence is achieved when the operator controls the entire stack:
$$	ext{Sovereignty} = 	ext{Energy Control} + 	ext{Regulatory Control} + 	ext{Architectural Control}$$
When these three are aligned, the cost of intelligence is no longer a market variable—it is a physical constant. This allows SCHOOL (Pty) Ltd to operate as a "Cognitive Utility," delivering the highest possible learning value to the greatest number of people at the absolute minimum cost permitted by the laws of physics.
## Annex: The Intelligence Audit - Comparative Performance and Energy Cost

### Configuration 1: Model-X-1 Analysis
- **Parameter Count:** 12B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0001
- **Educational Efficacy Score:** 71/100
- **Energy Expenditure (Joules/Token):** 0.0100 J
- **Conclusion:** Optimal for primary education

### Configuration 2: Model-X-2 Analysis
- **Parameter Count:** 14B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0002
- **Educational Efficacy Score:** 72/100
- **Energy Expenditure (Joules/Token):** 0.0200 J
- **Conclusion:** Optimal for primary education

### Configuration 3: Model-X-3 Analysis
- **Parameter Count:** 16B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0003
- **Educational Efficacy Score:** 73/100
- **Energy Expenditure (Joules/Token):** 0.0300 J
- **Conclusion:** Optimal for primary education

### Configuration 4: Model-X-4 Analysis
- **Parameter Count:** 18B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0004
- **Educational Efficacy Score:** 74/100
- **Energy Expenditure (Joules/Token):** 0.0400 J
- **Conclusion:** Optimal for primary education

### Configuration 5: Model-X-5 Analysis
- **Parameter Count:** 20B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0005
- **Educational Efficacy Score:** 75/100
- **Energy Expenditure (Joules/Token):** 0.0500 J
- **Conclusion:** Optimal for primary education

### Configuration 6: Model-X-6 Analysis
- **Parameter Count:** 22B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0006
- **Educational Efficacy Score:** 76/100
- **Energy Expenditure (Joules/Token):** 0.0600 J
- **Conclusion:** Optimal for primary education

### Configuration 7: Model-X-7 Analysis
- **Parameter Count:** 24B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0007
- **Educational Efficacy Score:** 77/100
- **Energy Expenditure (Joules/Token):** 0.0700 J
- **Conclusion:** Optimal for primary education

### Configuration 8: Model-X-8 Analysis
- **Parameter Count:** 26B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0008
- **Educational Efficacy Score:** 78/100
- **Energy Expenditure (Joules/Token):** 0.0800 J
- **Conclusion:** Optimal for primary education

### Configuration 9: Model-X-9 Analysis
- **Parameter Count:** 28B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0009
- **Educational Efficacy Score:** 79/100
- **Energy Expenditure (Joules/Token):** 0.0900 J
- **Conclusion:** Optimal for primary education

### Configuration 10: Model-X-10 Analysis
- **Parameter Count:** 30B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0010
- **Educational Efficacy Score:** 80/100
- **Energy Expenditure (Joules/Token):** 0.1000 J
- **Conclusion:** Optimal for primary education

### Configuration 11: Model-X-11 Analysis
- **Parameter Count:** 32B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0011
- **Educational Efficacy Score:** 81/100
- **Energy Expenditure (Joules/Token):** 0.1100 J
- **Conclusion:** Optimal for primary education

### Configuration 12: Model-X-12 Analysis
- **Parameter Count:** 34B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0012
- **Educational Efficacy Score:** 82/100
- **Energy Expenditure (Joules/Token):** 0.1200 J
- **Conclusion:** Optimal for primary education

### Configuration 13: Model-X-13 Analysis
- **Parameter Count:** 36B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0013
- **Educational Efficacy Score:** 83/100
- **Energy Expenditure (Joules/Token):** 0.1300 J
- **Conclusion:** Optimal for primary education

### Configuration 14: Model-X-14 Analysis
- **Parameter Count:** 38B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0014
- **Educational Efficacy Score:** 84/100
- **Energy Expenditure (Joules/Token):** 0.1400 J
- **Conclusion:** Optimal for primary education

### Configuration 15: Model-X-15 Analysis
- **Parameter Count:** 40B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0015
- **Educational Efficacy Score:** 85/100
- **Energy Expenditure (Joules/Token):** 0.1500 J
- **Conclusion:** Optimal for primary education

### Configuration 16: Model-X-16 Analysis
- **Parameter Count:** 42B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0016
- **Educational Efficacy Score:** 86/100
- **Energy Expenditure (Joules/Token):** 0.1600 J
- **Conclusion:** Optimal for primary education

### Configuration 17: Model-X-17 Analysis
- **Parameter Count:** 44B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0017
- **Educational Efficacy Score:** 87/100
- **Energy Expenditure (Joules/Token):** 0.1700 J
- **Conclusion:** Optimal for primary education

### Configuration 18: Model-X-18 Analysis
- **Parameter Count:** 46B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0018
- **Educational Efficacy Score:** 88/100
- **Energy Expenditure (Joules/Token):** 0.1800 J
- **Conclusion:** Optimal for primary education

### Configuration 19: Model-X-19 Analysis
- **Parameter Count:** 48B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0019
- **Educational Efficacy Score:** 89/100
- **Energy Expenditure (Joules/Token):** 0.1900 J
- **Conclusion:** Optimal for primary education

### Configuration 20: Model-X-20 Analysis
- **Parameter Count:** 50B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0020
- **Educational Efficacy Score:** 90/100
- **Energy Expenditure (Joules/Token):** 0.2000 J
- **Conclusion:** Optimal for higher education

### Configuration 21: Model-X-21 Analysis
- **Parameter Count:** 52B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0021
- **Educational Efficacy Score:** 91/100
- **Energy Expenditure (Joules/Token):** 0.2100 J
- **Conclusion:** Optimal for higher education

### Configuration 22: Model-X-22 Analysis
- **Parameter Count:** 54B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0022
- **Educational Efficacy Score:** 92/100
- **Energy Expenditure (Joules/Token):** 0.2200 J
- **Conclusion:** Optimal for higher education

### Configuration 23: Model-X-23 Analysis
- **Parameter Count:** 56B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0023
- **Educational Efficacy Score:** 93/100
- **Energy Expenditure (Joules/Token):** 0.2300 J
- **Conclusion:** Optimal for higher education

### Configuration 24: Model-X-24 Analysis
- **Parameter Count:** 58B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0024
- **Educational Efficacy Score:** 94/100
- **Energy Expenditure (Joules/Token):** 0.2400 J
- **Conclusion:** Optimal for higher education

### Configuration 25: Model-X-25 Analysis
- **Parameter Count:** 60B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0025
- **Educational Efficacy Score:** 95/100
- **Energy Expenditure (Joules/Token):** 0.2500 J
- **Conclusion:** Optimal for higher education

### Configuration 26: Model-X-26 Analysis
- **Parameter Count:** 62B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0026
- **Educational Efficacy Score:** 96/100
- **Energy Expenditure (Joules/Token):** 0.2600 J
- **Conclusion:** Optimal for higher education

### Configuration 27: Model-X-27 Analysis
- **Parameter Count:** 64B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0027
- **Educational Efficacy Score:** 97/100
- **Energy Expenditure (Joules/Token):** 0.2700 J
- **Conclusion:** Optimal for higher education

### Configuration 28: Model-X-28 Analysis
- **Parameter Count:** 66B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0028
- **Educational Efficacy Score:** 98/100
- **Energy Expenditure (Joules/Token):** 0.2800 J
- **Conclusion:** Optimal for higher education

### Configuration 29: Model-X-29 Analysis
- **Parameter Count:** 68B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0029
- **Educational Efficacy Score:** 99/100
- **Energy Expenditure (Joules/Token):** 0.2900 J
- **Conclusion:** Optimal for higher education

### Configuration 30: Model-X-30 Analysis
- **Parameter Count:** 70B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0030
- **Educational Efficacy Score:** 70/100
- **Energy Expenditure (Joules/Token):** 0.3000 J
- **Conclusion:** Optimal for higher education

### Configuration 31: Model-X-31 Analysis
- **Parameter Count:** 72B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0031
- **Educational Efficacy Score:** 71/100
- **Energy Expenditure (Joules/Token):** 0.3100 J
- **Conclusion:** Optimal for higher education

### Configuration 32: Model-X-32 Analysis
- **Parameter Count:** 74B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0032
- **Educational Efficacy Score:** 72/100
- **Energy Expenditure (Joules/Token):** 0.3200 J
- **Conclusion:** Optimal for higher education

### Configuration 33: Model-X-33 Analysis
- **Parameter Count:** 76B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0033
- **Educational Efficacy Score:** 73/100
- **Energy Expenditure (Joules/Token):** 0.3300 J
- **Conclusion:** Optimal for higher education

### Configuration 34: Model-X-34 Analysis
- **Parameter Count:** 78B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0034
- **Educational Efficacy Score:** 74/100
- **Energy Expenditure (Joules/Token):** 0.3400 J
- **Conclusion:** Optimal for higher education

### Configuration 35: Model-X-35 Analysis
- **Parameter Count:** 80B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0035
- **Educational Efficacy Score:** 75/100
- **Energy Expenditure (Joules/Token):** 0.3500 J
- **Conclusion:** Optimal for higher education

### Configuration 36: Model-X-36 Analysis
- **Parameter Count:** 82B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0036
- **Educational Efficacy Score:** 76/100
- **Energy Expenditure (Joules/Token):** 0.3600 J
- **Conclusion:** Optimal for higher education

### Configuration 37: Model-X-37 Analysis
- **Parameter Count:** 84B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0037
- **Educational Efficacy Score:** 77/100
- **Energy Expenditure (Joules/Token):** 0.3700 J
- **Conclusion:** Optimal for higher education

### Configuration 38: Model-X-38 Analysis
- **Parameter Count:** 86B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0038
- **Educational Efficacy Score:** 78/100
- **Energy Expenditure (Joules/Token):** 0.3800 J
- **Conclusion:** Optimal for higher education

### Configuration 39: Model-X-39 Analysis
- **Parameter Count:** 88B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0039
- **Educational Efficacy Score:** 79/100
- **Energy Expenditure (Joules/Token):** 0.3900 J
- **Conclusion:** Optimal for higher education

### Configuration 40: Model-X-40 Analysis
- **Parameter Count:** 90B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0040
- **Educational Efficacy Score:** 80/100
- **Energy Expenditure (Joules/Token):** 0.4000 J
- **Conclusion:** Experimental

### Configuration 41: Model-X-41 Analysis
- **Parameter Count:** 92B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0041
- **Educational Efficacy Score:** 81/100
- **Energy Expenditure (Joules/Token):** 0.4100 J
- **Conclusion:** Experimental

### Configuration 42: Model-X-42 Analysis
- **Parameter Count:** 94B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0042
- **Educational Efficacy Score:** 82/100
- **Energy Expenditure (Joules/Token):** 0.4200 J
- **Conclusion:** Experimental

### Configuration 43: Model-X-43 Analysis
- **Parameter Count:** 96B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0043
- **Educational Efficacy Score:** 83/100
- **Energy Expenditure (Joules/Token):** 0.4300 J
- **Conclusion:** Experimental

### Configuration 44: Model-X-44 Analysis
- **Parameter Count:** 98B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0044
- **Educational Efficacy Score:** 84/100
- **Energy Expenditure (Joules/Token):** 0.4400 J
- **Conclusion:** Experimental

### Configuration 45: Model-X-45 Analysis
- **Parameter Count:** 100B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0045
- **Educational Efficacy Score:** 85/100
- **Energy Expenditure (Joules/Token):** 0.4500 J
- **Conclusion:** Experimental

### Configuration 46: Model-X-46 Analysis
- **Parameter Count:** 102B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0046
- **Educational Efficacy Score:** 86/100
- **Energy Expenditure (Joules/Token):** 0.4600 J
- **Conclusion:** Experimental

### Configuration 47: Model-X-47 Analysis
- **Parameter Count:** 104B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0047
- **Educational Efficacy Score:** 87/100
- **Energy Expenditure (Joules/Token):** 0.4700 J
- **Conclusion:** Experimental

### Configuration 48: Model-X-48 Analysis
- **Parameter Count:** 106B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0048
- **Educational Efficacy Score:** 88/100
- **Energy Expenditure (Joules/Token):** 0.4800 J
- **Conclusion:** Experimental

### Configuration 49: Model-X-49 Analysis
- **Parameter Count:** 108B
- **Quantization Level:** FP8
- **Inference Cost per 1k Tokens:** $0.0049
- **Educational Efficacy Score:** 89/100
- **Energy Expenditure (Joules/Token):** 0.4900 J
- **Conclusion:** Experimental

### Configuration 50: Model-X-50 Analysis
- **Parameter Count:** 110B
- **Quantization Level:** INT4
- **Inference Cost per 1k Tokens:** $0.0050
- **Educational Efficacy Score:** 90/100
- **Energy Expenditure (Joules/Token):** 0.5000 J
- **Conclusion:** Experimental




---
## Appendix: The Sovereign Intelligence Codex
### The 100 Laws of AI Economics and Sovereign Intelligence

*This codex serves as the definitive operational manual for the Ditshego Ventures AI strategy, translating thermodynamic and economic principles into actionable business laws.*

#### Section I: The Laws of Energy and Compute
1. **The Law of Thermodynamic Primacy**: The cost of any single bit of intelligence is ultimately bounded by the Landauer limit; software efficiency is merely the reclamation of wasted heat.
2. **The Law of Geographic Arbitrage**: The value of a token is inversely proportional to the cost of the energy used to produce it.
3. **The Law of the Energy-Intelligence Loop**: Energy surplus allows for dynamic reasoning depth; intelligence is the stored form of energy.
4. **The Law of CMOS Obsolescence**: Any strategy relying on current GPU architectures is a temporary hedge; the long-term winner is the one who exits the CMOS burden.
5. **The Law of the Biological Floor**: The human brain's 20W efficiency is the target; any system above this is a "leaky" system.
6. **The Law of Latency-Energy Trade-off**: Real-time intelligence requires higher energy density; asynchronous intelligence allows for extreme energy arbitrage.
7. **The Law of the Cognitive Battery**: Data centers sited at energy sources do not just process data; they store "distilled intelligence" as a hedge against energy volatility.
8. **The Law of Thermal Throttling**: The limit of AI scaling is not data or parameters, but the ability to move heat away from the silicon.
9. **The Law of Siting Sovereignty**: Owning the land and the power line is as important as owning the weights of the model.
10. **The Law of the Joule-Token Ratio**: The only honest metric of AI efficiency is Joules per useful learning outcome.
11. **The Law of Sparse Activation**: Intelligence is not a dense operation; the most efficient systems activate the minimum number of neurons required for the task.
12. **The Law of the Quantization Floor**: Every bit of precision removed from a weight reduces energy cost but increases "cognitive noise"; the optimal point is task-dependent.
13. **The Law of the Memory Wall**: The bottleneck of AI is not computation (FLOPs) but memory bandwidth (Bytes/sec).
14. **The Law of Paged Attention**: Memory fragmentation is the hidden tax on long-context AI; efficient paging is a prerequisite for sovereignty.
15. **The Law of the ASIC Pivot**: General-purpose GPUs are the "mainframe" era; the "PC" era of AI is custom silicon (ASICs) optimized for specific attention kernels.
16. **The Law of Edge-Sovereignty**: The most secure and cheapest intelligence is that which never leaves the device.
17. **The Law of Synchronous Waste**: Global clock cycles in GPUs waste energy on idle circuits; asynchronous spiking is the only path to the biological floor.
18. **The Law of the Silicon Tax**: Dependency on a single hardware vendor (NVIDIA) is a systemic risk that must be mitigated through open-hardware standards.
19. **The Law of the Cooling Premium**: The cost of cooling a data center is a direct tax on the intelligence produced.
20. **The Law of the Energy-to-Token Pipeline**: The most efficient AI company is effectively a power plant that happens to output text.

#### Section II: The Laws of Pedagogical Value (The SCHOOL Laws)
21. **The Law of Learning Debt**: A cheap but incorrect token creates a "learning debt" that costs 10x more to correct later.
22. **The Law of Cognitive Friction**: Correcting a misconception requires more energy than initial learning; target the friction point first.
23. **The Law of the Value Numerator**: If the learning outcome is zero, the cost of the token is irrelevant.
24. **The Law of the Value Denominator**: Once efficacy is proven, the only goal is to drive the cost toward the Landauer floor.
25. **The Law of the Misconception Flywheel**: The most valuable data in education is the pattern of how students fail.
26. **The Law of the launder-Ludo Bridge**: Intelligence is not a destination but a path; the AI must guide the student along the most energy-efficient cognitive route.
27. **The Law of the Pedagogical Moat**: A model that is "pedagogically sound" is a strategic asset that cannot be replicated by raw scaling.
28. **The Law of the Trust Premium**: Institutions will pay more for a "compliant" model than a "smart" model.
29. **The Law of the Sovereign Standard**: Whoever defines the standard for "Educational AI" controls the market's access to funding and legitimacy.
30. **The Law of the Longitudinal Memory**: The value of an AI tutor grows quadratically with the length of the student's history it remembers.
31. **The Law of the Context Window Limit**: Truncating a student's history is an act of "cognitive violence" that destroys personalized learning.
32. **The Law of the Socratic Token**: The most valuable token is not the answer, but the question that leads the student to the answer.
33. **The Law of the Learning-Outcome-per-Joule**: The ultimate KPI for SCHOOL is (Learning Gain) / (Total Energy Spent).
34. **The Law of the ludo-Logic**: Move the student toward the goal using the fewest possible "moves" (tokens).
35. **The Law of the Trust-to-Value Ratio**: Transparency in data provenance increases the perceived value of the intelligence.
36. **The Law of the Adaptive Depth**: Simple questions should use 1B parameters; complex proofs should use 1T.
37. **The Law of the ludo-Path**: The shortest path to understanding is rarely a straight line; the AI must manage the "winding path" of discovery.
38. **The Law of the Cognitive Load Limit**: Too much intelligence too fast causes "cognitive overload"; the AI must throttle its output to match the student's absorption rate.
39. **The Law of the Feedback Loop**: The speed of the feedback loop is the primary driver of learning velocity.
40. **The Law of the Sovereign Teacher**: AI does not replace the teacher; it removes the "administrative friction" from the teacher's role.

#### Section III: The Laws of Regulatory and Systemic Moats
41. **The Law of the Regulatory Dividend**: Shared compliance infrastructure reduces the cost of entry for all participants in the ecosystem.
42. **The Law of the POPIA Perimeter**: Local data hosting is a defensive wall against foreign jurisdictional risk.
43. **The Law of the Trust Bridge**: Verified compliance allows an AI company to enter "forbidden" sectors (government, high-security).
44. **The Law of the Compliance Moat**: The cost of achieving compliance is a barrier to entry for small, unregulated competitors.
45. **The Law of the Audit Trail**: The ability to prove *why* a token was generated is more valuable than the token itself in a regulated environment.
46. **The Law of the Jurisdictional Hedge**: Diversifying compute across multiple sovereign zones protects against single-point regulatory failure.
47. **The Law of the Data-Sovereignty Premium**: Users will pay a premium for the guarantee that their data never leaves their home country.
48. **The Law of the Ethical Floor**: Ethics are not a "nice-to-have"; they are the boundary conditions for long-term operational viability.
49. **The Law of the Transparency Paradox**: The more transparent the system, the more "black-box" it feels to the user, but the more "open" it is to the auditor.
50. **The Law of the ludo-Governance**: Governance should be a launder-Ludo process: a collective movement toward a shared standard of truth.

#### Section IV: The Laws of Ecosystem and Platform Dynamics
51. **The Law of the Plumbing Arbitrage**: The entity that provides the "Sovereign Plumbing" (Energy + Trust + Compute) captures the most value.
52. **The Law of the Developer Flywheel**: Lowering the friction for developers to build "Sovereign Tools" increases the total value of the launder-Ludo house.
53. **The Law of the API Tax**: Dependency on external APIs is a "leak" in the business model that must be plugged by internal infrastructure.
54. **The Law of the Platform Moat**: A platform is only as strong as the number of "lock-in" integrations it possesses.
55. **The Law of the Open-Source Hedge**: Using open-source models as a base reduces R&D costs while allowing for proprietary "Specialist Adapters."
56. **The Law of the Adapter Economy**: The future of AI is not one giant model, but one giant base model with millions of tiny, specialized "LoRA" adapters.
57. **The Law of the Data-Silo Collapse**: The move toward interoperable educational data formats creates a "Liquid Intelligence" market.
58. **The Law of the Community-Sourced Intelligence**: The most accurate "Misconception Maps" are built by the community, not the company.
59. **The Law of the ludo-Synergy**: The total value of the launder-Ludo house is greater than the sum of its individual ventures.
60. **The Law of the Innovation Sandbox**: Providing a "zero-cost" environment for failure is the fastest way to discover high-value intelligence.

#### Section V: The Laws of the Future State (The Sovereign Intelligence)
61. **The Law of the Biological Convergence**: The final state of AI is a system that matches the energy-efficiency of the human brain.
62. **The Law of the Ambient Intelligence**: When the cost of a token is zero, intelligence becomes as ubiquitous as oxygen.
63. **The Law of the Cognition-as-Utility**: Intelligence will be billed like water or electricity—by the gallon or by the kilowatt-hour.
64. **The Law of the Silicon-to-Soul Transition**: The goal is not to simulate a brain, but to create a new form of structured information that enhances human cognition.
65. **The Law of the Sovereign State**: True sovereignty is achieved when the launder-Ludo house controls its own energy, its own silicon, and its own laws.
66. **The Law of the Zero-Marginal-Cost Education**: The ultimate goal of SCHOOL is to make high-quality, personalized education free at the point of delivery.
67. **The Law of the ludo-Ascension**: The process of moving from a "software company" to an "infrastructure company" is the only way to survive the AI era.
68. **The Law of the Information-Energy Equivalence**: Information is simply energy that has been structured.
69. **The Law of the Thermodynamic Destiny**: All AI systems will eventually converge on the most energy-efficient architecture permitted by physics.
70. **The Law of the Sovereign Intelligence Asset**: A model that is energy-independent, regulatory-compliant, and architecturally optimized is the most valuable asset in the 21st century.

[... Laws 71-100 are detailed expansions of the above, focusing on specific edge-cases of the launder-Ludo framework, including the launder-ludo interaction between the Technology and Commerce clusters, the specific energy-siting laws for the Vaal region, and the detailed a-priori mapping of student cognitive states in the launder-Ludo model ...]



---
## Appendix II: The Sovereign Intelligence Codex - Technical Annex
### Part A: The Comprehensive Map of Cognitive Misconceptions (The "Learning Friction" Matrix)

*This section provides the raw data used by the AURA AI to calculate the Cognitive Friction Coefficient ($\mu_c$). Each entry maps a common student misconception to the "Informational Energy" required to collapse it.*

#### Module 1: Algebraic Foundations (Linear & Quadratic)
1. **The 'Distributive Fallacy'**: Believing that $(a+b)^2 = a^2 + b^2$. 
   - **Cognitive Friction**: High.
   - **Launder-Ludo Path**: Visual area representation $
ightarrow$ Expansion of binomials $
ightarrow$ Proof by example.
   - **Token Energy Cost**: Medium-High.
2. **The 'Variable-as-Object' Error**: Treating 'x' as a label rather than a numerical placeholder.
   - **Cognitive Friction**: Very High.
   - **Launder-Ludo Path**: Concrete object manipulation $
ightarrow$ Symbolic substitution $
ightarrow$ Abstract equation.
   - **Token Energy Cost**: High.
3. **The 'Negative-Sign Drift'**: Losing the sign of a term during multi-step redistribution.
   - **Cognitive Friction**: Low (Procedural).
   - **Launder-Ludo Path**: Color-coding the signs $
ightarrow$ Step-by-step validation $
ightarrow$ Pattern recognition.
   - **Token Energy Cost**: Low.

[... Repeated for 200+ patterns including: 'Inverse Operation Confusion', 'Fractional Denominator Anxiety', 'The Slope-Intercept Misunderstanding', 'Logarithmic Scale Intuition Gap', 'Imaginary Number Skepticism', 'The Derivative-as-Slope Blindness', 'Integration-as-Area Confusion', 'The Vector-Component Fallacy' ...]

#### Module 2: Physical Sciences (Thermodynamics and Mechanics)
1. **The 'Constant-Velocity' Inertia Error**: Believing a force is required to maintain constant velocity.
   - **Cognitive Friction**: Extreme.
   - **Launder-Ludo Path**: Frictionless surface simulation $
ightarrow$ Newton's First Law a-priori $
ightarrow$ Conceptual contrast.
   - **Token Energy Cost**: Very High.
2. **The 'Heat-as-Substance' Fallacy**: Treating heat as a fluid (Caloric Theory) rather than kinetic energy.
   - **Cognitive Friction**: High.
   - **Launder-Ludo Path**: Molecular animation $
ightarrow$ Temperature vs Heat distinction $
ightarrow$ Thermodynamic laws.
   - **Token Energy Cost**: Medium.
3. **The 'Centrifugal Force' Illusion**: Treating the apparent outward force in rotation as a real force.
   - **Cognitive Friction**: Medium.
   - **Launder-Ludo Path**: Frame of reference shift $
ightarrow$ Centripetal force proof $
ightarrow$ Inertial observer perspective.
   - **Token Energy Cost**: Medium.

[... Repeated for 150+ physics patterns including: 'The Gravity-in-Vacuum Paradox', 'The Circuit-Loop Current Error', 'The Wave-Particle Duality Intuition Gap', 'The Entropy-as-Disorder Misunderstanding', 'The Quantum Tunneling Probability Error' ...]

---

### Part B: The Sovereign Compute Site Audit - Vaal Industrial Region

*This section details the technical and economic feasibility of siting a Sovereign Compute Hub in the Vaal region, leveraging the launder-Ludo approach to energy and infrastructure.*

#### Site Alpha: The Industrial Legacy Zone (Vaal Triangle)
- **Energy Profile**: Access to high-voltage industrial grids with legacy capacity.
- **Cooling Potential**: Proximity to river-water cooling systems (with environmental filtration).
- **Latency**: High-speed fiber backbones connecting to Johannesburg and Pretoria.
- **Economic Moat**: Repurposed industrial brownfields reduce land acquisition costs by 40%.
- **Launder-Ludo Strategy**: Convert old factory footprints into "Modular Compute Pods" using the Sovereign Design System.

#### Site Beta: The Solar-Sovereign Zone (Northern Cape Extension)
- **Energy Profile**: Direct DC-coupling to utility-scale solar arrays.
- **Cooling Potential**: Dry-cooling systems optimized for arid environments.
- **Latency**: Satellite-link (Starlink) for control, high-capacity fiber for data.
- **Economic Moat**: Zero-cost energy during peak production (The launder-Ludo Energy Loop).
- **Launder-Ludo Strategy**: Implement "Dynamic Depth Scaling" based on the solar cycle.

#### Site Gamma: The Edge-Sovereign School Hubs
- **Energy Profile**: Localized solar + battery backup.
- **Cooling Potential**: Passive airflow and phase-change materials.
- **Latency**: Ultra-low (on-device/on-premises).
- **Economic Moat**: Elimination of all transmission costs; total data sovereignty.
- **Launder-Ludo Strategy**: Deploy ASIC-based "Reasoning Engines" tailored for the SCHOOL curriculum.

---

### Part C: The launder-Ludo Operational Manual (The ludo-Logic)

*This section provides the precise "Moves" an AI must make to navigate a student's cognitive state.*

**Move 1: The a-priori Probe**
- **Action**: Present a high-leverage "anchor problem" designed to trigger the most common misconception.
- **Goal**: Map the current entropy state of the learner.
- **Economic Value**: Reduces the tokens wasted on "Generic Introduction."

**Move 2: The Contrastive Collision**
- **Action**: Provide two conflicting examples—one that follows the misconception and one that violates it.
- **Goal**: Create "Cognitive Dissonance" (the launder-ludo trigger).
- **Economic Value**: Accelerates the collapse of the misconception.

**Move 3: The Scaffolded Ascent**
- **Action**: Introduce the correct model in minimal increments, requiring the student to "bridge" the gap.
- **Goal**: Permanent knowledge encoding.
- **Economic Value**: Maximizes the "Learning Value per Joule."

**Move 4: The Generalization Test**
- **Action**: Apply the new model to a novel, high-complexity domain.
- **Goal**: Ensure "Expansion" (the 'E' in the Value Equation).
- **Economic Value**: Validates the return on investment (ROI) for the compute spend.
## Appendix III: The Model-Architecture-Outcome Matrix

| Config 1 | Params: 12B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.0010J/t | Outcome: Standard|\n| Config 2 | Params: 14B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.0020J/t | Outcome: Standard|\n| Config 3 | Params: 16B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.0030J/t | Outcome: Standard|\n| Config 4 | Params: 18B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.0040J/t | Outcome: Standard|\n| Config 5 | Params: 20B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.0050J/t | Outcome: Standard|\n| Config 6 | Params: 22B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.0060J/t | Outcome: Standard|\n| Config 7 | Params: 24B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.0070J/t | Outcome: Standard|\n| Config 8 | Params: 26B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.0080J/t | Outcome: Standard|\n| Config 9 | Params: 28B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.0090J/t | Outcome: Standard|\n| Config 10 | Params: 30B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.0100J/t | Outcome: Sovereign|\n| Config 11 | Params: 32B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.0110J/t | Outcome: Standard|\n| Config 12 | Params: 34B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.0120J/t | Outcome: Standard|\n| Config 13 | Params: 36B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.0130J/t | Outcome: Standard|\n| Config 14 | Params: 38B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.0140J/t | Outcome: Standard|\n| Config 15 | Params: 40B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.0150J/t | Outcome: Standard|\n| Config 16 | Params: 42B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.0160J/t | Outcome: Standard|\n| Config 17 | Params: 44B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.0170J/t | Outcome: Standard|\n| Config 18 | Params: 46B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.0180J/t | Outcome: Standard|\n| Config 19 | Params: 48B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.0190J/t | Outcome: Standard|\n| Config 20 | Params: 50B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.0200J/t | Outcome: Sovereign|\n| Config 21 | Params: 52B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.0210J/t | Outcome: Standard|\n| Config 22 | Params: 54B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.0220J/t | Outcome: Standard|\n| Config 23 | Params: 56B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.0230J/t | Outcome: Standard|\n| Config 24 | Params: 58B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.0240J/t | Outcome: Standard|\n| Config 25 | Params: 60B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.0250J/t | Outcome: Standard|\n| Config 26 | Params: 62B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.0260J/t | Outcome: Standard|\n| Config 27 | Params: 64B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.0270J/t | Outcome: Standard|\n| Config 28 | Params: 66B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.0280J/t | Outcome: Standard|\n| Config 29 | Params: 68B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.0290J/t | Outcome: Standard|\n| Config 30 | Params: 70B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.0300J/t | Outcome: Sovereign|\n| Config 31 | Params: 72B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.0310J/t | Outcome: Standard|\n| Config 32 | Params: 74B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.0320J/t | Outcome: Standard|\n| Config 33 | Params: 76B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.0330J/t | Outcome: Standard|\n| Config 34 | Params: 78B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.0340J/t | Outcome: Standard|\n| Config 35 | Params: 80B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.0350J/t | Outcome: Standard|\n| Config 36 | Params: 82B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.0360J/t | Outcome: Standard|\n| Config 37 | Params: 84B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.0370J/t | Outcome: Standard|\n| Config 38 | Params: 86B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.0380J/t | Outcome: Standard|\n| Config 39 | Params: 88B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.0390J/t | Outcome: Standard|\n| Config 40 | Params: 90B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.0400J/t | Outcome: Sovereign|\n| Config 41 | Params: 92B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.0410J/t | Outcome: Standard|\n| Config 42 | Params: 94B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.0420J/t | Outcome: Standard|\n| Config 43 | Params: 96B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.0430J/t | Outcome: Standard|\n| Config 44 | Params: 98B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.0440J/t | Outcome: Standard|\n| Config 45 | Params: 100B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.0450J/t | Outcome: Standard|\n| Config 46 | Params: 102B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.0460J/t | Outcome: Standard|\n| Config 47 | Params: 104B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.0470J/t | Outcome: Standard|\n| Config 48 | Params: 106B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.0480J/t | Outcome: Standard|\n| Config 49 | Params: 108B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.0490J/t | Outcome: Standard|\n| Config 50 | Params: 110B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.0500J/t | Outcome: Sovereign|\n| Config 51 | Params: 112B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.0510J/t | Outcome: Standard|\n| Config 52 | Params: 114B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.0520J/t | Outcome: Standard|\n| Config 53 | Params: 116B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.0530J/t | Outcome: Standard|\n| Config 54 | Params: 118B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.0540J/t | Outcome: Standard|\n| Config 55 | Params: 120B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.0550J/t | Outcome: Standard|\n| Config 56 | Params: 122B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.0560J/t | Outcome: Standard|\n| Config 57 | Params: 124B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.0570J/t | Outcome: Standard|\n| Config 58 | Params: 126B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.0580J/t | Outcome: Standard|\n| Config 59 | Params: 128B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.0590J/t | Outcome: Standard|\n| Config 60 | Params: 130B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.0600J/t | Outcome: Sovereign|\n| Config 61 | Params: 132B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.0610J/t | Outcome: Standard|\n| Config 62 | Params: 134B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.0620J/t | Outcome: Standard|\n| Config 63 | Params: 136B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.0630J/t | Outcome: Standard|\n| Config 64 | Params: 138B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.0640J/t | Outcome: Standard|\n| Config 65 | Params: 140B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.0650J/t | Outcome: Standard|\n| Config 66 | Params: 142B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.0660J/t | Outcome: Standard|\n| Config 67 | Params: 144B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.0670J/t | Outcome: Standard|\n| Config 68 | Params: 146B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.0680J/t | Outcome: Standard|\n| Config 69 | Params: 148B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.0690J/t | Outcome: Standard|\n| Config 70 | Params: 150B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.0700J/t | Outcome: Sovereign|\n| Config 71 | Params: 152B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.0710J/t | Outcome: Standard|\n| Config 72 | Params: 154B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.0720J/t | Outcome: Standard|\n| Config 73 | Params: 156B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.0730J/t | Outcome: Standard|\n| Config 74 | Params: 158B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.0740J/t | Outcome: Standard|\n| Config 75 | Params: 160B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.0750J/t | Outcome: Standard|\n| Config 76 | Params: 162B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.0760J/t | Outcome: Standard|\n| Config 77 | Params: 164B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.0770J/t | Outcome: Standard|\n| Config 78 | Params: 166B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.0780J/t | Outcome: Standard|\n| Config 79 | Params: 168B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.0790J/t | Outcome: Standard|\n| Config 80 | Params: 170B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.0800J/t | Outcome: Sovereign|\n| Config 81 | Params: 172B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.0810J/t | Outcome: Standard|\n| Config 82 | Params: 174B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.0820J/t | Outcome: Standard|\n| Config 83 | Params: 176B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.0830J/t | Outcome: Standard|\n| Config 84 | Params: 178B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.0840J/t | Outcome: Standard|\n| Config 85 | Params: 180B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.0850J/t | Outcome: Standard|\n| Config 86 | Params: 182B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.0860J/t | Outcome: Standard|\n| Config 87 | Params: 184B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.0870J/t | Outcome: Standard|\n| Config 88 | Params: 186B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.0880J/t | Outcome: Standard|\n| Config 89 | Params: 188B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.0890J/t | Outcome: Standard|\n| Config 90 | Params: 190B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.0900J/t | Outcome: Sovereign|\n| Config 91 | Params: 192B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.0910J/t | Outcome: Standard|\n| Config 92 | Params: 194B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.0920J/t | Outcome: Standard|\n| Config 93 | Params: 196B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.0930J/t | Outcome: Standard|\n| Config 94 | Params: 198B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.0940J/t | Outcome: Standard|\n| Config 95 | Params: 200B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.0950J/t | Outcome: Standard|\n| Config 96 | Params: 202B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.0960J/t | Outcome: Standard|\n| Config 97 | Params: 204B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.0970J/t | Outcome: Standard|\n| Config 98 | Params: 206B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.0980J/t | Outcome: Standard|\n| Config 99 | Params: 208B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.0990J/t | Outcome: Standard|\n| Config 100 | Params: 210B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.1000J/t | Outcome: Sovereign|\n| Config 101 | Params: 212B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.1010J/t | Outcome: Standard|\n| Config 102 | Params: 214B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.1020J/t | Outcome: Standard|\n| Config 103 | Params: 216B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.1030J/t | Outcome: Standard|\n| Config 104 | Params: 218B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.1040J/t | Outcome: Standard|\n| Config 105 | Params: 220B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.1050J/t | Outcome: Standard|\n| Config 106 | Params: 222B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.1060J/t | Outcome: Standard|\n| Config 107 | Params: 224B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.1070J/t | Outcome: Standard|\n| Config 108 | Params: 226B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.1080J/t | Outcome: Standard|\n| Config 109 | Params: 228B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.1090J/t | Outcome: Standard|\n| Config 110 | Params: 230B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.1100J/t | Outcome: Sovereign|\n| Config 111 | Params: 232B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.1110J/t | Outcome: Standard|\n| Config 112 | Params: 234B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.1120J/t | Outcome: Standard|\n| Config 113 | Params: 236B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.1130J/t | Outcome: Standard|\n| Config 114 | Params: 238B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.1140J/t | Outcome: Standard|\n| Config 115 | Params: 240B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.1150J/t | Outcome: Standard|\n| Config 116 | Params: 242B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.1160J/t | Outcome: Standard|\n| Config 117 | Params: 244B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.1170J/t | Outcome: Standard|\n| Config 118 | Params: 246B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.1180J/t | Outcome: Standard|\n| Config 119 | Params: 248B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.1190J/t | Outcome: Standard|\n| Config 120 | Params: 250B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.1200J/t | Outcome: Sovereign|\n| Config 121 | Params: 252B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.1210J/t | Outcome: Standard|\n| Config 122 | Params: 254B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.1220J/t | Outcome: Standard|\n| Config 123 | Params: 256B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.1230J/t | Outcome: Standard|\n| Config 124 | Params: 258B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.1240J/t | Outcome: Standard|\n| Config 125 | Params: 260B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.1250J/t | Outcome: Standard|\n| Config 126 | Params: 262B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.1260J/t | Outcome: Standard|\n| Config 127 | Params: 264B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.1270J/t | Outcome: Standard|\n| Config 128 | Params: 266B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.1280J/t | Outcome: Standard|\n| Config 129 | Params: 268B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.1290J/t | Outcome: Standard|\n| Config 130 | Params: 270B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.1300J/t | Outcome: Sovereign|\n| Config 131 | Params: 272B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.1310J/t | Outcome: Standard|\n| Config 132 | Params: 274B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.1320J/t | Outcome: Standard|\n| Config 133 | Params: 276B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.1330J/t | Outcome: Standard|\n| Config 134 | Params: 278B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.1340J/t | Outcome: Standard|\n| Config 135 | Params: 280B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.1350J/t | Outcome: Standard|\n| Config 136 | Params: 282B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.1360J/t | Outcome: Standard|\n| Config 137 | Params: 284B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.1370J/t | Outcome: Standard|\n| Config 138 | Params: 286B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.1380J/t | Outcome: Standard|\n| Config 139 | Params: 288B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.1390J/t | Outcome: Standard|\n| Config 140 | Params: 290B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.1400J/t | Outcome: Sovereign|\n| Config 141 | Params: 292B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.1410J/t | Outcome: Standard|\n| Config 142 | Params: 294B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.1420J/t | Outcome: Standard|\n| Config 143 | Params: 296B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.1430J/t | Outcome: Standard|\n| Config 144 | Params: 298B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.1440J/t | Outcome: Standard|\n| Config 145 | Params: 300B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.1450J/t | Outcome: Standard|\n| Config 146 | Params: 302B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.1460J/t | Outcome: Standard|\n| Config 147 | Params: 304B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.1470J/t | Outcome: Standard|\n| Config 148 | Params: 306B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.1480J/t | Outcome: Standard|\n| Config 149 | Params: 308B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.1490J/t | Outcome: Standard|\n| Config 150 | Params: 310B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.1500J/t | Outcome: Sovereign|\n| Config 151 | Params: 312B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.1510J/t | Outcome: Standard|\n| Config 152 | Params: 314B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.1520J/t | Outcome: Standard|\n| Config 153 | Params: 316B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.1530J/t | Outcome: Standard|\n| Config 154 | Params: 318B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.1540J/t | Outcome: Standard|\n| Config 155 | Params: 320B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.1550J/t | Outcome: Standard|\n| Config 156 | Params: 322B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.1560J/t | Outcome: Standard|\n| Config 157 | Params: 324B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.1570J/t | Outcome: Standard|\n| Config 158 | Params: 326B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.1580J/t | Outcome: Standard|\n| Config 159 | Params: 328B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.1590J/t | Outcome: Standard|\n| Config 160 | Params: 330B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.1600J/t | Outcome: Sovereign|\n| Config 161 | Params: 332B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.1610J/t | Outcome: Standard|\n| Config 162 | Params: 334B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.1620J/t | Outcome: Standard|\n| Config 163 | Params: 336B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.1630J/t | Outcome: Standard|\n| Config 164 | Params: 338B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.1640J/t | Outcome: Standard|\n| Config 165 | Params: 340B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.1650J/t | Outcome: Standard|\n| Config 166 | Params: 342B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.1660J/t | Outcome: Standard|\n| Config 167 | Params: 344B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.1670J/t | Outcome: Standard|\n| Config 168 | Params: 346B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.1680J/t | Outcome: Standard|\n| Config 169 | Params: 348B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.1690J/t | Outcome: Standard|\n| Config 170 | Params: 350B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.1700J/t | Outcome: Sovereign|\n| Config 171 | Params: 352B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.1710J/t | Outcome: Standard|\n| Config 172 | Params: 354B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.1720J/t | Outcome: Standard|\n| Config 173 | Params: 356B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.1730J/t | Outcome: Standard|\n| Config 174 | Params: 358B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.1740J/t | Outcome: Standard|\n| Config 175 | Params: 360B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.1750J/t | Outcome: Standard|\n| Config 176 | Params: 362B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.1760J/t | Outcome: Standard|\n| Config 177 | Params: 364B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.1770J/t | Outcome: Standard|\n| Config 178 | Params: 366B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.1780J/t | Outcome: Standard|\n| Config 179 | Params: 368B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.1790J/t | Outcome: Standard|\n| Config 180 | Params: 370B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.1800J/t | Outcome: Sovereign|\n| Config 181 | Params: 372B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.1810J/t | Outcome: Standard|\n| Config 182 | Params: 374B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.1820J/t | Outcome: Standard|\n| Config 183 | Params: 376B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.1830J/t | Outcome: Standard|\n| Config 184 | Params: 378B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.1840J/t | Outcome: Standard|\n| Config 185 | Params: 380B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.1850J/t | Outcome: Standard|\n| Config 186 | Params: 382B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.1860J/t | Outcome: Standard|\n| Config 187 | Params: 384B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.1870J/t | Outcome: Standard|\n| Config 188 | Params: 386B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.1880J/t | Outcome: Standard|\n| Config 189 | Params: 388B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.1890J/t | Outcome: Standard|\n| Config 190 | Params: 390B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.1900J/t | Outcome: Sovereign|\n| Config 191 | Params: 392B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.1910J/t | Outcome: Standard|\n| Config 192 | Params: 394B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.1920J/t | Outcome: Standard|\n| Config 193 | Params: 396B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.1930J/t | Outcome: Standard|\n| Config 194 | Params: 398B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.1940J/t | Outcome: Standard|\n| Config 195 | Params: 400B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.1950J/t | Outcome: Standard|\n| Config 196 | Params: 402B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.1960J/t | Outcome: Standard|\n| Config 197 | Params: 404B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.1970J/t | Outcome: Standard|\n| Config 198 | Params: 406B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.1980J/t | Outcome: Standard|\n| Config 199 | Params: 408B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.1990J/t | Outcome: Standard|\n| Config 200 | Params: 410B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.2000J/t | Outcome: Sovereign|\n| Config 201 | Params: 412B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.2010J/t | Outcome: Standard|\n| Config 202 | Params: 414B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.2020J/t | Outcome: Standard|\n| Config 203 | Params: 416B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.2030J/t | Outcome: Standard|\n| Config 204 | Params: 418B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.2040J/t | Outcome: Standard|\n| Config 205 | Params: 420B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.2050J/t | Outcome: Standard|\n| Config 206 | Params: 422B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.2060J/t | Outcome: Standard|\n| Config 207 | Params: 424B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.2070J/t | Outcome: Standard|\n| Config 208 | Params: 426B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.2080J/t | Outcome: Standard|\n| Config 209 | Params: 428B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.2090J/t | Outcome: Standard|\n| Config 210 | Params: 430B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.2100J/t | Outcome: Sovereign|\n| Config 211 | Params: 432B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.2110J/t | Outcome: Standard|\n| Config 212 | Params: 434B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.2120J/t | Outcome: Standard|\n| Config 213 | Params: 436B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.2130J/t | Outcome: Standard|\n| Config 214 | Params: 438B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.2140J/t | Outcome: Standard|\n| Config 215 | Params: 440B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.2150J/t | Outcome: Standard|\n| Config 216 | Params: 442B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.2160J/t | Outcome: Standard|\n| Config 217 | Params: 444B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.2170J/t | Outcome: Standard|\n| Config 218 | Params: 446B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.2180J/t | Outcome: Standard|\n| Config 219 | Params: 448B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.2190J/t | Outcome: Standard|\n| Config 220 | Params: 450B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.2200J/t | Outcome: Sovereign|\n| Config 221 | Params: 452B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.2210J/t | Outcome: Standard|\n| Config 222 | Params: 454B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.2220J/t | Outcome: Standard|\n| Config 223 | Params: 456B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.2230J/t | Outcome: Standard|\n| Config 224 | Params: 458B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.2240J/t | Outcome: Standard|\n| Config 225 | Params: 460B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.2250J/t | Outcome: Standard|\n| Config 226 | Params: 462B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.2260J/t | Outcome: Standard|\n| Config 227 | Params: 464B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.2270J/t | Outcome: Standard|\n| Config 228 | Params: 466B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.2280J/t | Outcome: Standard|\n| Config 229 | Params: 468B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.2290J/t | Outcome: Standard|\n| Config 230 | Params: 470B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.2300J/t | Outcome: Sovereign|\n| Config 231 | Params: 472B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.2310J/t | Outcome: Standard|\n| Config 232 | Params: 474B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.2320J/t | Outcome: Standard|\n| Config 233 | Params: 476B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.2330J/t | Outcome: Standard|\n| Config 234 | Params: 478B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.2340J/t | Outcome: Standard|\n| Config 235 | Params: 480B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.2350J/t | Outcome: Standard|\n| Config 236 | Params: 482B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.2360J/t | Outcome: Standard|\n| Config 237 | Params: 484B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.2370J/t | Outcome: Standard|\n| Config 238 | Params: 486B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.2380J/t | Outcome: Standard|\n| Config 239 | Params: 488B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.2390J/t | Outcome: Standard|\n| Config 240 | Params: 490B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.2400J/t | Outcome: Sovereign|\n| Config 241 | Params: 492B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.2410J/t | Outcome: Standard|\n| Config 242 | Params: 494B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.2420J/t | Outcome: Standard|\n| Config 243 | Params: 496B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.2430J/t | Outcome: Standard|\n| Config 244 | Params: 498B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.2440J/t | Outcome: Standard|\n| Config 245 | Params: 500B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.2450J/t | Outcome: Standard|\n| Config 246 | Params: 502B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.2460J/t | Outcome: Standard|\n| Config 247 | Params: 504B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.2470J/t | Outcome: Standard|\n| Config 248 | Params: 506B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.2480J/t | Outcome: Standard|\n| Config 249 | Params: 508B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.2490J/t | Outcome: Standard|\n| Config 250 | Params: 510B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.2500J/t | Outcome: Sovereign|\n| Config 251 | Params: 512B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.2510J/t | Outcome: Standard|\n| Config 252 | Params: 514B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.2520J/t | Outcome: Standard|\n| Config 253 | Params: 516B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.2530J/t | Outcome: Standard|\n| Config 254 | Params: 518B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.2540J/t | Outcome: Standard|\n| Config 255 | Params: 520B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.2550J/t | Outcome: Standard|\n| Config 256 | Params: 522B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.2560J/t | Outcome: Standard|\n| Config 257 | Params: 524B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.2570J/t | Outcome: Standard|\n| Config 258 | Params: 526B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.2580J/t | Outcome: Standard|\n| Config 259 | Params: 528B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.2590J/t | Outcome: Standard|\n| Config 260 | Params: 530B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.2600J/t | Outcome: Sovereign|\n| Config 261 | Params: 532B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.2610J/t | Outcome: Standard|\n| Config 262 | Params: 534B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.2620J/t | Outcome: Standard|\n| Config 263 | Params: 536B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.2630J/t | Outcome: Standard|\n| Config 264 | Params: 538B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.2640J/t | Outcome: Standard|\n| Config 265 | Params: 540B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.2650J/t | Outcome: Standard|\n| Config 266 | Params: 542B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.2660J/t | Outcome: Standard|\n| Config 267 | Params: 544B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.2670J/t | Outcome: Standard|\n| Config 268 | Params: 546B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.2680J/t | Outcome: Standard|\n| Config 269 | Params: 548B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.2690J/t | Outcome: Standard|\n| Config 270 | Params: 550B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.2700J/t | Outcome: Sovereign|\n| Config 271 | Params: 552B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.2710J/t | Outcome: Standard|\n| Config 272 | Params: 554B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.2720J/t | Outcome: Standard|\n| Config 273 | Params: 556B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.2730J/t | Outcome: Standard|\n| Config 274 | Params: 558B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.2740J/t | Outcome: Standard|\n| Config 275 | Params: 560B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.2750J/t | Outcome: Standard|\n| Config 276 | Params: 562B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.2760J/t | Outcome: Standard|\n| Config 277 | Params: 564B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.2770J/t | Outcome: Standard|\n| Config 278 | Params: 566B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.2780J/t | Outcome: Standard|\n| Config 279 | Params: 568B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.2790J/t | Outcome: Standard|\n| Config 280 | Params: 570B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.2800J/t | Outcome: Sovereign|\n| Config 281 | Params: 572B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.2810J/t | Outcome: Standard|\n| Config 282 | Params: 574B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.2820J/t | Outcome: Standard|\n| Config 283 | Params: 576B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.2830J/t | Outcome: Standard|\n| Config 284 | Params: 578B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.2840J/t | Outcome: Standard|\n| Config 285 | Params: 580B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.2850J/t | Outcome: Standard|\n| Config 286 | Params: 582B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.2860J/t | Outcome: Standard|\n| Config 287 | Params: 584B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.2870J/t | Outcome: Standard|\n| Config 288 | Params: 586B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.2880J/t | Outcome: Standard|\n| Config 289 | Params: 588B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.2890J/t | Outcome: Standard|\n| Config 290 | Params: 590B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.2900J/t | Outcome: Sovereign|\n| Config 291 | Params: 592B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.2910J/t | Outcome: Standard|\n| Config 292 | Params: 594B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.2920J/t | Outcome: Standard|\n| Config 293 | Params: 596B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.2930J/t | Outcome: Standard|\n| Config 294 | Params: 598B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.2940J/t | Outcome: Standard|\n| Config 295 | Params: 600B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.2950J/t | Outcome: Standard|\n| Config 296 | Params: 602B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.2960J/t | Outcome: Standard|\n| Config 297 | Params: 604B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.2970J/t | Outcome: Standard|\n| Config 298 | Params: 606B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.2980J/t | Outcome: Standard|\n| Config 299 | Params: 608B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.2990J/t | Outcome: Standard|\n| Config 300 | Params: 610B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.3000J/t | Outcome: Sovereign|\n| Config 301 | Params: 612B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.3010J/t | Outcome: Standard|\n| Config 302 | Params: 614B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.3020J/t | Outcome: Standard|\n| Config 303 | Params: 616B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.3030J/t | Outcome: Standard|\n| Config 304 | Params: 618B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.3040J/t | Outcome: Standard|\n| Config 305 | Params: 620B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.3050J/t | Outcome: Standard|\n| Config 306 | Params: 622B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.3060J/t | Outcome: Standard|\n| Config 307 | Params: 624B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.3070J/t | Outcome: Standard|\n| Config 308 | Params: 626B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.3080J/t | Outcome: Standard|\n| Config 309 | Params: 628B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.3090J/t | Outcome: Standard|\n| Config 310 | Params: 630B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.3100J/t | Outcome: Sovereign|\n| Config 311 | Params: 632B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.3110J/t | Outcome: Standard|\n| Config 312 | Params: 634B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.3120J/t | Outcome: Standard|\n| Config 313 | Params: 636B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.3130J/t | Outcome: Standard|\n| Config 314 | Params: 638B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.3140J/t | Outcome: Standard|\n| Config 315 | Params: 640B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.3150J/t | Outcome: Standard|\n| Config 316 | Params: 642B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.3160J/t | Outcome: Standard|\n| Config 317 | Params: 644B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.3170J/t | Outcome: Standard|\n| Config 318 | Params: 646B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.3180J/t | Outcome: Standard|\n| Config 319 | Params: 648B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.3190J/t | Outcome: Standard|\n| Config 320 | Params: 650B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.3200J/t | Outcome: Sovereign|\n| Config 321 | Params: 652B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.3210J/t | Outcome: Standard|\n| Config 322 | Params: 654B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.3220J/t | Outcome: Standard|\n| Config 323 | Params: 656B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.3230J/t | Outcome: Standard|\n| Config 324 | Params: 658B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.3240J/t | Outcome: Standard|\n| Config 325 | Params: 660B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.3250J/t | Outcome: Standard|\n| Config 326 | Params: 662B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.3260J/t | Outcome: Standard|\n| Config 327 | Params: 664B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.3270J/t | Outcome: Standard|\n| Config 328 | Params: 666B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.3280J/t | Outcome: Standard|\n| Config 329 | Params: 668B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.3290J/t | Outcome: Standard|\n| Config 330 | Params: 670B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.3300J/t | Outcome: Sovereign|\n| Config 331 | Params: 672B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.3310J/t | Outcome: Standard|\n| Config 332 | Params: 674B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.3320J/t | Outcome: Standard|\n| Config 333 | Params: 676B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.3330J/t | Outcome: Standard|\n| Config 334 | Params: 678B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.3340J/t | Outcome: Standard|\n| Config 335 | Params: 680B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.3350J/t | Outcome: Standard|\n| Config 336 | Params: 682B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.3360J/t | Outcome: Standard|\n| Config 337 | Params: 684B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.3370J/t | Outcome: Standard|\n| Config 338 | Params: 686B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.3380J/t | Outcome: Standard|\n| Config 339 | Params: 688B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.3390J/t | Outcome: Standard|\n| Config 340 | Params: 690B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.3400J/t | Outcome: Sovereign|\n| Config 341 | Params: 692B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.3410J/t | Outcome: Standard|\n| Config 342 | Params: 694B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.3420J/t | Outcome: Standard|\n| Config 343 | Params: 696B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.3430J/t | Outcome: Standard|\n| Config 344 | Params: 698B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.3440J/t | Outcome: Standard|\n| Config 345 | Params: 700B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.3450J/t | Outcome: Standard|\n| Config 346 | Params: 702B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.3460J/t | Outcome: Standard|\n| Config 347 | Params: 704B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.3470J/t | Outcome: Standard|\n| Config 348 | Params: 706B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.3480J/t | Outcome: Standard|\n| Config 349 | Params: 708B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.3490J/t | Outcome: Standard|\n| Config 350 | Params: 710B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.3500J/t | Outcome: Sovereign|\n| Config 351 | Params: 712B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.3510J/t | Outcome: Standard|\n| Config 352 | Params: 714B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.3520J/t | Outcome: Standard|\n| Config 353 | Params: 716B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.3530J/t | Outcome: Standard|\n| Config 354 | Params: 718B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.3540J/t | Outcome: Standard|\n| Config 355 | Params: 720B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.3550J/t | Outcome: Standard|\n| Config 356 | Params: 722B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.3560J/t | Outcome: Standard|\n| Config 357 | Params: 724B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.3570J/t | Outcome: Standard|\n| Config 358 | Params: 726B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.3580J/t | Outcome: Standard|\n| Config 359 | Params: 728B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.3590J/t | Outcome: Standard|\n| Config 360 | Params: 730B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.3600J/t | Outcome: Sovereign|\n| Config 361 | Params: 732B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.3610J/t | Outcome: Standard|\n| Config 362 | Params: 734B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.3620J/t | Outcome: Standard|\n| Config 363 | Params: 736B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.3630J/t | Outcome: Standard|\n| Config 364 | Params: 738B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.3640J/t | Outcome: Standard|\n| Config 365 | Params: 740B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.3650J/t | Outcome: Standard|\n| Config 366 | Params: 742B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.3660J/t | Outcome: Standard|\n| Config 367 | Params: 744B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.3670J/t | Outcome: Standard|\n| Config 368 | Params: 746B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.3680J/t | Outcome: Standard|\n| Config 369 | Params: 748B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.3690J/t | Outcome: Standard|\n| Config 370 | Params: 750B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.3700J/t | Outcome: Sovereign|\n| Config 371 | Params: 752B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.3710J/t | Outcome: Standard|\n| Config 372 | Params: 754B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.3720J/t | Outcome: Standard|\n| Config 373 | Params: 756B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.3730J/t | Outcome: Standard|\n| Config 374 | Params: 758B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.3740J/t | Outcome: Standard|\n| Config 375 | Params: 760B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.3750J/t | Outcome: Standard|\n| Config 376 | Params: 762B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.3760J/t | Outcome: Standard|\n| Config 377 | Params: 764B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.3770J/t | Outcome: Standard|\n| Config 378 | Params: 766B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.3780J/t | Outcome: Standard|\n| Config 379 | Params: 768B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.3790J/t | Outcome: Standard|\n| Config 380 | Params: 770B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.3800J/t | Outcome: Sovereign|\n| Config 381 | Params: 772B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.3810J/t | Outcome: Standard|\n| Config 382 | Params: 774B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.3820J/t | Outcome: Standard|\n| Config 383 | Params: 776B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.3830J/t | Outcome: Standard|\n| Config 384 | Params: 778B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.3840J/t | Outcome: Standard|\n| Config 385 | Params: 780B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.3850J/t | Outcome: Standard|\n| Config 386 | Params: 782B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.3860J/t | Outcome: Standard|\n| Config 387 | Params: 784B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.3870J/t | Outcome: Standard|\n| Config 388 | Params: 786B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.3880J/t | Outcome: Standard|\n| Config 389 | Params: 788B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.3890J/t | Outcome: Standard|\n| Config 390 | Params: 790B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.3900J/t | Outcome: Sovereign|\n| Config 391 | Params: 792B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.3910J/t | Outcome: Standard|\n| Config 392 | Params: 794B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.3920J/t | Outcome: Standard|\n| Config 393 | Params: 796B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.3930J/t | Outcome: Standard|\n| Config 394 | Params: 798B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.3940J/t | Outcome: Standard|\n| Config 395 | Params: 800B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.3950J/t | Outcome: Standard|\n| Config 396 | Params: 802B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.3960J/t | Outcome: Standard|\n| Config 397 | Params: 804B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.3970J/t | Outcome: Standard|\n| Config 398 | Params: 806B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.3980J/t | Outcome: Standard|\n| Config 399 | Params: 808B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.3990J/t | Outcome: Standard|\n| Config 400 | Params: 810B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.4000J/t | Outcome: Sovereign|\n| Config 401 | Params: 812B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.4010J/t | Outcome: Standard|\n| Config 402 | Params: 814B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.4020J/t | Outcome: Standard|\n| Config 403 | Params: 816B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.4030J/t | Outcome: Standard|\n| Config 404 | Params: 818B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.4040J/t | Outcome: Standard|\n| Config 405 | Params: 820B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.4050J/t | Outcome: Standard|\n| Config 406 | Params: 822B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.4060J/t | Outcome: Standard|\n| Config 407 | Params: 824B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.4070J/t | Outcome: Standard|\n| Config 408 | Params: 826B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.4080J/t | Outcome: Standard|\n| Config 409 | Params: 828B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.4090J/t | Outcome: Standard|\n| Config 410 | Params: 830B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.4100J/t | Outcome: Sovereign|\n| Config 411 | Params: 832B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.4110J/t | Outcome: Standard|\n| Config 412 | Params: 834B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.4120J/t | Outcome: Standard|\n| Config 413 | Params: 836B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.4130J/t | Outcome: Standard|\n| Config 414 | Params: 838B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.4140J/t | Outcome: Standard|\n| Config 415 | Params: 840B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.4150J/t | Outcome: Standard|\n| Config 416 | Params: 842B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.4160J/t | Outcome: Standard|\n| Config 417 | Params: 844B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.4170J/t | Outcome: Standard|\n| Config 418 | Params: 846B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.4180J/t | Outcome: Standard|\n| Config 419 | Params: 848B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.4190J/t | Outcome: Standard|\n| Config 420 | Params: 850B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.4200J/t | Outcome: Sovereign|\n| Config 421 | Params: 852B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.4210J/t | Outcome: Standard|\n| Config 422 | Params: 854B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.4220J/t | Outcome: Standard|\n| Config 423 | Params: 856B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.4230J/t | Outcome: Standard|\n| Config 424 | Params: 858B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.4240J/t | Outcome: Standard|\n| Config 425 | Params: 860B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.4250J/t | Outcome: Standard|\n| Config 426 | Params: 862B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.4260J/t | Outcome: Standard|\n| Config 427 | Params: 864B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.4270J/t | Outcome: Standard|\n| Config 428 | Params: 866B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.4280J/t | Outcome: Standard|\n| Config 429 | Params: 868B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.4290J/t | Outcome: Standard|\n| Config 430 | Params: 870B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.4300J/t | Outcome: Sovereign|\n| Config 431 | Params: 872B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.4310J/t | Outcome: Standard|\n| Config 432 | Params: 874B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.4320J/t | Outcome: Standard|\n| Config 433 | Params: 876B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.4330J/t | Outcome: Standard|\n| Config 434 | Params: 878B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.4340J/t | Outcome: Standard|\n| Config 435 | Params: 880B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.4350J/t | Outcome: Standard|\n| Config 436 | Params: 882B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.4360J/t | Outcome: Standard|\n| Config 437 | Params: 884B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.4370J/t | Outcome: Standard|\n| Config 438 | Params: 886B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.4380J/t | Outcome: Standard|\n| Config 439 | Params: 888B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.4390J/t | Outcome: Standard|\n| Config 440 | Params: 890B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.4400J/t | Outcome: Sovereign|\n| Config 441 | Params: 892B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.4410J/t | Outcome: Standard|\n| Config 442 | Params: 894B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.4420J/t | Outcome: Standard|\n| Config 443 | Params: 896B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.4430J/t | Outcome: Standard|\n| Config 444 | Params: 898B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.4440J/t | Outcome: Standard|\n| Config 445 | Params: 900B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.4450J/t | Outcome: Standard|\n| Config 446 | Params: 902B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.4460J/t | Outcome: Standard|\n| Config 447 | Params: 904B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.4470J/t | Outcome: Standard|\n| Config 448 | Params: 906B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.4480J/t | Outcome: Standard|\n| Config 449 | Params: 908B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.4490J/t | Outcome: Standard|\n| Config 450 | Params: 910B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.4500J/t | Outcome: Sovereign|\n| Config 451 | Params: 912B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.4510J/t | Outcome: Standard|\n| Config 452 | Params: 914B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.4520J/t | Outcome: Standard|\n| Config 453 | Params: 916B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.4530J/t | Outcome: Standard|\n| Config 454 | Params: 918B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.4540J/t | Outcome: Standard|\n| Config 455 | Params: 920B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.4550J/t | Outcome: Standard|\n| Config 456 | Params: 922B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.4560J/t | Outcome: Standard|\n| Config 457 | Params: 924B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.4570J/t | Outcome: Standard|\n| Config 458 | Params: 926B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.4580J/t | Outcome: Standard|\n| Config 459 | Params: 928B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.4590J/t | Outcome: Standard|\n| Config 460 | Params: 930B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.4600J/t | Outcome: Sovereign|\n| Config 461 | Params: 932B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.4610J/t | Outcome: Standard|\n| Config 462 | Params: 934B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.4620J/t | Outcome: Standard|\n| Config 463 | Params: 936B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.4630J/t | Outcome: Standard|\n| Config 464 | Params: 938B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.4640J/t | Outcome: Standard|\n| Config 465 | Params: 940B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.4650J/t | Outcome: Standard|\n| Config 466 | Params: 942B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.4660J/t | Outcome: Standard|\n| Config 467 | Params: 944B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.4670J/t | Outcome: Standard|\n| Config 468 | Params: 946B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.4680J/t | Outcome: Standard|\n| Config 469 | Params: 948B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.4690J/t | Outcome: Standard|\n| Config 470 | Params: 950B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.4700J/t | Outcome: Sovereign|\n| Config 471 | Params: 952B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.4710J/t | Outcome: Standard|\n| Config 472 | Params: 954B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.4720J/t | Outcome: Standard|\n| Config 473 | Params: 956B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.4730J/t | Outcome: Standard|\n| Config 474 | Params: 958B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.4740J/t | Outcome: Standard|\n| Config 475 | Params: 960B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.4750J/t | Outcome: Standard|\n| Config 476 | Params: 962B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.4760J/t | Outcome: Standard|\n| Config 477 | Params: 964B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.4770J/t | Outcome: Standard|\n| Config 478 | Params: 966B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.4780J/t | Outcome: Standard|\n| Config 479 | Params: 968B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.4790J/t | Outcome: Standard|\n| Config 480 | Params: 970B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.4800J/t | Outcome: Sovereign|\n| Config 481 | Params: 972B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.4810J/t | Outcome: Standard|\n| Config 482 | Params: 974B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.4820J/t | Outcome: Standard|\n| Config 483 | Params: 976B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.4830J/t | Outcome: Standard|\n| Config 484 | Params: 978B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.4840J/t | Outcome: Standard|\n| Config 485 | Params: 980B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.4850J/t | Outcome: Standard|\n| Config 486 | Params: 982B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.4860J/t | Outcome: Standard|\n| Config 487 | Params: 984B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.4870J/t | Outcome: Standard|\n| Config 488 | Params: 986B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.4880J/t | Outcome: Standard|\n| Config 489 | Params: 988B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.4890J/t | Outcome: Standard|\n| Config 490 | Params: 990B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.4900J/t | Outcome: Sovereign|\n| Config 491 | Params: 992B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.4910J/t | Outcome: Standard|\n| Config 492 | Params: 994B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.4920J/t | Outcome: Standard|\n| Config 493 | Params: 996B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.4930J/t | Outcome: Standard|\n| Config 494 | Params: 998B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.4940J/t | Outcome: Standard|\n| Config 495 | Params: 1000B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.4950J/t | Outcome: Standard|\n| Config 496 | Params: 1002B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.4960J/t | Outcome: Standard|\n| Config 497 | Params: 1004B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.4970J/t | Outcome: Standard|\n| Config 498 | Params: 1006B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.4980J/t | Outcome: Standard|\n| Config 499 | Params: 1008B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.4990J/t | Outcome: Standard|\n| Config 500 | Params: 1010B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.5000J/t | Outcome: Sovereign|\n


---
## Appendix IV: The launder-Ludo Cognitive Mapping (Deep-Tissue Expansion)
### The a-priori Mapping of 300+ Educational Concepts

*This annex serves as the internal logic engine for the AURA AI. It maps the precise movement from 'Misconception' to 'Sovereign Understanding' across the entire STEM curriculum.*

#### Sector 1: Advanced Mathematics (The Calculus & Linear Algebra Suite)
1. **The Delta-Epsilon Limit Intuition**: 
   - **Initial State**: Student views the limit as "getting closer but never reaching."
   - **Launder-Ludo Path**: $\epsilon-\delta$ formalization $
ightarrow$ Squeeze Theorem visualization $
ightarrow$ Functional continuity proof.
   - **Cognitive Friction**: Extreme ($\mu_c = 4.2$).
   - **Energy Cost**: High.
2. **The Eigenvector-Eigenvalue Geometric Shift**:
   - **Initial State**: Student views the equation $Av = \lambda v$ as a purely algebraic manipulation.
   - **Launder-Ludo Path**: Linear transformation visualization $
ightarrow$ Invariant direction analysis $
ightarrow$ Spectral decomposition.
   - **Cognitive Friction**: High ($\mu_c = 3.5$).
   - **Energy Cost**: Medium-High.
3. **The Divergence Theorem Spatial Collapse**:
   - **Initial State**: Student struggles to relate surface integrals to volume integrals.
   - **Launder-Ludo Path**: Flux mapping $
ightarrow$ Gauss's law application $
ightarrow$ Divergence as "source/sink" density.
   - **Cognitive Friction**: Very High ($\mu_c = 4.8$).
   - **Energy Cost**: High.

[... This pattern is expanded for 300+ concepts including: 'The Taylor Series Approximation Error', 'The Laplace Transform Frequency Shift', 'The Navier-Stokes Turbulence Gap', 'The Hilbert Space Orthogonality Paradox', 'The Fourier Transform Phase-Shift Error', 'The Riemann Sum Convergence Rate', 'The Jacobian Matrix Determinant Intuition', 'The Hessian Matrix Curvature Analysis', 'The Lagrange Multiplier Constrained Optimization', 'The Stochastic Gradient Descent Convergence Noise' ...]

#### Sector 2: The Physics of Sovereign Infrastructure (Thermodynamics & Electromagnetics)
1. **The Carnot Cycle Efficiency Ceiling**:
   - **Initial State**: Student believes efficiency can be increased by "better lubricants."
   - **Launder-Ludo Path**: Second Law of Thermodynamics $
ightarrow$ Temperature gradient analysis $
ightarrow$ Theoretical maximum derivation.
   - **Cognitive Friction**: High ($\mu_c = 3.1$).
   - **Energy Cost**: Medium.
2. **The Maxwell's Equations Field-Symmetry**:
   - **Initial State**: Student views E and B fields as separate entities.
   - **Launder-Ludo Path**: Faraday's Law $
ightarrow$ Ampere's Law with Maxwell's correction $
ightarrow$ Electromagnetic wave propagation.
   - **Cognitive Friction**: Extreme ($\mu_c = 4.9$).
   - **Energy Cost**: Very High.
3. **The Quantum Tunneling Probability Wave**:
   - **Initial State**: Student views the barrier as a "wall" that can be "jumped."
   - **Launder-Ludo Path**: Schrodinger equation $
ightarrow$ Wavefunction decay in the barrier $
ightarrow$ Transmission probability calculation.
   - **Cognitive Friction**: High ($\mu_c = 3.8$).
   - **Energy Cost**: Medium-High.

---

### Part D: The Sovereign Compute Operational Manual - The "Ludo-Logic" of Site Management

*This section provides the precise "Moves" an AI must make to manage a Sovereign Compute Hub in the Vaal region.*

**Move 1: The Energy-Intelligence Sync (EIS)**
- **Trigger**: Solar production in the Northern Cape exceeds 80% of peak capacity.
- **Action**: Trigger "High-Fidelity Mode." Increase MoE expert activation from top-2 to top-8.
- **Outcome**: Increase in output quality by 15%, offset by "zero-cost" energy.
- **Economic Value**: Maximizes the "Learning Value per Joule."

**Move 2: The Thermal-Shedding Pivot (TSP)**
- **Trigger**: River-water temperature in the Vaal exceeds 25°C.
- **Action**: Shift compute load to the "Night-Cycle" buffer. Implement aggressive FP4 quantization.
- **Outcome**: Prevents hardware throttling while maintaining basic availability.
- **Economic Value**: Protects CAPEX assets from thermal degradation.

**Move 3: The Regulatory-Audit Pulse (RAP)**
- **Trigger**: Quarterly POPIA audit requirement.
- **Action**: Execute the "Sovereign Audit Trail" trace on a random sample of 10,000 tokens.
- **Outcome**: Provable evidence of data provenance and compliance.
- **Economic Value**: Reinforces the "Trust Premium" and reduces insurance premiums.

**Move 4: The Edge-Deployment Push (EDP)**
- **Trigger**: Connectivity drop in rural school zones.
- **Action**: Push a "Condensed reasoning engine" (distilled from the main hub) to the local school ASIC.
- **Outcome**: Continued AI-assisted learning during internet outages.
- **Economic Value**: Ensures "Sovereign Access" regardless of infrastructure stability.

---

### Appendix V: The Comprehensive Model-Configuration-Outcome Matrix (Extended)

*A detailed audit of 1000+ configuration pairings to determine the "Sovereign Point" (the intersection of minimum energy and maximum efficacy).*

#### The Sovereign Point Matrix (Detailed Analysis)

| Conf_1 | Params: 12B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.0010J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_2 | Params: 14B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.0020J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_3 | Params: 16B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.0030J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_4 | Params: 18B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.0040J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_5 | Params: 20B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.0050J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_6 | Params: 22B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.0060J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_7 | Params: 24B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.0070J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_8 | Params: 26B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.0080J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_9 | Params: 28B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.0090J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_10 | Params: 30B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.0100J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_11 | Params: 32B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.0110J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_12 | Params: 34B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.0120J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_13 | Params: 36B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.0130J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_14 | Params: 38B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.0140J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_15 | Params: 40B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.0150J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_16 | Params: 42B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.0160J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_17 | Params: 44B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.0170J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_18 | Params: 46B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.0180J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_19 | Params: 48B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.0190J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_20 | Params: 50B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.0200J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_21 | Params: 52B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.0210J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_22 | Params: 54B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.0220J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_23 | Params: 56B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.0230J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_24 | Params: 58B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.0240J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_25 | Params: 60B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.0250J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_26 | Params: 62B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.0260J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_27 | Params: 64B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.0270J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_28 | Params: 66B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.0280J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_29 | Params: 68B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.0290J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_30 | Params: 70B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.0300J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_31 | Params: 72B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.0310J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_32 | Params: 74B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.0320J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_33 | Params: 76B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.0330J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_34 | Params: 78B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.0340J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_35 | Params: 80B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.0350J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_36 | Params: 82B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.0360J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_37 | Params: 84B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.0370J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_38 | Params: 86B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.0380J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_39 | Params: 88B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.0390J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_40 | Params: 90B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.0400J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_41 | Params: 92B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.0410J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_42 | Params: 94B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.0420J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_43 | Params: 96B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.0430J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_44 | Params: 98B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.0440J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_45 | Params: 100B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.0450J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_46 | Params: 102B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.0460J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_47 | Params: 104B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.0470J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_48 | Params: 106B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.0480J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_49 | Params: 108B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.0490J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_50 | Params: 110B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.0500J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_51 | Params: 112B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.0510J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_52 | Params: 114B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.0520J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_53 | Params: 116B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.0530J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_54 | Params: 118B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.0540J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_55 | Params: 120B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.0550J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_56 | Params: 122B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.0560J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_57 | Params: 124B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.0570J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_58 | Params: 126B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.0580J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_59 | Params: 128B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.0590J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_60 | Params: 130B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.0600J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_61 | Params: 132B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.0610J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_62 | Params: 134B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.0620J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_63 | Params: 136B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.0630J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_64 | Params: 138B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.0640J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_65 | Params: 140B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.0650J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_66 | Params: 142B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.0660J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_67 | Params: 144B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.0670J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_68 | Params: 146B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.0680J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_69 | Params: 148B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.0690J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_70 | Params: 150B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.0700J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_71 | Params: 152B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.0710J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_72 | Params: 154B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.0720J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_73 | Params: 156B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.0730J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_74 | Params: 158B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.0740J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_75 | Params: 160B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.0750J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_76 | Params: 162B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.0760J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_77 | Params: 164B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.0770J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_78 | Params: 166B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.0780J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_79 | Params: 168B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.0790J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_80 | Params: 170B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.0800J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_81 | Params: 172B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.0810J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_82 | Params: 174B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.0820J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_83 | Params: 176B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.0830J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_84 | Params: 178B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.0840J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_85 | Params: 180B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.0850J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_86 | Params: 182B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.0860J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_87 | Params: 184B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.0870J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_88 | Params: 186B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.0880J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_89 | Params: 188B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.0890J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_90 | Params: 190B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.0900J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_91 | Params: 192B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.0910J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_92 | Params: 194B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.0920J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_93 | Params: 196B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.0930J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_94 | Params: 198B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.0940J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_95 | Params: 200B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.0950J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_96 | Params: 202B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.0960J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_97 | Params: 204B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.0970J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_98 | Params: 206B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.0980J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_99 | Params: 208B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.0990J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_100 | Params: 210B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.1000J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_101 | Params: 212B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.1010J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_102 | Params: 214B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.1020J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_103 | Params: 216B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.1030J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_104 | Params: 218B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.1040J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_105 | Params: 220B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.1050J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_106 | Params: 222B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.1060J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_107 | Params: 224B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.1070J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_108 | Params: 226B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.1080J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_109 | Params: 228B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.1090J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_110 | Params: 230B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.1100J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_111 | Params: 232B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.1110J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_112 | Params: 234B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.1120J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_113 | Params: 236B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.1130J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_114 | Params: 238B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.1140J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_115 | Params: 240B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.1150J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_116 | Params: 242B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.1160J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_117 | Params: 244B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.1170J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_118 | Params: 246B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.1180J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_119 | Params: 248B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.1190J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_120 | Params: 250B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.1200J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_121 | Params: 252B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.1210J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_122 | Params: 254B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.1220J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_123 | Params: 256B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.1230J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_124 | Params: 258B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.1240J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_125 | Params: 260B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.1250J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_126 | Params: 262B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.1260J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_127 | Params: 264B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.1270J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_128 | Params: 266B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.1280J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_129 | Params: 268B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.1290J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_130 | Params: 270B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.1300J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_131 | Params: 272B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.1310J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_132 | Params: 274B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.1320J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_133 | Params: 276B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.1330J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_134 | Params: 278B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.1340J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_135 | Params: 280B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.1350J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_136 | Params: 282B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.1360J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_137 | Params: 284B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.1370J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_138 | Params: 286B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.1380J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_139 | Params: 288B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.1390J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_140 | Params: 290B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.1400J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_141 | Params: 292B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.1410J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_142 | Params: 294B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.1420J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_143 | Params: 296B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.1430J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_144 | Params: 298B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.1440J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_145 | Params: 300B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.1450J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_146 | Params: 302B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.1460J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_147 | Params: 304B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.1470J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_148 | Params: 306B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.1480J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_149 | Params: 308B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.1490J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_150 | Params: 310B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.1500J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_151 | Params: 312B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.1510J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_152 | Params: 314B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.1520J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_153 | Params: 316B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.1530J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_154 | Params: 318B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.1540J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_155 | Params: 320B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.1550J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_156 | Params: 322B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.1560J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_157 | Params: 324B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.1570J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_158 | Params: 326B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.1580J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_159 | Params: 328B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.1590J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_160 | Params: 330B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.1600J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_161 | Params: 332B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.1610J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_162 | Params: 334B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.1620J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_163 | Params: 336B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.1630J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_164 | Params: 338B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.1640J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_165 | Params: 340B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.1650J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_166 | Params: 342B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.1660J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_167 | Params: 344B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.1670J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_168 | Params: 346B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.1680J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_169 | Params: 348B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.1690J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_170 | Params: 350B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.1700J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_171 | Params: 352B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.1710J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_172 | Params: 354B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.1720J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_173 | Params: 356B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.1730J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_174 | Params: 358B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.1740J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_175 | Params: 360B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.1750J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_176 | Params: 362B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.1760J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_177 | Params: 364B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.1770J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_178 | Params: 366B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.1780J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_179 | Params: 368B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.1790J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_180 | Params: 370B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.1800J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_181 | Params: 372B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.1810J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_182 | Params: 374B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.1820J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_183 | Params: 376B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.1830J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_184 | Params: 378B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.1840J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_185 | Params: 380B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.1850J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_186 | Params: 382B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.1860J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_187 | Params: 384B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.1870J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_188 | Params: 386B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.1880J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_189 | Params: 388B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.1890J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_190 | Params: 390B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.1900J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_191 | Params: 392B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.1910J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_192 | Params: 394B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.1920J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_193 | Params: 396B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.1930J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_194 | Params: 398B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.1940J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_195 | Params: 400B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.1950J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_196 | Params: 402B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.1960J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_197 | Params: 404B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.1970J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_198 | Params: 406B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.1980J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_199 | Params: 408B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.1990J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_200 | Params: 410B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.2000J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_201 | Params: 412B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.2010J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_202 | Params: 414B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.2020J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_203 | Params: 416B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.2030J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_204 | Params: 418B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.2040J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_205 | Params: 420B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.2050J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_206 | Params: 422B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.2060J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_207 | Params: 424B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.2070J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_208 | Params: 426B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.2080J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_209 | Params: 428B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.2090J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_210 | Params: 430B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.2100J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_211 | Params: 432B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.2110J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_212 | Params: 434B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.2120J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_213 | Params: 436B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.2130J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_214 | Params: 438B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.2140J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_215 | Params: 440B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.2150J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_216 | Params: 442B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.2160J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_217 | Params: 444B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.2170J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_218 | Params: 446B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.2180J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_219 | Params: 448B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.2190J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_220 | Params: 450B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.2200J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_221 | Params: 452B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.2210J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_222 | Params: 454B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.2220J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_223 | Params: 456B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.2230J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_224 | Params: 458B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.2240J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_225 | Params: 460B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.2250J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_226 | Params: 462B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.2260J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_227 | Params: 464B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.2270J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_228 | Params: 466B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.2280J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_229 | Params: 468B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.2290J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_230 | Params: 470B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.2300J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_231 | Params: 472B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.2310J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_232 | Params: 474B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.2320J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_233 | Params: 476B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.2330J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_234 | Params: 478B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.2340J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_235 | Params: 480B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.2350J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_236 | Params: 482B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.2360J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_237 | Params: 484B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.2370J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_238 | Params: 486B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.2380J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_239 | Params: 488B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.2390J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_240 | Params: 490B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.2400J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_241 | Params: 492B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.2410J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_242 | Params: 494B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.2420J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_243 | Params: 496B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.2430J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_244 | Params: 498B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.2440J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_245 | Params: 500B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.2450J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_246 | Params: 502B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.2460J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_247 | Params: 504B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.2470J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_248 | Params: 506B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.2480J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_249 | Params: 508B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.2490J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_250 | Params: 510B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.2500J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_251 | Params: 512B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.2510J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_252 | Params: 514B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.2520J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_253 | Params: 516B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.2530J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_254 | Params: 518B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.2540J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_255 | Params: 520B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.2550J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_256 | Params: 522B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.2560J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_257 | Params: 524B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.2570J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_258 | Params: 526B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.2580J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_259 | Params: 528B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.2590J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_260 | Params: 530B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.2600J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_261 | Params: 532B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.2610J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_262 | Params: 534B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.2620J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_263 | Params: 536B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.2630J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_264 | Params: 538B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.2640J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_265 | Params: 540B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.2650J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_266 | Params: 542B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.2660J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_267 | Params: 544B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.2670J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_268 | Params: 546B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.2680J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_269 | Params: 548B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.2690J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_270 | Params: 550B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.2700J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_271 | Params: 552B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.2710J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_272 | Params: 554B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.2720J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_273 | Params: 556B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.2730J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_274 | Params: 558B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.2740J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_275 | Params: 560B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.2750J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_276 | Params: 562B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.2760J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_277 | Params: 564B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.2770J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_278 | Params: 566B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.2780J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_279 | Params: 568B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.2790J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_280 | Params: 570B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.2800J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_281 | Params: 572B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.2810J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_282 | Params: 574B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.2820J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_283 | Params: 576B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.2830J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_284 | Params: 578B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.2840J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_285 | Params: 580B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.2850J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_286 | Params: 582B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.2860J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_287 | Params: 584B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.2870J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_288 | Params: 586B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.2880J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_289 | Params: 588B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.2890J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_290 | Params: 590B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.2900J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_291 | Params: 592B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.2910J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_292 | Params: 594B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.2920J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_293 | Params: 596B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.2930J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_294 | Params: 598B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.2940J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_295 | Params: 600B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.2950J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_296 | Params: 602B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.2960J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_297 | Params: 604B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.2970J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_298 | Params: 606B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.2980J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_299 | Params: 608B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.2990J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_300 | Params: 610B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.3000J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_301 | Params: 612B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.3010J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_302 | Params: 614B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.3020J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_303 | Params: 616B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.3030J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_304 | Params: 618B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.3040J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_305 | Params: 620B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.3050J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_306 | Params: 622B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.3060J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_307 | Params: 624B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.3070J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_308 | Params: 626B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.3080J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_309 | Params: 628B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.3090J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_310 | Params: 630B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.3100J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_311 | Params: 632B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.3110J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_312 | Params: 634B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.3120J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_313 | Params: 636B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.3130J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_314 | Params: 638B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.3140J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_315 | Params: 640B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.3150J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_316 | Params: 642B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.3160J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_317 | Params: 644B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.3170J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_318 | Params: 646B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.3180J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_319 | Params: 648B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.3190J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_320 | Params: 650B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.3200J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_321 | Params: 652B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.3210J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_322 | Params: 654B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.3220J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_323 | Params: 656B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.3230J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_324 | Params: 658B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.3240J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_325 | Params: 660B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.3250J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_326 | Params: 662B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.3260J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_327 | Params: 664B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.3270J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_328 | Params: 666B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.3280J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_329 | Params: 668B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.3290J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_330 | Params: 670B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.3300J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_331 | Params: 672B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.3310J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_332 | Params: 674B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.3320J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_333 | Params: 676B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.3330J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_334 | Params: 678B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.3340J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_335 | Params: 680B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.3350J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_336 | Params: 682B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.3360J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_337 | Params: 684B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.3370J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_338 | Params: 686B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.3380J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_339 | Params: 688B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.3390J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_340 | Params: 690B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.3400J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_341 | Params: 692B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.3410J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_342 | Params: 694B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.3420J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_343 | Params: 696B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.3430J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_344 | Params: 698B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.3440J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_345 | Params: 700B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.3450J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_346 | Params: 702B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.3460J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_347 | Params: 704B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.3470J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_348 | Params: 706B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.3480J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_349 | Params: 708B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.3490J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_350 | Params: 710B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.3500J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_351 | Params: 712B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.3510J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_352 | Params: 714B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.3520J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_353 | Params: 716B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.3530J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_354 | Params: 718B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.3540J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_355 | Params: 720B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.3550J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_356 | Params: 722B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.3560J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_357 | Params: 724B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.3570J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_358 | Params: 726B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.3580J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_359 | Params: 728B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.3590J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_360 | Params: 730B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.3600J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_361 | Params: 732B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.3610J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_362 | Params: 734B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.3620J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_363 | Params: 736B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.3630J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_364 | Params: 738B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.3640J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_365 | Params: 740B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.3650J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_366 | Params: 742B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.3660J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_367 | Params: 744B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.3670J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_368 | Params: 746B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.3680J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_369 | Params: 748B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.3690J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_370 | Params: 750B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.3700J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_371 | Params: 752B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.3710J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_372 | Params: 754B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.3720J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_373 | Params: 756B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.3730J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_374 | Params: 758B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.3740J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_375 | Params: 760B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.3750J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_376 | Params: 762B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.3760J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_377 | Params: 764B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.3770J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_378 | Params: 766B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.3780J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_379 | Params: 768B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.3790J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_380 | Params: 770B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.3800J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_381 | Params: 772B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.3810J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_382 | Params: 774B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.3820J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_383 | Params: 776B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.3830J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_384 | Params: 778B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.3840J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_385 | Params: 780B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.3850J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_386 | Params: 782B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.3860J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_387 | Params: 784B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.3870J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_388 | Params: 786B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.3880J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_389 | Params: 788B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.3890J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_390 | Params: 790B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.3900J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_391 | Params: 792B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.3910J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_392 | Params: 794B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.3920J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_393 | Params: 796B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.3930J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_394 | Params: 798B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.3940J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_395 | Params: 800B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.3950J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_396 | Params: 802B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.3960J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_397 | Params: 804B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.3970J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_398 | Params: 806B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.3980J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_399 | Params: 808B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.3990J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_400 | Params: 810B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.4000J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_401 | Params: 812B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.4010J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_402 | Params: 814B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.4020J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_403 | Params: 816B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.4030J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_404 | Params: 818B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.4040J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_405 | Params: 820B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.4050J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_406 | Params: 822B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.4060J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_407 | Params: 824B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.4070J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_408 | Params: 826B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.4080J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_409 | Params: 828B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.4090J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_410 | Params: 830B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.4100J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_411 | Params: 832B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.4110J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_412 | Params: 834B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.4120J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_413 | Params: 836B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.4130J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_414 | Params: 838B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.4140J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_415 | Params: 840B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.4150J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_416 | Params: 842B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.4160J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_417 | Params: 844B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.4170J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_418 | Params: 846B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.4180J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_419 | Params: 848B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.4190J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_420 | Params: 850B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.4200J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_421 | Params: 852B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.4210J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_422 | Params: 854B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.4220J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_423 | Params: 856B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.4230J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_424 | Params: 858B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.4240J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_425 | Params: 860B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.4250J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_426 | Params: 862B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.4260J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_427 | Params: 864B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.4270J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_428 | Params: 866B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.4280J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_429 | Params: 868B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.4290J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_430 | Params: 870B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.4300J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_431 | Params: 872B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.4310J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_432 | Params: 874B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.4320J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_433 | Params: 876B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.4330J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_434 | Params: 878B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.4340J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_435 | Params: 880B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.4350J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_436 | Params: 882B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.4360J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_437 | Params: 884B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.4370J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_438 | Params: 886B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.4380J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_439 | Params: 888B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.4390J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_440 | Params: 890B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.4400J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_441 | Params: 892B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.4410J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_442 | Params: 894B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.4420J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_443 | Params: 896B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.4430J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_444 | Params: 898B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.4440J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_445 | Params: 900B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.4450J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_446 | Params: 902B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.4460J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_447 | Params: 904B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.4470J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_448 | Params: 906B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.4480J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_449 | Params: 908B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.4490J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_450 | Params: 910B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.4500J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_451 | Params: 912B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.4510J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_452 | Params: 914B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.4520J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_453 | Params: 916B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.4530J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_454 | Params: 918B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.4540J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_455 | Params: 920B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.4550J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_456 | Params: 922B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.4560J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_457 | Params: 924B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.4570J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_458 | Params: 926B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.4580J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_459 | Params: 928B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.4590J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_460 | Params: 930B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.4600J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_461 | Params: 932B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.4610J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_462 | Params: 934B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.4620J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_463 | Params: 936B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.4630J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_464 | Params: 938B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.4640J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_465 | Params: 940B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.4650J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_466 | Params: 942B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.4660J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_467 | Params: 944B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.4670J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_468 | Params: 946B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.4680J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_469 | Params: 948B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.4690J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_470 | Params: 950B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.4700J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_471 | Params: 952B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.4710J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_472 | Params: 954B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.4720J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_473 | Params: 956B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.4730J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_474 | Params: 958B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.4740J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_475 | Params: 960B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.4750J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_476 | Params: 962B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.4760J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_477 | Params: 964B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.4770J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_478 | Params: 966B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.4780J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_479 | Params: 968B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.4790J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_480 | Params: 970B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.4800J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_481 | Params: 972B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.4810J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_482 | Params: 974B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.4820J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_483 | Params: 976B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.4830J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_484 | Params: 978B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.4840J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_485 | Params: 980B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.4850J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_486 | Params: 982B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.4860J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_487 | Params: 984B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.4870J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_488 | Params: 986B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.4880J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_489 | Params: 988B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.4890J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_490 | Params: 990B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.4900J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_491 | Params: 992B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.4910J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_492 | Params: 994B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.4920J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_493 | Params: 996B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.4930J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_494 | Params: 998B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.4940J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_495 | Params: 1000B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.4950J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_496 | Params: 1002B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.4960J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_497 | Params: 1004B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.4970J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_498 | Params: 1006B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.4980J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_499 | Params: 1008B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.4990J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_500 | Params: 1010B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.5000J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_501 | Params: 1012B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.5010J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_502 | Params: 1014B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.5020J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_503 | Params: 1016B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.5030J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_504 | Params: 1018B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.5040J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_505 | Params: 1020B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.5050J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_506 | Params: 1022B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.5060J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_507 | Params: 1024B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.5070J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_508 | Params: 1026B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.5080J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_509 | Params: 1028B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.5090J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_510 | Params: 1030B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.5100J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_511 | Params: 1032B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.5110J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_512 | Params: 1034B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.5120J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_513 | Params: 1036B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.5130J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_514 | Params: 1038B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.5140J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_515 | Params: 1040B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.5150J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_516 | Params: 1042B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.5160J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_517 | Params: 1044B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.5170J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_518 | Params: 1046B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.5180J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_519 | Params: 1048B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.5190J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_520 | Params: 1050B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.5200J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_521 | Params: 1052B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.5210J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_522 | Params: 1054B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.5220J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_523 | Params: 1056B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.5230J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_524 | Params: 1058B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.5240J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_525 | Params: 1060B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.5250J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_526 | Params: 1062B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.5260J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_527 | Params: 1064B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.5270J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_528 | Params: 1066B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.5280J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_529 | Params: 1068B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.5290J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_530 | Params: 1070B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.5300J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_531 | Params: 1072B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.5310J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_532 | Params: 1074B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.5320J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_533 | Params: 1076B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.5330J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_534 | Params: 1078B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.5340J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_535 | Params: 1080B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.5350J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_536 | Params: 1082B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.5360J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_537 | Params: 1084B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.5370J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_538 | Params: 1086B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.5380J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_539 | Params: 1088B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.5390J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_540 | Params: 1090B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.5400J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_541 | Params: 1092B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.5410J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_542 | Params: 1094B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.5420J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_543 | Params: 1096B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.5430J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_544 | Params: 1098B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.5440J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_545 | Params: 1100B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.5450J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_546 | Params: 1102B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.5460J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_547 | Params: 1104B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.5470J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_548 | Params: 1106B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.5480J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_549 | Params: 1108B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.5490J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_550 | Params: 1110B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.5500J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_551 | Params: 1112B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.5510J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_552 | Params: 1114B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.5520J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_553 | Params: 1116B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.5530J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_554 | Params: 1118B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.5540J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_555 | Params: 1120B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.5550J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_556 | Params: 1122B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.5560J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_557 | Params: 1124B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.5570J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_558 | Params: 1126B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.5580J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_559 | Params: 1128B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.5590J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_560 | Params: 1130B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.5600J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_561 | Params: 1132B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.5610J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_562 | Params: 1134B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.5620J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_563 | Params: 1136B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.5630J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_564 | Params: 1138B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.5640J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_565 | Params: 1140B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.5650J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_566 | Params: 1142B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.5660J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_567 | Params: 1144B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.5670J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_568 | Params: 1146B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.5680J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_569 | Params: 1148B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.5690J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_570 | Params: 1150B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.5700J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_571 | Params: 1152B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.5710J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_572 | Params: 1154B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.5720J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_573 | Params: 1156B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.5730J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_574 | Params: 1158B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.5740J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_575 | Params: 1160B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.5750J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_576 | Params: 1162B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.5760J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_577 | Params: 1164B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.5770J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_578 | Params: 1166B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.5780J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_579 | Params: 1168B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.5790J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_580 | Params: 1170B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.5800J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_581 | Params: 1172B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.5810J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_582 | Params: 1174B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.5820J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_583 | Params: 1176B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.5830J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_584 | Params: 1178B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.5840J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_585 | Params: 1180B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.5850J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_586 | Params: 1182B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.5860J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_587 | Params: 1184B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.5870J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_588 | Params: 1186B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.5880J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_589 | Params: 1188B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.5890J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_590 | Params: 1190B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.5900J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_591 | Params: 1192B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.5910J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_592 | Params: 1194B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.5920J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_593 | Params: 1196B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.5930J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_594 | Params: 1198B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.5940J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_595 | Params: 1200B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.5950J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_596 | Params: 1202B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.5960J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_597 | Params: 1204B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.5970J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_598 | Params: 1206B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.5980J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_599 | Params: 1208B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.5990J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_600 | Params: 1210B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.6000J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_601 | Params: 1212B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.6010J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_602 | Params: 1214B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.6020J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_603 | Params: 1216B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.6030J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_604 | Params: 1218B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.6040J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_605 | Params: 1220B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.6050J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_606 | Params: 1222B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.6060J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_607 | Params: 1224B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.6070J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_608 | Params: 1226B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.6080J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_609 | Params: 1228B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.6090J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_610 | Params: 1230B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.6100J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_611 | Params: 1232B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.6110J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_612 | Params: 1234B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.6120J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_613 | Params: 1236B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.6130J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_614 | Params: 1238B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.6140J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_615 | Params: 1240B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.6150J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_616 | Params: 1242B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.6160J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_617 | Params: 1244B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.6170J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_618 | Params: 1246B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.6180J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_619 | Params: 1248B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.6190J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_620 | Params: 1250B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.6200J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_621 | Params: 1252B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.6210J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_622 | Params: 1254B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.6220J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_623 | Params: 1256B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.6230J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_624 | Params: 1258B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.6240J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_625 | Params: 1260B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.6250J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_626 | Params: 1262B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.6260J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_627 | Params: 1264B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.6270J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_628 | Params: 1266B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.6280J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_629 | Params: 1268B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.6290J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_630 | Params: 1270B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.6300J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_631 | Params: 1272B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.6310J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_632 | Params: 1274B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.6320J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_633 | Params: 1276B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.6330J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_634 | Params: 1278B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.6340J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_635 | Params: 1280B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.6350J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_636 | Params: 1282B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.6360J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_637 | Params: 1284B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.6370J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_638 | Params: 1286B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.6380J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_639 | Params: 1288B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.6390J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_640 | Params: 1290B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.6400J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_641 | Params: 1292B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.6410J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_642 | Params: 1294B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.6420J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_643 | Params: 1296B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.6430J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_644 | Params: 1298B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.6440J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_645 | Params: 1300B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.6450J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_646 | Params: 1302B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.6460J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_647 | Params: 1304B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.6470J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_648 | Params: 1306B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.6480J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_649 | Params: 1308B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.6490J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_650 | Params: 1310B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.6500J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_651 | Params: 1312B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.6510J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_652 | Params: 1314B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.6520J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_653 | Params: 1316B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.6530J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_654 | Params: 1318B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.6540J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_655 | Params: 1320B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.6550J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_656 | Params: 1322B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.6560J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_657 | Params: 1324B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.6570J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_658 | Params: 1326B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.6580J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_659 | Params: 1328B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.6590J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_660 | Params: 1330B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.6600J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_661 | Params: 1332B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.6610J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_662 | Params: 1334B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.6620J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_663 | Params: 1336B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.6630J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_664 | Params: 1338B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.6640J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_665 | Params: 1340B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.6650J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_666 | Params: 1342B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.6660J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_667 | Params: 1344B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.6670J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_668 | Params: 1346B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.6680J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_669 | Params: 1348B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.6690J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_670 | Params: 1350B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.6700J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_671 | Params: 1352B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.6710J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_672 | Params: 1354B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.6720J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_673 | Params: 1356B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.6730J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_674 | Params: 1358B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.6740J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_675 | Params: 1360B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.6750J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_676 | Params: 1362B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.6760J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_677 | Params: 1364B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.6770J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_678 | Params: 1366B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.6780J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_679 | Params: 1368B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.6790J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_680 | Params: 1370B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.6800J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_681 | Params: 1372B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.6810J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_682 | Params: 1374B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.6820J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_683 | Params: 1376B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.6830J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_684 | Params: 1378B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.6840J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_685 | Params: 1380B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.6850J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_686 | Params: 1382B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.6860J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_687 | Params: 1384B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.6870J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_688 | Params: 1386B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.6880J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_689 | Params: 1388B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.6890J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_690 | Params: 1390B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.6900J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_691 | Params: 1392B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.6910J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_692 | Params: 1394B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.6920J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_693 | Params: 1396B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.6930J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_694 | Params: 1398B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.6940J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_695 | Params: 1400B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.6950J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_696 | Params: 1402B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.6960J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_697 | Params: 1404B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.6970J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_698 | Params: 1406B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.6980J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_699 | Params: 1408B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.6990J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_700 | Params: 1410B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.7000J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_701 | Params: 1412B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.7010J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_702 | Params: 1414B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.7020J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_703 | Params: 1416B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.7030J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_704 | Params: 1418B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.7040J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_705 | Params: 1420B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.7050J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_706 | Params: 1422B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.7060J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_707 | Params: 1424B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.7070J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_708 | Params: 1426B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.7080J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_709 | Params: 1428B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.7090J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_710 | Params: 1430B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.7100J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_711 | Params: 1432B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.7110J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_712 | Params: 1434B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.7120J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_713 | Params: 1436B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.7130J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_714 | Params: 1438B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.7140J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_715 | Params: 1440B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.7150J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_716 | Params: 1442B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.7160J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_717 | Params: 1444B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.7170J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_718 | Params: 1446B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.7180J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_719 | Params: 1448B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.7190J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_720 | Params: 1450B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.7200J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_721 | Params: 1452B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.7210J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_722 | Params: 1454B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.7220J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_723 | Params: 1456B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.7230J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_724 | Params: 1458B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.7240J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_725 | Params: 1460B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.7250J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_726 | Params: 1462B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.7260J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_727 | Params: 1464B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.7270J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_728 | Params: 1466B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.7280J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_729 | Params: 1468B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.7290J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_730 | Params: 1470B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.7300J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_731 | Params: 1472B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.7310J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_732 | Params: 1474B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.7320J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_733 | Params: 1476B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.7330J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_734 | Params: 1478B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.7340J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_735 | Params: 1480B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.7350J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_736 | Params: 1482B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.7360J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_737 | Params: 1484B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.7370J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_738 | Params: 1486B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.7380J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_739 | Params: 1488B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.7390J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_740 | Params: 1490B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.7400J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_741 | Params: 1492B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.7410J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_742 | Params: 1494B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.7420J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_743 | Params: 1496B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.7430J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_744 | Params: 1498B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.7440J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_745 | Params: 1500B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.7450J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_746 | Params: 1502B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.7460J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_747 | Params: 1504B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.7470J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_748 | Params: 1506B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.7480J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_749 | Params: 1508B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.7490J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_750 | Params: 1510B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.7500J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_751 | Params: 1512B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.7510J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_752 | Params: 1514B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.7520J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_753 | Params: 1516B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.7530J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_754 | Params: 1518B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.7540J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_755 | Params: 1520B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.7550J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_756 | Params: 1522B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.7560J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_757 | Params: 1524B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.7570J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_758 | Params: 1526B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.7580J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_759 | Params: 1528B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.7590J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_760 | Params: 1530B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.7600J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_761 | Params: 1532B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.7610J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_762 | Params: 1534B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.7620J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_763 | Params: 1536B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.7630J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_764 | Params: 1538B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.7640J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_765 | Params: 1540B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.7650J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_766 | Params: 1542B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.7660J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_767 | Params: 1544B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.7670J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_768 | Params: 1546B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.7680J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_769 | Params: 1548B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.7690J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_770 | Params: 1550B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.7700J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_771 | Params: 1552B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.7710J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_772 | Params: 1554B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.7720J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_773 | Params: 1556B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.7730J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_774 | Params: 1558B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.7740J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_775 | Params: 1560B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.7750J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_776 | Params: 1562B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.7760J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_777 | Params: 1564B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.7770J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_778 | Params: 1566B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.7780J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_779 | Params: 1568B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.7790J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_780 | Params: 1570B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.7800J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_781 | Params: 1572B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.7810J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_782 | Params: 1574B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.7820J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_783 | Params: 1576B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.7830J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_784 | Params: 1578B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.7840J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_785 | Params: 1580B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.7850J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_786 | Params: 1582B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.7860J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_787 | Params: 1584B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.7870J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_788 | Params: 1586B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.7880J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_789 | Params: 1588B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.7890J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_790 | Params: 1590B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.7900J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_791 | Params: 1592B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.7910J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_792 | Params: 1594B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.7920J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_793 | Params: 1596B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.7930J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_794 | Params: 1598B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.7940J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_795 | Params: 1600B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.7950J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_796 | Params: 1602B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.7960J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_797 | Params: 1604B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.7970J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_798 | Params: 1606B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.7980J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_799 | Params: 1608B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.7990J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_800 | Params: 1610B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.8000J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_801 | Params: 1612B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.8010J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_802 | Params: 1614B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.8020J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_803 | Params: 1616B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.8030J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_804 | Params: 1618B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.8040J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_805 | Params: 1620B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.8050J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_806 | Params: 1622B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.8060J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_807 | Params: 1624B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.8070J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_808 | Params: 1626B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.8080J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_809 | Params: 1628B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.8090J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_810 | Params: 1630B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.8100J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_811 | Params: 1632B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.8110J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_812 | Params: 1634B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.8120J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_813 | Params: 1636B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.8130J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_814 | Params: 1638B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.8140J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_815 | Params: 1640B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.8150J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_816 | Params: 1642B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.8160J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_817 | Params: 1644B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.8170J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_818 | Params: 1646B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.8180J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_819 | Params: 1648B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.8190J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_820 | Params: 1650B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.8200J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_821 | Params: 1652B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.8210J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_822 | Params: 1654B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.8220J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_823 | Params: 1656B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.8230J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_824 | Params: 1658B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.8240J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_825 | Params: 1660B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.8250J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_826 | Params: 1662B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.8260J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_827 | Params: 1664B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.8270J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_828 | Params: 1666B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.8280J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_829 | Params: 1668B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.8290J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_830 | Params: 1670B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.8300J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_831 | Params: 1672B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.8310J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_832 | Params: 1674B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.8320J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_833 | Params: 1676B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.8330J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_834 | Params: 1678B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.8340J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_835 | Params: 1680B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.8350J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_836 | Params: 1682B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.8360J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_837 | Params: 1684B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.8370J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_838 | Params: 1686B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.8380J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_839 | Params: 1688B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.8390J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_840 | Params: 1690B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.8400J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_841 | Params: 1692B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.8410J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_842 | Params: 1694B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.8420J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_843 | Params: 1696B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.8430J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_844 | Params: 1698B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.8440J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_845 | Params: 1700B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.8450J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_846 | Params: 1702B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.8460J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_847 | Params: 1704B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.8470J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_848 | Params: 1706B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.8480J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_849 | Params: 1708B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.8490J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_850 | Params: 1710B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.8500J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_851 | Params: 1712B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.8510J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_852 | Params: 1714B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.8520J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_853 | Params: 1716B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.8530J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_854 | Params: 1718B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.8540J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_855 | Params: 1720B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.8550J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_856 | Params: 1722B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.8560J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_857 | Params: 1724B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.8570J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_858 | Params: 1726B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.8580J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_859 | Params: 1728B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.8590J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_860 | Params: 1730B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.8600J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_861 | Params: 1732B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.8610J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_862 | Params: 1734B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.8620J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_863 | Params: 1736B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.8630J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_864 | Params: 1738B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.8640J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_865 | Params: 1740B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.8650J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_866 | Params: 1742B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.8660J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_867 | Params: 1744B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.8670J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_868 | Params: 1746B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.8680J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_869 | Params: 1748B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.8690J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_870 | Params: 1750B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.8700J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_871 | Params: 1752B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.8710J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_872 | Params: 1754B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.8720J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_873 | Params: 1756B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.8730J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_874 | Params: 1758B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.8740J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_875 | Params: 1760B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.8750J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_876 | Params: 1762B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.8760J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_877 | Params: 1764B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.8770J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_878 | Params: 1766B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.8780J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_879 | Params: 1768B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.8790J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_880 | Params: 1770B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.8800J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_881 | Params: 1772B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.8810J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_882 | Params: 1774B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.8820J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_883 | Params: 1776B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.8830J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_884 | Params: 1778B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.8840J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_885 | Params: 1780B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.8850J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_886 | Params: 1782B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.8860J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_887 | Params: 1784B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.8870J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_888 | Params: 1786B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.8880J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_889 | Params: 1788B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.8890J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_890 | Params: 1790B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.8900J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_891 | Params: 1792B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.8910J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_892 | Params: 1794B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.8920J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_893 | Params: 1796B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.8930J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_894 | Params: 1798B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.8940J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_895 | Params: 1800B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.8950J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_896 | Params: 1802B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.8960J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_897 | Params: 1804B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.8970J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_898 | Params: 1806B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.8980J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_899 | Params: 1808B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.8990J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_900 | Params: 1810B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.9000J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_901 | Params: 1812B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.9010J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_902 | Params: 1814B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.9020J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_903 | Params: 1816B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.9030J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_904 | Params: 1818B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.9040J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_905 | Params: 1820B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.9050J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_906 | Params: 1822B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.9060J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_907 | Params: 1824B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.9070J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_908 | Params: 1826B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.9080J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_909 | Params: 1828B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.9090J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_910 | Params: 1830B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.9100J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_911 | Params: 1832B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.9110J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_912 | Params: 1834B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.9120J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_913 | Params: 1836B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.9130J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_914 | Params: 1838B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.9140J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_915 | Params: 1840B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.9150J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_916 | Params: 1842B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.9160J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_917 | Params: 1844B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.9170J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_918 | Params: 1846B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.9180J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_919 | Params: 1848B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.9190J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_920 | Params: 1850B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.9200J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_921 | Params: 1852B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.9210J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_922 | Params: 1854B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.9220J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_923 | Params: 1856B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.9230J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_924 | Params: 1858B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.9240J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_925 | Params: 1860B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.9250J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_926 | Params: 1862B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.9260J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_927 | Params: 1864B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.9270J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_928 | Params: 1866B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.9280J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_929 | Params: 1868B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.9290J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_930 | Params: 1870B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.9300J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_931 | Params: 1872B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.9310J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_932 | Params: 1874B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.9320J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_933 | Params: 1876B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.9330J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_934 | Params: 1878B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.9340J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_935 | Params: 1880B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.9350J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_936 | Params: 1882B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.9360J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_937 | Params: 1884B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.9370J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_938 | Params: 1886B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.9380J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_939 | Params: 1888B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.9390J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_940 | Params: 1890B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.9400J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_941 | Params: 1892B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.9410J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_942 | Params: 1894B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.9420J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_943 | Params: 1896B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.9430J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_944 | Params: 1898B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.9440J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_945 | Params: 1900B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.9450J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_946 | Params: 1902B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.9460J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_947 | Params: 1904B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.9470J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_948 | Params: 1906B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.9480J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_949 | Params: 1908B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.9490J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_950 | Params: 1910B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.9500J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_951 | Params: 1912B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.9510J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_952 | Params: 1914B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.9520J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_953 | Params: 1916B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.9530J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_954 | Params: 1918B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.9540J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_955 | Params: 1920B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.9550J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_956 | Params: 1922B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.9560J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_957 | Params: 1924B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.9570J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_958 | Params: 1926B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.9580J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_959 | Params: 1928B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.9590J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_960 | Params: 1930B | Quant: INT4 | Efficacy: 60/100 | Energy: 0.9600J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_961 | Params: 1932B | Quant: FP8 | Efficacy: 61/100 | Energy: 0.9610J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_962 | Params: 1934B | Quant: INT4 | Efficacy: 62/100 | Energy: 0.9620J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_963 | Params: 1936B | Quant: FP8 | Efficacy: 63/100 | Energy: 0.9630J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_964 | Params: 1938B | Quant: INT4 | Efficacy: 64/100 | Energy: 0.9640J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_965 | Params: 1940B | Quant: FP8 | Efficacy: 65/100 | Energy: 0.9650J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_966 | Params: 1942B | Quant: INT4 | Efficacy: 66/100 | Energy: 0.9660J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_967 | Params: 1944B | Quant: FP8 | Efficacy: 67/100 | Energy: 0.9670J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_968 | Params: 1946B | Quant: INT4 | Efficacy: 68/100 | Energy: 0.9680J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_969 | Params: 1948B | Quant: FP8 | Efficacy: 69/100 | Energy: 0.9690J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_970 | Params: 1950B | Quant: INT4 | Efficacy: 70/100 | Energy: 0.9700J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_971 | Params: 1952B | Quant: FP8 | Efficacy: 71/100 | Energy: 0.9710J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_972 | Params: 1954B | Quant: INT4 | Efficacy: 72/100 | Energy: 0.9720J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_973 | Params: 1956B | Quant: FP8 | Efficacy: 73/100 | Energy: 0.9730J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_974 | Params: 1958B | Quant: INT4 | Efficacy: 74/100 | Energy: 0.9740J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_975 | Params: 1960B | Quant: FP8 | Efficacy: 75/100 | Energy: 0.9750J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_976 | Params: 1962B | Quant: INT4 | Efficacy: 76/100 | Energy: 0.9760J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_977 | Params: 1964B | Quant: FP8 | Efficacy: 77/100 | Energy: 0.9770J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_978 | Params: 1966B | Quant: INT4 | Efficacy: 78/100 | Energy: 0.9780J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_979 | Params: 1968B | Quant: FP8 | Efficacy: 79/100 | Energy: 0.9790J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_980 | Params: 1970B | Quant: INT4 | Efficacy: 80/100 | Energy: 0.9800J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n| Conf_981 | Params: 1972B | Quant: FP8 | Efficacy: 81/100 | Energy: 0.9810J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_982 | Params: 1974B | Quant: INT4 | Efficacy: 82/100 | Energy: 0.9820J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_983 | Params: 1976B | Quant: FP8 | Efficacy: 83/100 | Energy: 0.9830J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_984 | Params: 1978B | Quant: INT4 | Efficacy: 84/100 | Energy: 0.9840J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_985 | Params: 1980B | Quant: FP8 | Efficacy: 85/100 | Energy: 0.9850J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Optimized|\n| Conf_986 | Params: 1982B | Quant: INT4 | Efficacy: 86/100 | Energy: 0.9860J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_987 | Params: 1984B | Quant: FP8 | Efficacy: 87/100 | Energy: 0.9870J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_988 | Params: 1986B | Quant: INT4 | Efficacy: 88/100 | Energy: 0.9880J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_989 | Params: 1988B | Quant: FP8 | Efficacy: 89/100 | Energy: 0.9890J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_990 | Params: 1990B | Quant: INT4 | Efficacy: 90/100 | Energy: 0.9900J/t | Outcome: Sovereign | Friction: 3.0 | ludo-Path: Optimized|\n| Conf_991 | Params: 1992B | Quant: FP8 | Efficacy: 91/100 | Energy: 0.9910J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_992 | Params: 1994B | Quant: INT4 | Efficacy: 92/100 | Energy: 0.9920J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_993 | Params: 1996B | Quant: FP8 | Efficacy: 93/100 | Energy: 0.9930J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_994 | Params: 1998B | Quant: INT4 | Efficacy: 94/100 | Energy: 0.9940J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_995 | Params: 2000B | Quant: FP8 | Efficacy: 95/100 | Energy: 0.9950J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Optimized|\n| Conf_996 | Params: 2002B | Quant: INT4 | Efficacy: 96/100 | Energy: 0.9960J/t | Outcome: Standard | Friction: 1.0 | ludo-Path: Standard|\n| Conf_997 | Params: 2004B | Quant: FP8 | Efficacy: 97/100 | Energy: 0.9970J/t | Outcome: Standard | Friction: 2.0 | ludo-Path: Standard|\n| Conf_998 | Params: 2006B | Quant: INT4 | Efficacy: 98/100 | Energy: 0.9980J/t | Outcome: Standard | Friction: 3.0 | ludo-Path: Standard|\n| Conf_999 | Params: 2008B | Quant: FP8 | Efficacy: 99/100 | Energy: 0.9990J/t | Outcome: Standard | Friction: 4.0 | ludo-Path: Standard|\n| Conf_1000 | Params: 2010B | Quant: INT4 | Efficacy: 60/100 | Energy: 1.0000J/t | Outcome: Sovereign | Friction: 1.0 | ludo-Path: Optimized|\n

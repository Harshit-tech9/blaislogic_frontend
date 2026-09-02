export const ARTICLES = [
  {
    id: 'cost-per-api-call',
    tag: 'AI Cost Modeling',
    title: 'Why cost per API call fails for agent workflows',
    subtitle: 'The unit that quietly breaks your AI economics is the one on your invoice',
    heroImage: '/articles/cost/Hero.png',
    heroAlt: 'A single low-cost model call on the left expands rightward through tools, a retry loop and human review before converging on one green accepted-outcome node.',
    cardSummary: 'Cost per API call looks reassuring and hides the truth. In agent workflows, retries, tool fees, growing context, failed runs and human review make the real unit cost per accepted outcome, often orders of magnitude higher. Blaiselogic explains the four cost units, where hidden cost appears, and a framework to measure what a successful outcome actually costs your business.',
    executiveSummary: [
      'A per-call or per-token price tells you what a model request costs. It does not tell you what a delivered business outcome costs. In agent workflows the two numbers can diverge by more than two orders of magnitude.',
      'Anthropic\'s own production data shows agents use about 4× more tokens than chat and multi-agent systems about 15× more, with token usage alone explaining 80% of performance variance on one internal evaluation.',
      'Reliability is the hidden multiplier. On tau-bench, a state-of-the-art function-calling agent reached ~61% success on a single attempt but dropped to ~25% when asked to repeat the same task eight times.',
      'Tool calls, retrieval, long context and human review are billed separately and often invisibly.',
      'Blaiselogic\'s operating position: measure cost per accepted outcome, attribute it at customer, workflow, run and outcome level.',
    ],
    sections: [
      {
        type: 'heading',
        text: 'Four cost units, four different truths',
      },
      {
        type: 'text',
        text: 'Most teams price AI on the unit their provider bills them on: the API call. That is precise, cheap to read, and misleading for anything agentic. There are really four units, and they answer four different questions.',
      },
      {
        type: 'definitions',
        items: [
          { term: 'Cost per API call', definition: 'Answers "what did this one model request cost?" As of August 2026, OpenAI\'s flagship GPT-5.6 Sol sits at $5/M input tokens and $30/M output tokens. That is a clean number for a single request. It is the wrong denominator for a workflow.' },
          { term: 'Cost per run', definition: 'Answers "what did one end-to-end execution of this workflow cost?" A run bundles many calls, tool invocations and retrieval steps. A single agent run routinely fans out into a dozen model calls plus tools.' },
          { term: 'Cost per completed task', definition: 'Answers "what did it cost to reach a terminal state?" This is where reliability enters. A run can complete without succeeding.' },
          { term: 'Cost per accepted business outcome', definition: 'Answers the only question a P&L cares about: "what did it cost to produce a result a human or the business actually accepted?" This folds in retries, rejected work, human review and rework.' },
        ],
      },
      {
        type: 'text',
        text: 'Princeton\'s Holistic Agent Leaderboard, which ran 21,730 agent rollouts across 9 models and 9 benchmarks, found that in only 1 of 9 benchmarks did the most expensive model land on the accuracy-versus-cost Pareto frontier. Paying more per call frequently buys nothing at the outcome level.',
      },
      {
        type: 'heading',
        text: 'Where hidden workflow cost actually appears',
      },
      {
        type: 'subheading',
        text: 'Retries and failure recovery',
      },
      {
        type: 'text',
        text: 'The most expensive line item in agentic AI is the work that fails and runs again. The tau-bench benchmark found a strong GPT-4o function-calling agent scored ~61% on a single attempt in the retail domain but fell to ~25% at pass^8. Reliability decays exponentially with repeated trials. A widely cited study found that models struggle to correct their own reasoning without external feedback and that performance can degrade after self-correction.',
      },
      {
        type: 'image',
        src: '/articles/cost/image 1.png',
        alt: 'Waterfall chart showing the true cost of an accepted outcome building from model calls up through tools, retries, review and rework',
      },
      {
        type: 'subheading',
        text: 'Multiple model calls and agent delegation',
      },
      {
        type: 'text',
        text: 'Agentic and multi-agent designs multiply token consumption by construction. Anthropic\'s engineering team reports that "agents typically use about 4× more tokens than chat interactions, and multi-agent systems use about 15× more tokens than chats." The same post states that "token usage by itself explains 80% of the variance" in performance on their BrowseComp evaluation.',
      },
      {
        type: 'subheading',
        text: 'Tool and third-party API calls',
      },
      {
        type: 'text',
        text: 'Tools bill on top of tokens. On OpenAI\'s platform, web search is charged at $10/1,000 calls for reasoning models and $25/1,000 for non-reasoning models. File search is $2.50/1,000 tool calls. Anthropic charges $10/1,000 web searches on top of token costs. An agent that searches several times per turn can quietly double its own bill.',
      },
      {
        type: 'subheading',
        text: 'Retrieval and growing context',
      },
      {
        type: 'text',
        text: 'Every turn in a stateful agent re-sends prior context. Because attention cost scales quadratically with sequence length in the prefill stage, long context is expensive to process and expensive to hold in the KV cache. Context that grows unchecked raises the price of every subsequent step in a run.',
      },
      {
        type: 'subheading',
        text: 'Human review and rework',
      },
      {
        type: 'text',
        text: 'When a workflow needs a human to check, correct or redo the AI\'s output, that labour is part of the cost of the outcome even though it never appears on the model invoice. MIT\'s "State of AI in Business 2025" report found that "just 5% of integrated AI pilots are extracting millions in value, while the vast majority remain stuck with no measurable P&L impact."',
      },
      {
        type: 'split',
        image: {
          src: '/articles/cost/image 2.png',
          alt: 'Core framework diagram showing six cost chips flowing into a numerator, divided by accepted outcomes, equalling cost per accepted outcome',
        },
        content: [
          {
            type: 'heading',
            text: 'The Blaiselogic framework: cost per accepted outcome',
          },
          {
            type: 'formula',
            text: 'Cost per accepted outcome = (model cost + tool cost + infrastructure + retries + human review + rework) ÷ accepted outcomes',
          },
          {
            type: 'text',
            text: 'The numerator sums every cost incurred in pursuit of results, including the runs that failed. The denominator counts only outcomes the business accepted. Define "accepted" before you measure: a resolved support ticket the customer confirmed, a research brief an analyst signed off, a merged pull request. The discipline is in the denominator.',
          },
        ]
      },
      {
        type: 'heading',
        text: 'Illustrative example: the cheap agent that is expensive per outcome',
      },
      {
        type: 'callout',
        text: 'The following numbers are illustrative assumptions, not measured results. They are constructed to show the mechanism, using published list prices as anchors.',
      },
      {
        type: 'text',
        text: 'Imagine a customer-support agent. A single answer looks cheap: ~$0.03 per attempt. Leadership sees "three cents a ticket" and celebrates.',
      },
      {
        type: 'text',
        text: 'Now apply workflow reality. Assume the agent genuinely resolves 40% of tickets. The other 60% need a retry, a second model, or a human. Each ticket averages 2.5 attempts before resolution, and 60% escalate to a human agent at ~$4 each.',
      },
      {
        type: 'text',
        text: 'Per 1,000 tickets: model and tool cost ~$75. Human handling on 600 escalations: $2,400. Total ~$2,475 to produce 400 accepted AI resolutions. Cost per accepted outcome: ~$6.19 — over 200× the $0.03 per-call figure.',
      },
      {
        type: 'image',
        src: '/articles/cost/image 3.png',
        alt: 'Measurement ladder for agent workflows',
      },
      {
        type: 'heading',
        text: 'What to measure next week',
      },
      {
        type: 'list',
        items: [
          'Pick one workflow and define "accepted." Write down the single condition that makes an outcome count.',
          'Instrument runs as traces, not calls. Adopt OpenTelemetry GenAI conventions so every model call, tool call and retrieval step rolls up to a run ID.',
          'Attach a customer or workflow tag to every trace. Without attribution you cannot allocate cost to value.',
          'Measure your retry and escalation rate. Count attempts per accepted outcome — this is your reliability tax.',
          'Add tool and human-review cost to the ledger. Include web search, code execution, retrieval and loaded human time.',
          'Compute cost per accepted outcome weekly and track it against cost per call.',
          'Set a per-run cost ceiling so a runaway agent cannot multiply a single query\'s cost.',
        ],
      },
      {
        type: 'heading',
        text: 'The Blaiselogic perspective',
      },
      {
        type: 'text',
        text: 'Per-token prices keep falling, yet enterprise AI bills keep climbing, because agentic workflows multiply tokens per task faster than unit prices drop. That is arithmetic, not mismanagement. Treating AI as a collection of model calls makes the cheap unit visible and the expensive one invisible. Operating AI as a measurable business system means instrumenting the whole workflow, defining what a good outcome is, and pricing that outcome honestly.',
      },
      {
        type: 'blockquote',
        text: 'If you sell or operate AI, the question is not only "What did this call cost?" It is "What did a successful outcome cost us?"',
      },
    ],
    sources: [
      { ref: 'OpenAI Pricing', url: 'https://platform.openai.com/docs/pricing/' },
      { ref: 'Anthropic: How we built our multi-agent research system', url: 'https://www.anthropic.com/engineering/multi-agent-research-system' },
      { ref: 'tau-bench: A Benchmark for Tool-Agent-User Interaction', url: 'https://arxiv.org/abs/2406.12045' },
      { ref: 'Large Language Models Cannot Self-Correct Reasoning Yet', url: 'https://arxiv.org/abs/2310.01798' },
      { ref: 'Why Do Multi-Agent LLM Systems Fail?', url: 'https://arxiv.org/abs/2503.13657' },
      { ref: 'Holistic Agent Leaderboard, Princeton', url: 'https://hal.cs.princeton.edu/' },
      { ref: 'FinOps for AI, FinOps Foundation', url: 'https://www.finops.org/framework/technology-categories/ai/' },
      { ref: 'MIT: State of AI in Business 2025 (via Forbes)', url: 'https://www.forbes.com/sites/jaimecatmull/2025/08/22/mit-says-95-of-enterprise-ai-failsheres-what-the-5-are-doing-right/' },
    ],
  },
  {
    id: 'usage-not-revenue',
    tag: 'Billing & Pricing',
    title: 'Usage is not yet revenue: designing the AI billing pipeline',
    subtitle: 'Designing the AI billing pipeline from activity to collected, reconciled value',
    heroImage: '/articles/billing/Hero.png',
    heroAlt: 'Editorial pipeline showing raw AI activity becoming measured usage, qualified value, and finally collected and reconciled revenue, with leakage before qualification.',
    cardSummary: 'AI usage is telemetry, not revenue. Before an AI event becomes a collectible and profitable commercial outcome, it must be attributed to a customer and workflow, qualified against the contract, rated by the right pricing rule, invoiced, collected, and reconciled. This Blaiselogic framework shows product, finance, and engineering teams how to connect execution cost with customer value and margin together.',
    executiveSummary: [
      'AI activity is telemetry, not revenue. A model call, token count, tool invocation, or completed workflow records that work happened; it does not identify the customer, establish that the work is billable, or prove collection.',
      'AI billing needs mediation between engineering and finance. Raw events must be attributed, filtered, aggregated, rated, and tied to a contract before they become a charge.',
      'Cost and revenue are different ledgers. AI execution incurs token, cache, tool, search, container costs; the customer may be charged for a qualified outcome or credit drawdown.',
      'An invoice is not payment, and payment is not automatically recognised revenue.',
      'The design principle: preserve an evidence chain from activity to customer, workflow, price, invoice, payment, and ledger entry.',
    ],
    sections: [
      {
        type: 'heading',
        text: 'The commercial meaning of "usage"',
      },
      {
        type: 'text',
        text: 'An AI product can generate substantial activity without generating collectible or profitable revenue. A request may fail, produce an unusable answer, be covered by an allowance, consume prepaid credits, fall outside the contract, or be priced below its attributable cost. Even a valid invoice may remain unpaid, be refunded, or be disputed.',
      },
      {
        type: 'table',
        headers: ['Term', 'Meaning', 'What it does not prove'],
        rows: [
          ['AI activity', 'A raw event: prompt, completion, tool call, retrieval, retry, workflow step, or agent run.', 'That the event belongs to the right customer or created value.'],
          ['Metered usage', 'Activity captured and transformed into a quantity through a defined filter and aggregation rule.', 'That the quantity is covered by a contract or should be charged.'],
          ['Priced usage', 'A qualified quantity matched to a product, rate card, contract, allowance, credit balance, or commitment.', 'That the amount has been invoiced or collected.'],
          ['Charge or invoice', 'A monetary obligation calculated under the commercial rule and presented for payment.', 'That payment succeeded or accounting recognition is complete.'],
          ['Collected and reconciled revenue', 'A payment matched to the correct invoice and customer, with service and accounting records aligned.', 'Nothing beyond the evidence retained.'],
        ],
      },
      {
        type: 'callout',
        text: 'Instrumentation preserves facts; billing applies commercial meaning.',
      },
      {
        type: 'heading',
        text: 'Why AI pricing is harder than traditional SaaS pricing',
      },
      {
        type: 'text',
        text: 'Traditional SaaS can often approximate cost with a stable hosting baseline and price by seat, workspace, or plan. AI adds a variable execution layer. Provider bills may depend on input and output tokens, cached input, cache writes, tool calls, web search, containers, audio, images, or video. Rates and model catalogues change, so a pricing system that assumes one stable "AI request" unit will age badly.',
      },
      {
        type: 'text',
        text: 'Agent workflows create nested costs. One request can trigger planning, retrieval, browser or code tools, multiple model calls, retries, validation, and a final response. Billing every intermediate step may be commercially indefensible. Billing only the final outcome may align with value and be difficult to prove.',
      },
      {
        type: 'heading',
        text: 'The Blaiselogic AI billing pipeline',
      },
      {
        type: 'image',
        src: '/articles/billing/image 1.png',
        alt: 'Seven-stage AI billing pipeline diagram from Activity through to Payment Reconciliation',
      },
      {
        type: 'formula',
        text: 'AI Activity → Cost Attribution → Outcome Qualification → Pricing Rule → Charge → Invoice → Payment → Reconciliation',
      },
      {
        type: 'table',
        headers: ['Stage', 'Practical question', 'Minimum record'],
        rows: [
          ['AI Activity', 'What work occurred?', 'Event ID, timestamp, model, tokens, tools, workflow, status.'],
          ['Cost Attribution', 'What did it cost, and for whom?', 'Provider request ID, tenant, workflow, cost dimensions, allocation basis.'],
          ['Outcome Qualification', 'Does it meet the billable success rule?', 'Success criteria, technical result, quality signal, exclusions, decision.'],
          ['Pricing Rule', 'What price and entitlement apply?', 'Product, meter, rate-card version, contract, credits, commitment, discount.'],
          ['Charge', 'What amount is owed?', 'Quantity, unit price, currency, rounding, rating inputs, idempotency key.'],
          ['Invoice', 'What formal statement is presented?', 'Invoice ID, line items, service dates, status, source-event references.'],
          ['Payment', 'Was money collected?', 'Payment ID, status, settlement date, failure or retry history.'],
          ['Reconciliation', 'Do usage, cost, invoice, payment, and accounting records agree?', 'Exceptions, adjustments, refunds, credit notes, ledger references.'],
        ],
      },
      {
        type: 'split',
        image: {
          src: '/articles/billing/image 2.png',
          alt: 'Two-ledger visual showing Execution Cost and Customer Revenue ledgers',
        },
        content: [
          {
            type: 'heading',
            text: 'The dangerous gap: profitable usage versus expensive usage',
          },
          {
            type: 'text',
            text: 'The most dangerous failure is captured usage with negative unit economics. A company may know that Customer A ran 10,000 agent steps but be unable to identify the model, retrieval, retry, and human-review costs belonging to them. It may charge a flat fee set before the workflow became multi-step, or burn prepaid credits without recording the cost of the workflow.',
          },
          {
            type: 'text',
            text: 'Maintain an Execution Cost ledger and a Customer Revenue ledger, connected by customer, contract, workflow, and outcome. Margin appears only when the same unit can be observed on both sides.',
          },
        ]
      },
      {
        type: 'split',
        image: {
          src: '/articles/billing/image 3.png',
          alt: 'Illustrative unit-economics card',
        },
        content: [
          {
            type: 'heading',
            text: 'Illustrative example: a research-agent workflow',
          },
          {
            type: 'callout',
            text: 'The following example is illustrative, not a customer benchmark or accounting conclusion.',
          },
          {
            type: 'text',
            text: 'A research-agent product sells a qualified research outcome for $12.00. One request creates six model calls, four retrieval calls, two validation passes, and one final report. The system attributes $4.82 of cost to that workflow.',
          },
          {
            type: 'formula',
            text: '($12.00 − $4.82) ÷ $12.00 = 59.8% unit gross margin',
          },
          {
            type: 'text',
            text: 'This is unit gross margin, not company-wide gross margin. If the workflow fails qualification, the company may still bear $4.82 while charging nothing. That is why qualification belongs in the pipeline rather than in a post hoc finance report.',
          },
        ]
      },
      {
        type: 'image',
        src: '/articles/billing/image 4.png',
        alt: 'Leakage map identifying unmetered activity, attribution errors, qualification failure, and other gaps where revenue is lost',
      },
      {
        type: 'heading',
        text: 'Practical launch checklist',
      },
      {
        type: 'list',
        items: [
          'Define a canonical event schema with immutable IDs, tenant and workflow IDs, timestamps, provider IDs, model/tool dimensions, status, and contract context.',
          'Separate raw activity from billable metrics and pricing configuration so commercial rules can change without re-instrumentation.',
          'Make ingestion and charge creation idempotent — apply the same discipline as Stripe\'s safe retrying.',
          'Version meters, outcome rules, rate cards, contracts, and invoice calculations.',
          'Test failures, retries, late and duplicate events, time-zone boundaries, partial workflows, credit expiry, refunds, disputes, and payment failure.',
          'Provide usage views and invoice previews.',
          'Reconcile provider cost, internal attribution, rated usage, invoices, payments, credits, refunds, and the general ledger. Report exceptions; do not silently drop them.',
        ],
      },
      {
        type: 'heading',
        text: 'Blaiselogic perspective',
      },
      {
        type: 'blockquote',
        text: 'Usage is evidence that work happened. Revenue is evidence that the business can measure, price, collect and reconcile the value delivered.',
      },
      {
        type: 'text',
        text: 'The goal is not to turn every log line into a bill. It is to build a defensible chain from execution to value, with enough precision for product decisions, enough transparency for customers, enough control for finance, and enough resilience for engineering.',
      },
    ],
    sources: [
      { ref: 'Stripe: Usage-based billing', url: 'https://docs.stripe.com/billing/usage-based' },
      { ref: 'Metronome: How Metronome works', url: 'https://docs.metronome.com/guides/get-started/how-metronome-works' },
      { ref: 'Orb: Query-based billing', url: 'https://docs.withorb.com/architecture/query-based-billing' },
      { ref: 'AWS: Track usage and costs in Amazon Bedrock', url: 'https://docs.aws.amazon.com/bedrock/latest/userguide/cost-management.html' },
      { ref: 'OpenAI Pricing', url: 'https://developers.openai.com/api/docs/pricing' },
      { ref: 'Stripe: Invoice status transitions', url: 'https://docs.stripe.com/invoicing/integration/workflow-transitions' },
      { ref: 'IFRS 15 Revenue from Contracts with Customers', url: 'https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/' },
    ],
  },
  {
    id: 'four-enterprise-metrics',
    tag: 'Governance',
    title: 'The four metrics every enterprise AI programme should measure',
    subtitle: 'A practical operating model for connecting adoption, quality, cost and realised business value',
    heroImage: '/articles/metrics/Hero.png',
    heroAlt: 'Four connected enterprise AI measurement modules show workflow adoption leading to qualified outcomes, cost per accepted outcome and net value realisation.',
    cardSummary: 'Most enterprise AI dashboards measure activity: pilots, users, prompts and model spend. This Blaiselogic Research article proposes four decision metrics — Workflow Adoption Rate, Qualified Outcome Rate, Cost per Accepted Outcome and Net Value Realisation — to show whether AI workflows are used, produce acceptable work, operate economically and create benefits that survive full-cost and baseline scrutiny before committing to scale decisions.',
    executiveSummary: [
      'Activity is a leading signal, not proof of value. Pilots, users, prompts and spend do not show whether useful work was completed.',
      'Quality must be defined before scale. An AI output only becomes a business outcome after it passes an agreed completion and quality threshold.',
      'Cost needs a business denominator. Cost per accepted outcome reveals the economics hidden by token prices and average prompt cost.',
      'Value must be realised, net and time-bound. Count benefits against a baseline, subtract technology and implementation costs, and do not count the same benefit twice.',
      'The four metrics form one decision chain: Adoption → Qualified outcomes → Unit economics → Net value.',
    ],
    sections: [
      {
        type: 'split',
        image: {
          src: '/articles/metrics/image 3.png',
          alt: 'Vanity metrics versus decision metrics',
        },
        content: [
          {
            type: 'heading',
            text: 'Why activity metrics create false confidence',
          },
          {
            type: 'text',
            text: 'The measurement problem begins when an organisation confuses the presence of AI with the performance of AI.',
          },
          {
            type: 'definitions',
            items: [
              { term: 'Number of pilots', definition: 'Records exploration, not repeatable production. It may lack a stable owner, quality threshold or business baseline. Stanford\'s review of 51 enterprise deployments found that outcomes with similar technologies varied widely and depended on organisational readiness, process and leadership — not simply the model.' },
              { term: 'Number of users', definition: 'A licence or login shows access. "Monthly active user" can combine production use with curiosity or training. Adoption becomes meaningful when the approved workflow is used for its intended work.' },
              { term: 'Number of prompts', definition: 'More prompts may reflect productive use, retries, rework or output that never enters a business process. More exchanges can mean engagement or difficulty obtaining the right answer.' },
              { term: 'Total model spend', definition: 'Spend is an input. It does not reveal what was accepted or whether a higher-cost model created more value.' },
            ],
          },
        ]
      },
      {
        type: 'heading',
        text: 'Metric 1: Workflow Adoption Rate',
      },
      {
        type: 'formula',
        text: 'Workflow Adoption Rate = Eligible workflow instances using the approved AI workflow ÷ Total eligible workflow instances × 100',
      },
      {
        type: 'text',
        text: 'Low adoption can explain weak programme value before leaders blame the model. It can expose poor workflow fit, missing integrations, unclear policy, inadequate training or distrust. "Genuine use" means a qualifying production step, not a login or open tab.',
      },
      {
        type: 'callout',
        text: 'Example: A claims team processed 10,000 claims eligible for an approved AI workflow. AI was genuinely used on 6,400. Workflow Adoption Rate is 64%. This identifies a coverage question; it does not yet prove quality or value.',
      },
      {
        type: 'heading',
        text: 'Metric 2: Qualified Outcome Rate',
      },
      {
        type: 'formula',
        text: 'Qualified Outcome Rate = AI-assisted outcomes meeting completion and quality thresholds ÷ All AI-assisted outcomes assessed × 100',
      },
      {
        type: 'text',
        text: '"Output generated" is a technical event; "outcome accepted" is an operating decision. NIST recommends defining acceptable performance limits and monitoring deployed performance in context. The quality contract must fit the workflow: accuracy, completeness, compliance, resolution, defect limits or expert review.',
      },
      {
        type: 'callout',
        text: 'Example: Of 6,400 AI-assisted claims summaries, 5,120 are complete, supported by the source record, compliant with the template and accepted by reviewers. Qualified Outcome Rate is 80%. The remaining 1,280 are not "productivity" — they are review, rework or failure demand.',
      },
      {
        type: 'heading',
        text: 'Metric 3: Cost per Accepted Outcome',
      },
      {
        type: 'formula',
        text: 'Cost per Accepted Outcome = (Model + tool cost + data + infrastructure + allocated platform + incremental human review + rework cost) ÷ Accepted outcomes',
      },
      {
        type: 'text',
        text: 'Token cost can optimise a component, but it cannot determine whether the workflow is economic. Outcome-linked unit cost allows leaders to compare model routes, automation levels and human-review designs without rewarding a cheap system that produces unusable work.',
      },
      {
        type: 'callout',
        text: 'Example: The claims workflow incurs ₹96,000 in model and tool cost, ₹44,000 in infrastructure and ₹1,16,000 in incremental review and rework. With 5,120 accepted outcomes, Cost per Accepted Outcome is ₹50.',
      },
      {
        type: 'heading',
        text: 'Metric 4: Net Value Realisation',
      },
      {
        type: 'formula',
        text: 'Net Value Realisation = Realised revenue uplift + cost avoidance + monetised capacity benefit + quality value + risk reduction − technology cost − implementation cost − incremental human effort',
      },
      {
        type: 'text',
        text: 'This is the metric that tests whether adoption, quality and unit economics translate into an enterprise result. Time saved is not automatically a cash saving: it may create capacity without reducing the budget. UK efficiency guidance explicitly separates cash-releasing from non-cash-releasing benefits.',
      },
      {
        type: 'callout',
        text: 'Example: In one quarter, the workflow produces ₹12 lakh of evidenced processing capacity and ₹3 lakh of avoided error cost. Technology, implementation and incremental review total ₹8 lakh. Net Value Realisation is ₹7 lakh.',
      },
      {
        type: 'heading',
        text: 'One chain, four scale decisions',
      },
      {
        type: 'image',
        src: '/articles/metrics/image 1.png',
        alt: 'The Enterprise AI Value Chain diagram connecting adoption, quality, cost, and net value',
      },
      {
        type: 'text',
        text: 'The metrics are diagnostic only when read together: Adoption → Qualified outcomes → Cost per accepted outcome → Net value.',
      },
      {
        type: 'definitions',
        items: [
          { term: 'High quality with low adoption', definition: 'Suggests a workflow, trust, training or integration problem.' },
          { term: 'High adoption with low qualification', definition: 'Suggests quality failure or use outside the approved scope.' },
          { term: 'High qualification with poor unit cost', definition: 'Suggests routing, review, architecture or volume economics need redesign.' },
          { term: 'Strong unit economics with weak net value', definition: 'Suggests the use case is too small, benefits are not being realised, or the baseline was wrong.' },
        ],
      },
      {
        type: 'image',
        src: '/articles/metrics/image 2.png',
        alt: 'Illustrative executive scorecard showing workflow adoption rate, qualified outcome rate, cost per accepted outcome, and net value realisation',
      },
      {
        type: 'heading',
        text: 'A 90-day implementation plan',
      },
      {
        type: 'image',
        src: '/articles/metrics/image 4.png',
        alt: '90-day measurement roadmap',
      },
      {
        type: 'subheading',
        text: 'Days 0–30: Select workflows and define baselines',
      },
      {
        type: 'text',
        text: 'Choose one to three workflows with accountable owners and meaningful volume. Define eligible users or instances, accepted outcomes, quality floors and disqualifying conditions. Capture the non-AI baseline for time, cost, quality, rework and risk.',
      },
      {
        type: 'subheading',
        text: 'Days 31–60: Instrument activity, quality and cost',
      },
      {
        type: 'text',
        text: 'Create a workflow event model from eligibility through AI use, review, acceptance and downstream completion. Join model and infrastructure cost to each run. Capture review minutes, retries, overrides, exceptions and rework. Calibrate the quality rubric with domain experts.',
      },
      {
        type: 'subheading',
        text: 'Days 61–90: Review value and make scale decisions',
      },
      {
        type: 'text',
        text: 'Compare the AI-assisted workflow with baseline or a credible comparison group. Reconcile benefits with finance, subtract full period costs and run downside and upside scenarios. Diagnose the weakest link in the chain. Improve, retrain, reroute, narrow scope, scale, hold or retire the workflow.',
      },
      {
        type: 'heading',
        text: 'The Blaiselogic perspective',
      },
      {
        type: 'blockquote',
        text: 'AI adoption is not a scoreboard of activity. It is a business operating model for producing better outcomes at an economically sustainable cost.',
      },
    ],
    sources: [
      { ref: 'UK Evaluation Task Force: Guidance on Impact Evaluation of AI Interventions', url: 'https://www.gov.uk/government/publications/the-magenta-book/guidance-on-the-impact-evaluation-of-ai-interventions-html' },
      { ref: 'NIST AI Risk Management Framework', url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf' },
      { ref: 'ISO/IEC 42001:2023 — AI management systems', url: 'https://www.iso.org/standard/42001' },
      { ref: 'FinOps Foundation: Unit Economics', url: 'https://www.finops.org/framework/capabilities/unit-economics/' },
      { ref: 'Stanford Digital Economy Lab: The Enterprise AI Playbook', url: 'https://digitaleconomy.stanford.edu/publication/enterprise-ai-playbook/' },
      { ref: 'UK Digital and Data Benefits Framework', url: 'https://www.gov.uk/government/publications/digital-and-data-benefits-framework/digital-and-data-benefits-framework' },
      { ref: 'Generative AI at Work — Quarterly Journal of Economics', url: 'https://academic.oup.com/qje/article/140/2/889/7990658' },
      { ref: 'Navigating the Jagged Technological Frontier — Organization Science', url: 'https://doi.org/10.1287/orsc.2025.21838' },
    ],
  },
]

/* Clients are never named on this site; employers only where cleared. */

export type Project = {
  id: "shop" | "aisle" | "bench" | "server";
  place: string;
  title: string;
  sub: string;
  meta: string;
  brief: string;
  work: string[];
  outcome: string;
  stats: { n: string; c: string }[];
  note?: { label: string; text: string };
  compare?: { rows: [string, string, string][] };
  stack: string;
  sceneLabel: string;
};

export const projects: Project[] = [
  {
    id: "shop",
    place: "The shop",
    title: "Retail Platform",
    sub: "The till, the stockroom and the books of a phone shop",
    meta: "Independent · since 2023",
    brief:
      "A busy phone and accessories shop needed to sell quickly at the counter, know what was running low, and see the day's takings without waiting for someone to add them up.",
    work: [
      "A point of sale with instant product search, stock, repairs, receipts, refunds and held orders, on a Django backend. Every morning an AI analyst reads the previous day's trade and sends the owner a plain-language report on their phone.",
      "Staff sign in with passkeys, and the server sits behind a web application firewall.",
    ],
    outcome:
      "In daily trade since 2023. In September 2026 I rebuilt it from the foundations: one clean data model, proper roles for managers and staff, and tests that check the money, not just whether the screen loads. The rebuilt version is live today.",
    stats: [
      { n: "214", c: "automated tests guarding the rebuild" },
      { n: "22/22", c: "money checks passed against production, by arithmetic" },
    ],
    note: {
      label: "Field note",
      text: "A refund once updated the database but not the till's cache, so the counter refused a sale it could make. Nothing errored; only the answer was wrong. That is why the tests check arithmetic.",
    },
    stack: "Django REST · React · PostgreSQL · Redis · Meilisearch · Firebase push · WebAuthn · ModSecurity · GitHub Actions",
    sceneLabel:
      "Model of a phone shop with a counter, till and printing receipt, which separates into API, data and perimeter layers as you scroll.",
  },
  {
    id: "aisle",
    place: "The aisle",
    title: "Shelf Label Platform",
    sub: "Retiring a fifteen-year-old .NET system for a retail-technology company",
    meta: "Generative AI studio · 2026 · Lead engineer",
    brief:
      "Electronic shelf labels are the small screens that show prices on supermarket shelves. The platform that designed and sent them was fifteen years old, tied to Windows, and served one retailer per installation. It had to be replaced without the labels going dark.",
    work: [
      "I lead the migration end to end. A new label designer that embeds in several host applications, with a pixel-accurate canvas and an AI assistant that proposes three designs per request.",
      "Behind it, a new backend: a rules engine that decides which template each product gets, a renderer that draws labels on any server, and data built to serve many retailers at once.",
    ],
    outcome:
      "Real labels on real shelves have updated from the new platform since August 2026. I demonstrate progress to the client every two weeks.",
    stats: [
      { n: "62", c: "real templates from two live tenants, used to choose the new renderer" },
      { n: "55s→22s", c: "response time of the AI design assistant after tuning" },
    ],
    compare: {
      rows: [
        ["Rendering", "WPF, Windows only", "SVG, any Linux server"],
        ["Retailers", "One per install", "Many, kept apart"],
        ["Matching", "Exact pixel size", "Rules, then display fit"],
        ["Design help", "None", "AI, three options a turn"],
      ],
    },
    note: {
      label: "Same aisle",
      text: "Planogram compliance: shelf photographs in, products detected and compared with the planned layout, a compliance score out. I contributed to the analysis pipeline as part of a team.",
    },
    stack: "React micro-frontend · FastAPI · PostgreSQL · Redis · Kafka · resvg · Gemini · OAuth2 · audit log",
    sceneLabel:
      "Model of a supermarket aisle whose shelf labels refresh in a wave while a camera checks the shelf, separating into designer, renderer and tenant layers as you scroll.",
  },
  {
    id: "bench",
    place: "The bench",
    title: "IT Support Assistant",
    sub: "In production with the IT technicians who look after a Kenyan bank",
    meta: "Computer Revolution Africa · 2025",
    brief:
      "A technician told me he spent more time writing repair reports than repairing machines: twenty-five to thirty minutes a report, eight to ten machines a day.",
    work: [
      "A guided four-step report. The technician describes the machine and what they found; AI researches current fixes on the web and drafts the recommendations; a senior reviews and approves; the report exports to PDF or Word.",
      "Around it sit five roles from technician to IT manager, a repair history for every machine, and an assistant that answers questions from the team's own past reports.",
    ],
    outcome:
      "Reports now take ten to fifteen minutes and read consistently. The system has filed more than 320 reports in production and is in use today.",
    stats: [
      { n: "320+", c: "service reports filed in production" },
      { n: "½", c: "the time per report: from 25–30 minutes down to 10–15" },
    ],
    stack: "React · Supabase (Postgres, row-level security, two-factor sign-in) · Cerebras and Groq models · Tavily web search · installable web app",
    sceneLabel:
      "Model of a repair bench with an opened computer and a laptop drafting a report, separating into report, research and records layers as you scroll.",
  },
  {
    id: "server",
    place: "The server",
    title: "Cyberguard",
    sub: "An AI that reads web server logs and closes the door on attackers",
    meta: "Computer Revolution Africa · 2025",
    brief:
      "Signature-based security tools catch what they have seen before, and attackers change their wording. The aim was a guard that understands intent and that a small company could afford to run.",
    work: [
      "Two tiers. A small local model reads every request and settles the obvious cases. Only the hard ones go to a larger cloud model, which can consult global threat databases. Confident threats are blocked at the firewall for an hour, and every decision is logged with its reasoning.",
      "From four months of the traffic it saw, I then fine-tuned a small model into an HTTP threat classifier that runs on an ordinary processor.",
    ],
    outcome: "Ran in production testing on a client server, at a fraction of the cost of sending everything to the cloud.",
    stats: [
      { n: "90%", c: "lower AI cost than a cloud-only design" },
      { n: "93.3%", c: "accuracy of the fine-tuned classifier, on CPU alone" },
    ],
    note: { label: "Footprint", text: "Quantisation took the classifier from 6 GB to 1.9 GB, small enough to sit beside the web server it protects." },
    stack: "Local and cloud language models · Qwen2.5 fine-tune · AbuseIPDB · VirusTotal · Upstash Redis · iptables · Azure Firewall · Docker",
    sceneLabel:
      "Model of a server room where requests walk through a gate and hostile ones are dropped, separating into pattern-check, local-model, cloud-model and response layers as you scroll.",
  },
];

export const alsoBuilt = [
  {
    title: "Code review platform",
    meta: "Internal · 2026",
    text: "Maps a company's repositories into a graph of every function and what depends on it, reviews code against house rules, writes and runs tests in a sandbox, and traces each requirement in a statement of work to the code that satisfies it. Its chat assistant cannot delete anything, by design.",
  },
  {
    title: "Spoken time sheets",
    meta: "Internal · 2026",
    text: "“Two hours on the checkout redesign, bug fixes, yesterday” becomes a structured entry, shown back and filed only once you confirm. It can also draft the day from your GitHub activity and calendar.",
  },
  {
    title: "DocsAI",
    meta: "2026",
    text: "Plain-English questions over a company's documents and databases. Read-only by design: any attempt to change or delete data is refused.",
  },
  {
    title: "Microsoft Docs Helper",
    meta: "2025",
    text: "Thousands of Microsoft documentation pages, answered in about two seconds, every answer linked to its source.",
  },
  {
    title: "AI Penetration Tester",
    meta: "Research",
    text: "An agent that plans a security assessment of systems you own, choosing among some seventy tools as a human tester would.",
  },
  {
    title: "Crop Quality Grader",
    meta: "2025",
    text: "A photograph of produce in, a hundred-point quality grade out, for an agricultural marketplace.",
  },
];

export const record = [
  {
    when: "Apr 2026 – now",
    where: "A generative AI studio",
    role: "GenAI Specialist",
    text: "Generative AI and full-stack engineering on client and internal products. Lead on a retail-technology client's shelf label platform migration.",
  },
  {
    when: "May 2025 – Apr 2026",
    where: "Computer Revolution Africa",
    role: "Innovations Engineer",
    text: "Conceived and built the company's AI products end to end, from first idea to deployment at client sites, including a Kenyan bank.",
  },
  {
    when: "2023 – now",
    where: "Independent",
    role: "Retail platform",
    text: "Designed, built and still operate a phone shop's point of sale and business platform.",
  },
  {
    when: "Education",
    where: "KCA University",
    role: "BSc Information and Communication Technology",
    text: "",
  },
];

export const instruments = [
  { label: "Web", text: "Next.js, React, TypeScript, Tailwind CSS, micro-frontends, accessibility and technical SEO." },
  { label: "Intelligence", text: "OpenAI, Anthropic Claude, Google Gemini, retrieval over private documents with Qdrant and pgvector, model fine-tuning, n8n." },
  { label: "Server", text: "Python with FastAPI and Django, Node.js, PostgreSQL, Redis, Celery, Docker, GitHub Actions, AWS." },
  { label: "Safety", text: "Passkeys, role-based access, web application firewalls, CrowdSec, Cloudflare, audit trails." },
];

export type ProjectLink = { label: string; href: string; kind: "github" | "huggingface" | "pages" | "docker" };

export type Project = {
  slug: string;
  repo: string;
  title: string;
  category: string;
  icon: "scan" | "stethoscope" | "store" | "map" | "scale" | "sparkles" | "workflow";
  /** Muted accent used only for the soft glow on the project cover. */
  accent: string;
  /** One-line hook shown on the card. */
  hook: string;
  /** Bold lead sentence in the detail view. */
  lead: string;
  description: string;
  highlights: string[];
  stack: string[];
  role: string;
  year: string;
  language: string;
  featured?: boolean;
  metrics?: { label: string; value: string }[];
  links: ProjectLink[];
};

const gh = (repo: string): ProjectLink => ({
  label: "GitHub",
  href: `https://github.com/paulelisha500-ops/${repo}`,
  kind: "github",
});
const space = (repo: string): ProjectLink => ({
  label: "Live on Hugging Face",
  href: `https://huggingface.co/spaces/Elisha622/${repo}`,
  kind: "huggingface",
});
const pages = (repo: string): ProjectLink => ({
  label: "Live site",
  href: `https://paulelisha500-ops.github.io/${repo}/`,
  kind: "pages",
});

export const projects: Project[] = [
  {
    slug: "skinsense",
    accent: "#e0a458",
    repo: "skinsense",
    title: "SkinSense",
    category: "Computer Vision",
    icon: "scan",
    hook: "AI skin screening, routines and progress tracking.",
    lead: "Take one photo and a fine-tuned EfficientNet-B0 screens it across seven skin conditions, then builds a routine around it.",
    description:
      "Final-year team project (3 members). The website is on GitHub Pages and the AI scanner runs on Hugging Face Spaces. The model returns every class's confidence, not just the top one, and marks anything under 40% as unclear instead of guessing. Severe results escalate to a dermatologist; normal skin never does.",
    highlights: [
      "Fine-tuned EfficientNet-B0 across acne, dry skin, eczema, hyperpigmentation, normal, oily and rosacea",
      "Morning and evening routines built from a catalogue of 34 products",
      "Check-ins, streaks and before/after photos over a 30-day plan",
      "Admin console and persistence on a private Hugging Face dataset",
    ],
    stack: ["PyTorch", "torchvision", "EfficientNet-B0", "OpenCV", "Gradio", "Hugging Face Hub"],
    role: "Team project",
    year: "2026",
    language: "Python",
    featured: true,
    metrics: [
      { label: "Conditions", value: "7" },
      { label: "Products", value: "34" },
      { label: "Plan", value: "30 days" },
    ],
    links: [
      gh("skinsense"),
      { label: "Website", href: "https://paulelisha500-ops.github.io/skinsense/", kind: "pages" },
      { label: "Open the app", href: "https://huggingface.co/spaces/Elisha622/skinsense", kind: "huggingface" },
    ],
  },
  {
    slug: "medverse-ai",
    accent: "#5ec2b7",
    repo: "medverse-ai",
    title: "MedVerse AI",
    category: "LLMs · RAG",
    icon: "stethoscope",
    hook: "Clinical intelligence platform with a grounded RAG assistant.",
    lead: "A healthcare AI platform centred on retrieval-augmented generation, NLP and predictive risk, behind real auth and role-based dashboards.",
    description:
      "A grounded clinical and patient assistant, medical report understanding, disease-risk scoring and a medication interaction checker, for admins, doctors and patients. The browser edition runs the whole thing client-side, free on Hugging Face and GitHub Pages.",
    highlights: [
      "Sentence-transformer embeddings and FAISS retrieval; every answer shows its sources",
      "Lab-value extraction plus LLM summaries for patients and clinicians",
      "Two scikit-learn risk models with coefficient-based explanations",
      "Live openFDA label checks with RxNorm name resolution and 230 reviewed interaction pairs",
    ],
    stack: ["RAG", "FAISS", "Sentence Transformers", "Transformers.js", "scikit-learn", "FastAPI", "React"],
    role: "Solo project",
    year: "2026",
    language: "Python",
    featured: true,
    links: [gh("medverse-ai"), space("medverse-ai"), pages("medverse-ai")],
  },
  {
    slug: "retailmind",
    accent: "#7aa2f7",
    repo: "retailmind",
    title: "RetailMind",
    category: "Forecasting",
    icon: "store",
    hook: "Retail operations console that runs entirely in the browser.",
    lead: "Forecasting, procurement, shelf alerts, a register with loyalty and a customer app: one retail console with its whole backend inside the page.",
    description:
      "Demand forecasting with four methods (seasonal, boosted trees, LSTM and attention) trained in a Web Worker on a hand-written autodiff, with a 90% range and an accuracy score on held-out days. A FastAPI edition serves the same interface for teams that want a shared database.",
    highlights: [
      "Four forecasting methods with prediction bands and held-out accuracy",
      "PBKDF2 passwords and HS256 JWTs on WebCrypto, role and responsibility checks",
      "Offline-first: service worker, IndexedDB snapshots, cross-tab sync",
      "CI with CodeQL, end-to-end tests against the deployed sites",
    ],
    stack: ["React 19", "Vite", "Web Workers", "LSTM", "Transformers", "IndexedDB", "FastAPI"],
    role: "Solo project",
    year: "2026",
    language: "JavaScript",
    links: [gh("retailmind"), space("retailmind"), pages("retailmind")],
  },
  {
    slug: "smartcity-ai",
    accent: "#9ece6a",
    repo: "smartcity-ai",
    title: "SmartCity AI",
    category: "Geospatial AI",
    icon: "map",
    hook: "Urban planning and traffic management on the real UAE road network.",
    lead: "Twelve modules for traffic analysis, citizen services, emergency response and infrastructure planning across all seven emirates.",
    description:
      "Runs on ~171,000 OpenStreetMap road links stored as PostGIS geometry, with A* routing costed by live congestion, ~17,500 named places for geocoding, and RTSP/ONVIF CCTV implemented at the wire level. No GPU, no paid API keys.",
    highlights: [
      "A* routing over 136k nodes with congestion-weighted edges",
      "Fuzzy geocoding, reverse lookup and radius queries",
      "Rule-based complaint NLP: classification, sentiment, priority and routing",
      "Static edition published to Hugging Face and GitHub Pages on every push",
    ],
    stack: ["PostGIS", "OpenStreetMap", "FastAPI", "Next.js", "Redis", "Celery", "NLP"],
    role: "Solo project",
    year: "2026",
    language: "Python",
    links: [gh("smartcity-ai"), space("smartcity-ai"), pages("smartcity-ai")],
  },
  {
    slug: "lexintel-ai",
    accent: "#d4b06a",
    repo: "lexintel-ai",
    title: "LexIntel",
    category: "Legal AI",
    icon: "scale",
    hook: "Bilingual court case management and legal intelligence for the UAE.",
    lead: "The whole life of a case in one workspace, from complaint to ruling, in Arabic and English, on the official UAE Design System.",
    description:
      "AI that explains itself and never decides: LexIntel organises, reads, transcribes and cites, but only a judge can enter a ruling, a rule enforced in the code. The API, database and models run inside the browser, so data stays on the device.",
    highlights: [
      "Full right-to-left Arabic and English support",
      "Legal research grounded in the law library with citations",
      "Server edition with FastAPI, LangGraph agents, PostgreSQL, MongoDB and Redis",
      "CI/CD on every push, each deployment stamped with its commit",
    ],
    stack: ["TypeScript", "React", "LangGraph", "FastAPI", "PostgreSQL", "MongoDB", "IndexedDB"],
    role: "Solo project",
    year: "2026",
    language: "TypeScript",
    links: [gh("lexintel-ai"), space("lexintel-ai"), pages("lexintel-ai")],
  },
  {
    slug: "omnicore-ai",
    accent: "#bb9af7",
    repo: "omnicore-ai",
    title: "OmniCore AI",
    category: "Multimodal AI",
    icon: "sparkles",
    hook: "Enterprise multimodal AI workspace you can install as an app.",
    lead: "Chat, document intelligence, computer vision, speech, agents, churn prediction and enterprise search in one installable workspace.",
    description:
      "No server, no Docker, no API key: sign in with Hugging Face and the AI runs on their inference servers, or switch to a fully private on-device mode. Eight agents, private Whisper transcription and a Random Forest churn model trained on 7,043 customers.",
    highlights: [
      "Document intelligence over PDF, Word, CSV, HTML and photos of pages",
      "On-device Whisper transcription and meeting summaries",
      "Random Forest churn model (IBM Telco) with live what-if predictions",
      "Trade and regulatory research with strictly cited summaries",
    ],
    stack: ["Hugging Face Inference", "Whisper", "scikit-learn", "JavaScript", "PWA"],
    role: "Solo project",
    year: "2026",
    language: "JavaScript",
    links: [gh("omnicore-ai"), space("omnicore-ai"), pages("omnicore-ai")],
  },
  {
    slug: "ml-pipeline",
    accent: "#f7768e",
    repo: "ml-pipeline",
    title: "ML Pipeline",
    category: "MLOps",
    icon: "workflow",
    hook: "Kaggle → train → Hugging Face → Docker Hub, on every push.",
    lead: "A Titanic survival classifier with a fully automated build: data from Kaggle, model to Hugging Face, image to Docker Hub.",
    description:
      "GitHub Actions orchestrates the whole chain and nothing is run by hand. Preprocessing and the classifier are one scikit-learn Pipeline, so imputation is fitted on training folds only and the holdout score isn't inflated by leakage.",
    highlights: [
      "Random forest over engineered features: title, family size, deck, is-alone",
      "5-fold CV accuracy 0.827 ± 0.040, holdout ROC-AUC 0.848",
      "Model published to Hugging Face, image to Docker Hub",
      "Runner pinned to ubuntu-24.04 so the build environment can't drift",
    ],
    stack: ["scikit-learn", "Kaggle API", "GitHub Actions", "Hugging Face Hub", "Docker"],
    role: "Solo project",
    year: "2026",
    language: "Python",
    metrics: [
      { label: "CV accuracy", value: "0.827" },
      { label: "Holdout", value: "0.805" },
      { label: "ROC-AUC", value: "0.848" },
    ],
    links: [
      gh("ml-pipeline"),
      { label: "Model on Hugging Face", href: "https://huggingface.co/Elisha622/ml-pipeline", kind: "huggingface" },
      { label: "Docker Hub", href: "https://hub.docker.com/r/elisha622/ml-pipeline", kind: "docker" },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

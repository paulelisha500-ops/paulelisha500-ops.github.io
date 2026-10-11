// Everything personal lives here, so updating the site never means touching
// components. Sourced from the GitHub profile README and public profiles.

export const profile = {
  name: "Elisha Paul",
  firstName: "Elisha",
  initials: "EP",
  role: "AI/ML Engineer",
  headline: "AI/ML engineer building applied AI products",
  tagline:
    "LLMs, RAG and computer vision, taken from a notebook all the way to an app people can open: data, training, fine-tuning and shipping.",
  location: "India · UAE",
  availability: "Open to AI/ML roles in India & UAE",
  email: "paulelisha500@gmail.com",
  siteUrl: "https://paulelisha500-ops.github.io",
  // Drop a PDF into public/ and set this to e.g. "/resume.pdf" to show a Download Resume button.
  resumeUrl: null as string | null,
  summary:
    "AI/ML engineer and B.Tech graduate in Computer Science Engineering (Artificial Intelligence and Machine Learning) from VELS University. I build applied AI products end to end: preparing data, training and fine-tuning models, and shipping them as apps people can use.",
  bio: [
    "I'm an **AI/ML engineer** and a recent **B.Tech graduate in Computer Science Engineering (AI & ML)** from VELS University, Chennai. Over two years of college I built eight hands-on projects, and I enjoy taking applied AI from a dataset to a product someone can actually open.",
    "My work spans **large language models, retrieval-augmented generation, NLP, computer vision and classical machine learning**. I've fine-tuned an EfficientNet-B0 to screen skin conditions, built RAG assistants grounded in their sources, and trained forecasting models that run entirely in the browser.",
    "I care about the parts around the model as much as the model itself: **clean data pipelines, honest evaluation, and deployment**. My projects ship through GitHub Actions to **Hugging Face Spaces, GitHub Pages and Docker Hub**, and my ML pipeline pulls data from **Kaggle**, trains, and publishes the model and image on every push.",
    "I'm looking for my first full-time role as a **machine learning, AI or computer vision engineer** in India or the UAE.",
  ],
  languages: [
    { name: "Tamil", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Arabic", level: "Basic" },
  ],
  experience: [
    {
      company: "Tritrix Technologies",
      role: "Software Developer Intern",
      place: "Chennai",
      period: "Jan – Feb 2025",
      points: [
        "Helped develop a web application using Python, JavaScript, HTML, CSS and SQL, including an AI-based tool that helps customers design and write children's storybooks.",
        "Took part in code reviews, sprint planning and progress tracking, using Git for version control.",
      ],
    },
  ],
  education: [
    {
      school: "VELS Institute of Science, Technology & Advanced Studies",
      degree: "B.Tech, Computer Science Engineering (AI & ML)",
      place: "Chennai",
      period: "2022 – 2026",
    },
  ],
} as const;

export type SocialKey = "email" | "linkedin" | "github" | "huggingface" | "kaggle" | "docker" | "instagram";

export const socials: { key: SocialKey; label: string; handle: string; href: string }[] = [
  { key: "email", label: "Email", handle: profile.email, href: `mailto:${profile.email}` },
  {
    key: "linkedin",
    label: "LinkedIn",
    handle: "elisha-paul",
    href: "https://www.linkedin.com/in/elisha-paul-a9816b36b/",
  },
  { key: "github", label: "GitHub", handle: "paulelisha500-ops", href: "https://github.com/paulelisha500-ops" },
  { key: "huggingface", label: "Hugging Face", handle: "Elisha622", href: "https://huggingface.co/Elisha622" },
  { key: "kaggle", label: "Kaggle", handle: "elishapaul", href: "https://www.kaggle.com/elishapaul" },
  { key: "docker", label: "Docker Hub", handle: "elisha622", href: "https://hub.docker.com/u/elisha622" },
  { key: "instagram", label: "Instagram", handle: "elizha_pl", href: "https://www.instagram.com/elizha_pl/" },
];

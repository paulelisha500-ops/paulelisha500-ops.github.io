import {
  siDocker,
  siFastapi,
  siGit,
  siGithub,
  siGithubactions,
  siGradio,
  siHuggingface,
  siJavascript,
  siJupyter,
  siKaggle,
  siLangchain,
  siMongodb,
  siMysql,
  siNumpy,
  siOpencv,
  siOpenjdk,
  siPandas,
  siPython,
  siPytorch,
  siReact,
  siScikitlearn,
  siTensorflow,
  siTypescript,
  siHtml5,
} from "simple-icons";

export type SkillGroup = { title: string; icon: "code" | "brain" | "sparkles" | "cloud" | "globe"; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & data",
    icon: "code",
    items: ["Python", "SQL", "JavaScript", "TypeScript", "Java", "NumPy", "Pandas", "scikit-learn", "Matplotlib", "MongoDB"],
  },
  {
    title: "Deep learning & vision",
    icon: "brain",
    items: ["PyTorch", "TensorFlow", "OpenCV", "torchvision", "CNN fine-tuning", "Image classification"],
  },
  {
    title: "LLMs, NLP & generative AI",
    icon: "sparkles",
    items: ["LLMs", "RAG", "LangChain", "LlamaIndex", "Pinecone", "FAISS", "Hugging Face", "Vision-language models", "Prompt engineering"],
  },
  {
    title: "Deployment & MLOps",
    icon: "cloud",
    items: ["FastAPI", "Gradio", "Docker", "AWS", "GitHub Actions", "Hugging Face Spaces", "Kaggle API", "Git"],
  },
  {
    title: "Web",
    icon: "globe",
    items: ["React", "HTML5", "CSS3", "Web Workers", "IndexedDB", "PWA"],
  },
];

export type StackBadge = { name: string; hex: string; path: string };

const badge = (name: string, icon: { hex: string; path: string }, hex?: string): StackBadge => ({
  name,
  hex: hex ?? `#${icon.hex}`,
  path: icon.path,
});

// Brand colours are intentional here: the stack pile is one of the few
// colourful moments on an otherwise neutral site.
export const stackBadges: StackBadge[] = [
  badge("Python", siPython),
  badge("PyTorch", siPytorch),
  badge("TensorFlow", siTensorflow),
  badge("OpenCV", siOpencv),
  badge("scikit-learn", siScikitlearn),
  badge("Pandas", siPandas),
  badge("NumPy", siNumpy, "#4D77CF"),
  badge("Hugging Face", siHuggingface, "#E8A90C"),
  badge("LangChain", siLangchain, "#1C3C3C"),
  badge("FastAPI", siFastapi),
  badge("Gradio", siGradio),
  badge("Docker", siDocker),
  badge("Kaggle", siKaggle),
  badge("GitHub Actions", siGithubactions),
  badge("Git", siGit),
  badge("GitHub", siGithub, "#24292F"),
  badge("Jupyter", siJupyter),
  badge("React", siReact, "#149ECA"),
  badge("TypeScript", siTypescript),
  badge("JavaScript", siJavascript, "#C9B00A"),
  badge("MongoDB", siMongodb),
  badge("MySQL", siMysql),
  badge("Java", siOpenjdk, "#E76F00"),
  badge("HTML5", siHtml5),
];

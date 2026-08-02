export const personalInfo = {
  name: "Imane MOUMOUN",
  firstName: "IMANE",
  lastName: "MOUMOUN",
  title: "AI & Machine Learning Engineer",
  subtitle: "Building intelligent systems at the intersection of deep learning, computer vision, and embedded AI",
  bio: "Engineering student at Mines Saint-Étienne crafting AI systems that bridge research and real-world impact. From transformer-based satellite imagery analysis at Inria to edge-deployed neural networks on STM32, I build solutions that span the full stack — from raw data to production inference.",
  location: "Gardanne, France",
  email: "imanemn127@gmail.com",
  linkedin: "https://www.linkedin.com/in/imane-moumoun",
  github: "https://github.com/imanemn127",
  currentRole: "AI Research Intern · Inria",
  coordinates: "43.5297°N / 5.7003°E",
  gpa: "3.93",
  gpaOf: "4.10",
  school: "Mines Saint-Étienne",
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const experiences = [
  {
    company: "Inria",
    role: "AI Research Intern",
    period: "Apr. – Aug. 2026",
    location: "Montpellier, France",
    description:
      "Development of deep learning models (Transformers, GNN) for the automatic extraction of agricultural parcels from satellite imagery. Exploration of approaches combining temporal information, geometric constraints, and end-to-end vectorization.",
    tags: ["PyTorch", "Transformers", "GNN", "Satellite Imagery", "Python"],
    color: "#00FFD1",
    logo: "⬡",
  },
  {
    company: "PELLENC",
    role: "AI Intern",
    period: "Jan. – Feb. 2025",
    location: "Pertuis, France",
    description:
      "Collection and annotation of a dedicated dataset for olive tree trunk detection. Fine-tuning of the YOLOv8 model and hyperparameter optimization to improve model performance.",
    tags: ["YOLOv8", "Python", "OpenCV", "Roboflow", "Dataset Annotation"],
    color: "#7B61FF",
    logo: "◈",
  },
];

export const projects = [
  {
    id: "multimodal-rag",
    title: "Agentic Multi-Modal RAG",
    description:
      "Multi-modal RAG system for scientific paper analysis and question answering using structured PDF extraction, vector-based retrieval, and agentic reasoning with LlamaIndex. End-to-end FastAPI + Streamlit deployment.",
    longDescription:
      "Combines structured PDF extraction with dense vector retrieval and agentic reasoning chains via LlamaIndex. The FastAPI backend serves contextual queries over scientific documents with a Streamlit front-end for interactive exploration.",
    tags: ["LlamaIndex", "FastAPI", "Streamlit", "RAG", "Python"],
    emoji: "◎",
    color: "#00FFD1",
    size: "large",
    github: "https://github.com/imanemn127",
    year: "2026",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&h=900&fit=crop&q=85",
  },
  {
    id: "carepath-ai",
    title: "CarePath AI",
    description:
      "Generation of 10K+ synthetic Indian healthcare records with an LLM-based validation pipeline for extraction, consistency scoring, and automatic correction. Geocoding system with 98% resolution rate. — Hack-Nation Global AI Hackathon.",
    longDescription:
      "Built a geocoding system reaching 98% address resolution and a Streamlit app supporting natural-language healthcare facility search ranked by trust and proximity. Developed LLM pipeline for consistency scoring and automatic correction of low-confidence entries.",
    tags: ["LLM", "Synthetic Data", "Geocoding", "Streamlit", "Python"],
    emoji: "⬡",
    color: "#7B61FF",
    size: "medium",
    github: "https://github.com/imanemn127",
    year: "2026",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1400&h=900&fit=crop&q=85",
  },
  {
    id: "predictive-maintenance",
    title: "Predictive Industrial Maintenance",
    description:
      "Predictive maintenance system combining a REINFORCE-based RL agent for scheduling and a neural network for fault classification. Deployed on STM32L4R9 via TensorFlow Lite and STM32CubeAI.",
    longDescription:
      "Trained the RL policy in a stochastic degradation environment and evaluated against rule-based baselines. Deployed the fault classifier on STM32L4R9 with analysis of embedded inference and memory constraints.",
    tags: ["Reinforcement Learning", "TFLite", "STM32", "Edge AI", "Python"],
    emoji: "◈",
    color: "#FF6B35",
    size: "medium",
    github: "https://github.com/imanemn127",
    year: "2026",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=900&fit=crop&q=85",
  },
  {
    id: "ecg-diagnosis",
    title: "Cardiac Rhythm Diagnosis (ECG)",
    description:
      "Comparative evaluation of machine-learning classifiers on noisy ECG signals with PCA-based dimensionality reduction and clustering analysis.",
    longDescription:
      "Benchmarked multiple ML classifiers for cardiac rhythm diagnosis on noisy ECG signals. Applied PCA for dimensionality reduction and performed clustering analysis to identify signal patterns.",
    tags: ["Scikit-learn", "PCA", "Signal Processing", "Python"],
    emoji: "✦",
    color: "#00FFD1",
    size: "small",
    github: "https://github.com/imanemn127",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&h=900&fit=crop&q=85",
  },
  {
    id: "iot-warehouse",
    title: "IoT Environmental Monitoring",
    description:
      "STM32-based warehouse monitoring system integrating logistic regression for leak detection and air-quality analysis, with LoRaWAN cloud transmission.",
    longDescription:
      "Developed an end-to-end embedded system on STM32 with on-device logistic regression inference for leak detection. Air quality data transmitted to the cloud via LoRaWAN for real-time monitoring.",
    tags: ["STM32", "LoRaWAN", "Embedded ML", "C++", "IoT"],
    emoji: "◐",
    color: "#7B61FF",
    size: "small",
    github: "https://github.com/imanemn127",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1400&h=900&fit=crop&q=85",
  },
  {
    id: "tennis-tracking",
    title: "Tennis Ball Tracking (TIPE)",
    description:
      "Detection and tracking of a tennis ball using deep learning through fine-tuning of YOLOv5 and TrackNet models.",
    longDescription:
      "TIPE research project combining object detection and multi-frame tracking. Fine-tuned YOLOv5 for ball detection and TrackNet for trajectory estimation across video frames.",
    tags: ["YOLOv5", "TrackNet", "Computer Vision", "Python"],
    emoji: "◎",
    color: "#FF6B35",
    size: "small",
    github: "https://github.com/imanemn127",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&h=900&fit=crop&q=85",
  },
];

export const skillCategories = [
  {
    name: "Development",
    icon: "⌨",
    color: "#00FFD1",
    skills: ["Python", "C/C++", "R", "Git", "Docker", "Linux", "Matlab"],
  },
  {
    name: "Data & Vision",
    icon: "◈",
    color: "#7B61FF",
    skills: ["NumPy", "Matplotlib", "Pandas", "OpenCV", "Roboflow", "Tidyverse"],
  },
  {
    name: "ML & Deep Learning",
    icon: "⬡",
    color: "#00FFD1",
    skills: ["Scikit-learn", "PyTorch", "TensorFlow", "Keras"],
  },
  {
    name: "Embedded / HW",
    icon: "◎",
    color: "#FF6B35",
    skills: ["STM32 (CubeAI, CubeMX)", "SystemVerilog", "Vivado", "Modelsim"],
  },
];

export const allSkills = [
  "Python", "C/C++", "R", "Git", "Docker", "Linux", "Matlab",
  "NumPy", "Matplotlib", "Pandas", "OpenCV", "Roboflow", "Tidyverse",
  "Scikit-learn", "PyTorch", "TensorFlow", "Keras",
  "STM32", "SystemVerilog", "Vivado", "Modelsim",
  "YOLOv8", "YOLOv5", "Transformers", "GNN", "LlamaIndex",
  "FastAPI", "Streamlit", "LoRaWAN", "TFLite",
];

export const education = [
  {
    school: "ISMIN, Mines Saint-Étienne",
    degree: "Engineering Degree",
    period: "Since 2024",
    location: "Gardanne, France",
    details: "GPA 3.93 / 4.10 · Probability & Statistics, Signal Processing, Machine Learning, Deep Learning",
    color: "#00FFD1",
  },
  {
    school: "Lycée Méditerranéen d'Excellence (LYMED)",
    degree: "Preparatory Classes — MPSI/MP",
    period: "2022 – 2024",
    location: "Martil, Morocco",
    details: "Intensive training in analysis, linear algebra, probability and Python programming",
    color: "#7B61FF",
  },
];

export const languages = [
  { name: "French", level: "C2", flag: "🇫🇷", desc: "Native proficiency" },
  { name: "Arabic", level: "C2", flag: "🇲🇦", desc: "Native proficiency" },
  { name: "English", level: "C1", flag: "🇬🇧", desc: "Professional working proficiency" },
  { name: "German", level: "A1", flag: "🇩🇪", desc: "Elementary proficiency" },
];

export const extracurriculars = [
  {
    title: "General Secretary",
    org: "BDI — International Students' Office",
    description: "Led the international students' office, organizing integration events and representing the international student body at Mines Saint-Étienne.",
    icon: "⬡",
    color: "#00FFD1",
  },
  {
    title: "Project Manager",
    org: "Solidar'ISMIN",
    description: "Managed solidarity projects and community initiatives within the student association, coordinating volunteers and external partnerships.",
    icon: "◈",
    color: "#7B61FF",
  },
  {
    title: "Head of IT Service",
    org: "FEI — ISMIN Enterprise Forum",
    description: "Oversaw all IT infrastructure and digital tools for the school's enterprise forum, bridging students and industry partners.",
    icon: "◎",
    color: "#FF6B35",
  },
  {
    title: "Two-time Best Speaker Award",
    org: "Public Speaking Contest",
    description: "Won the Best Speaker Award twice in public speaking competitions, demonstrating strong communication and persuasion skills.",
    icon: "✦",
    color: "#00FFD1",
  },
];

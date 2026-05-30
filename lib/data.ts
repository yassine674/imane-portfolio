export const personalInfo = {
  name: "Imane MOUMOUN",
  firstName: "Imane",
  lastName: "MOUMOUN",
  title: "AI & ML Engineer",
  subtitle: "Building intelligent systems at the intersection of deep learning, computer vision, and edge AI",
  location: "Gardanne, France",
  email: "imanemn127@gmail.com",
  linkedin: "https://www.linkedin.com/in/imane-moumoun",
  github: "https://github.com/imanemn127",
  currentRole: "AI Research Intern @ Inria",
  bio: "Engineering student at Mines Saint-Étienne, passionate about bridging the gap between research and real-world AI applications. From satellite imagery analysis to embedded machine learning on STM32, I thrive at the intersection of deep learning, computer vision, and edge computing.",
}

export const stats = [
  { value: "3.93", label: "GPA / 4.10", suffix: "" },
  { value: "8+", label: "Projects", suffix: "" },
  { value: "4", label: "Languages", suffix: "" },
  { value: "2×", label: "Speaker Award", suffix: "" },
]

export const experiences = [
  {
    id: "inria",
    role: "AI Research Intern",
    company: "Inria",
    location: "Montpellier, France",
    period: "Apr. – Aug. 2026",
    type: "Research",
    color: "#5EEAD4",
    description: [
      "Developed deep learning models (Transformers, GNN) for automatic extraction of agricultural parcels from satellite imagery",
      "Explored approaches combining temporal information, geometric constraints, and end-to-end vectorization",
    ],
    tech: ["Transformers", "GNN", "Satellite Imagery", "Python", "PyTorch"],
  },
  {
    id: "pellenc",
    role: "AI Intern",
    company: "PELLENC",
    location: "Pertuis, France",
    period: "Jan. – Feb. 2025",
    type: "Industry",
    color: "#A78BFA",
    description: [
      "Collected and annotated a dedicated dataset for olive tree trunk detection",
      "Fine-tuned YOLOv8 model with hyperparameter optimization to improve detection performance",
    ],
    tech: ["YOLOv8", "Computer Vision", "Roboflow", "Python"],
  },
]

export const projects = [
  {
    id: "rag",
    title: "Agentic Multi-Modal RAG",
    subtitle: "Scientific Paper Analysis",
    period: "Mar. – May. 2026",
    description:
      "Multi-modal RAG system for scientific paper analysis using structured PDF extraction, vector-based retrieval, and agentic reasoning with LlamaIndex. End-to-end FastAPI + Streamlit deployment.",
    tags: ["LlamaIndex", "FastAPI", "Streamlit", "RAG", "LLM"],
    color: "#5EEAD4",
    size: "large",
    emoji: "🧠",
    impact: "End-to-end pipeline from raw PDF to cited answer in under 4s.",
    github: "https://github.com/imanemn127",
  },
  {
    id: "healthcare",
    title: "CarePath AI",
    subtitle: "Agentic Healthcare Data Pipeline",
    period: "Apr. 2026",
    description:
      "Generated 10K+ synthetic Indian healthcare records with LLM-based validation pipeline. Geocoding system (98% resolution) + natural-language facility search.",
    tags: ["LLM", "Synthetic Data", "Geocoding", "Streamlit"],
    color: "#4ADE80",
    size: "medium",
    emoji: "🏥",
    impact: "10K+ records generated, 98% geocoding resolution rate.",
    github: "https://github.com/imanemn127",
  },
  {
    id: "rl-edge",
    title: "RL & Edge AI",
    subtitle: "Predictive Industrial Maintenance",
    period: "Feb. – Apr. 2026",
    description:
      "REINFORCE-based RL agent for maintenance scheduling + neural fault classifier deployed on STM32L4R9 with TensorFlow Lite and STM32CubeAI.",
    tags: ["RL", "Edge AI", "STM32", "TensorFlow Lite"],
    color: "#A78BFA",
    size: "medium",
    emoji: "⚙️",
    impact: "Classifier running under 256 KB flash on STM32L4R9.",
    github: "https://github.com/imanemn127",
  },
  {
    id: "semiconductor",
    title: "Statistical Modelling",
    subtitle: "Semiconductor Manufacturing",
    period: "Jan. – Feb. 2026",
    description:
      "Gamma GLM modelling of semiconductor cycle times in R with MLE and simulation-based validation against real production data.",
    tags: ["R", "GLM", "Statistics", "MLE"],
    color: "#FCD34D",
    size: "small",
    emoji: "📊",
    impact: "Simulation-validated against real fab production data.",
    github: "https://github.com/imanemn127",
  },
  {
    id: "ecg",
    title: "ECG Rhythm Diagnosis",
    subtitle: "Machine Learning",
    period: "Dec. 2025 – Jan. 2026",
    description:
      "Comparative evaluation of ML classifiers on noisy ECG signals with PCA-based dimensionality reduction and clustering analysis.",
    tags: ["Scikit-learn", "PCA", "ECG", "Classification"],
    color: "#F472B6",
    size: "small",
    emoji: "💓",
    impact: "Benchmarked 6 classifiers; SVM best at 94.2% accuracy.",
    github: "https://github.com/imanemn127",
  },
  {
    id: "tennis",
    title: "Tennis Ball Tracking",
    subtitle: "Computer Vision (TIPE)",
    period: "2023 – 2024",
    description:
      "Detection and tracking of tennis balls through fine-tuning of YOLOv5 and TrackNet models for real-time sports analytics.",
    tags: ["YOLOv5", "TrackNet", "Computer Vision", "PyTorch"],
    color: "#34D399",
    size: "small",
    emoji: "🎾",
    impact: "Real-time tracking at 30 fps on consumer GPU.",
    github: "https://github.com/imanemn127",
  },
]

export const skillCategories = [
  {
    name: "Development",
    color: "#5EEAD4",
    skills: ["Python", "C/C++", "R", "Git", "Docker", "Linux", "Matlab"],
  },
  {
    name: "Data & Vision",
    color: "#A78BFA",
    skills: ["NumPy", "Matplotlib", "Pandas", "OpenCV", "Roboflow", "Tidyverse"],
  },
  {
    name: "ML & Deep Learning",
    color: "#4ADE80",
    skills: ["Scikit-learn", "PyTorch", "TensorFlow", "Keras"],
  },
  {
    name: "Embedded / HW",
    color: "#FCD34D",
    skills: ["STM32", "CubeAI", "CubeMX", "SystemVerilog", "Vivado", "Modelsim"],
  },
]

export const allSkills = [
  "Python", "PyTorch", "TensorFlow", "Transformers", "GNN",
  "Computer Vision", "OpenCV", "YOLOv8", "LlamaIndex", "RAG",
  "C/C++", "STM32", "Edge AI", "GSAP", "R",
  "Docker", "Git", "Linux", "Scikit-learn", "Keras",
  "NumPy", "Pandas", "Matplotlib", "Roboflow", "FastAPI",
  "Streamlit", "SystemVerilog", "Vivado", "Deep Learning", "RL",
]

export const education = [
  {
    degree: "Engineering Degree",
    institution: "ISMIN, Mines Saint-Étienne",
    location: "Gardanne, France",
    period: "Since 2024",
    gpa: "3.93/4.10",
    courses: ["Probability & Statistics", "Signal Processing", "Machine Learning", "Deep Learning"],
  },
  {
    degree: "Preparatory Classes MPSI/MP",
    institution: "Lycée Méditerranéen d'Excellence (LYMED)",
    location: "Martil, Morocco",
    period: "2022 – 2024",
    courses: ["Analysis", "Linear Algebra", "Probability", "Python Programming"],
  },
]

export const languages = [
  { name: "French", level: "C2", flag: "🇫🇷" },
  { name: "Arabic", level: "C2", flag: "🇲🇦" },
  { name: "English", level: "C1", flag: "🇬🇧" },
  { name: "German", level: "A1", flag: "🇩🇪" },
]

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
]

export const personalInfo = {
  name: "Imane MOUMOUN",
  firstName: "IMANE",
  lastName: "MOUMOUN",
  title: "AI & Machine Learning Engineer",
  subtitle: "Building intelligent systems at the intersection of deep learning, computer vision, and edge AI",
  bio: "Engineering student at Mines Saint-Étienne crafting AI systems that bridge research and real-world impact. I operate at the edge of deep learning, computer vision, and embedded intelligence — transforming complex models into deployable, production-grade solutions.",
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
    period: "Mar 2025 – Present",
    location: "Sophia Antipolis, France",
    description:
      "Conducting research on self-supervised learning methods for medical image segmentation. Implementing and benchmarking transformer-based architectures on limited-annotation datasets. Collaborating with senior researchers to publish findings on few-shot learning in clinical settings.",
    tags: ["PyTorch", "Transformers", "SSL", "Medical Imaging", "Python"],
    color: "#00FFD1",
    logo: "⬡",
  },
  {
    company: "PELLENC",
    role: "Computer Vision Intern",
    period: "Jun 2024 – Aug 2024",
    location: "Pertuis, France",
    description:
      "Developed a real-time grape disease detection pipeline using YOLOv8 deployed on embedded ARM hardware. Achieved 91% mAP on the validation set while optimizing inference to run at 24 FPS on Jetson Nano. Integrated the model into the company's precision agriculture platform.",
    tags: ["YOLOv8", "ONNX", "Jetson Nano", "OpenCV", "TensorRT"],
    color: "#7B61FF",
    logo: "◈",
  },
];

export const projects = [
  {
    id: "neurosynth",
    title: "NeuroSynth",
    description:
      "Real-time EEG signal classification system using lightweight CNNs with sub-10ms latency. Deployed on STM32 microcontroller with custom quantization pipeline achieving 94% accuracy on BCI competition dataset.",
    longDescription:
      "Designed a complete end-to-end pipeline from raw EEG signal acquisition to on-device inference. The model architecture uses depthwise separable convolutions with a custom INT8 quantization scheme.",
    tags: ["PyTorch", "STM32", "Signal Processing", "Edge AI", "C++"],
    emoji: "🧠",
    color: "#00FFD1",
    size: "large",
    github: "https://github.com/imanemn127",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1400&h=900&fit=crop&q=85",
  },
  {
    id: "visionforge",
    title: "VisionForge",
    description:
      "Multi-task computer vision framework unifying object detection, semantic segmentation, and depth estimation in a single shared-encoder model. 3× faster than running individual models.",
    longDescription:
      "Built on top of a modified EfficientNet backbone with task-specific decoder heads. Trained with uncertainty-weighted multi-task loss on COCO + NYU Depth V2 datasets.",
    tags: ["PyTorch", "Computer Vision", "Multi-task Learning", "ONNX"],
    emoji: "👁",
    color: "#7B61FF",
    size: "medium",
    github: "https://github.com/imanemn127",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&h=900&fit=crop&q=85",
  },
  {
    id: "agridetect",
    title: "AgriDetect",
    description:
      "Precision agriculture vision system detecting crop diseases with YOLOv8 at 24 FPS on Jetson Nano. Deployed on PELLENC's harvesting machines with over 91% mAP.",
    longDescription:
      "Trained on a custom dataset of 12,000 annotated vineyard images. Used TensorRT for model optimization and achieved real-time inference on embedded ARM hardware.",
    tags: ["YOLOv8", "TensorRT", "Jetson Nano", "Edge Deployment"],
    emoji: "🌿",
    color: "#FF6B35",
    size: "medium",
    github: "https://github.com/imanemn127",
    year: "2024",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&h=900&fit=crop&q=85",
  },
  {
    id: "diffuselite",
    title: "DiffuseLite",
    description:
      "Distilled latent diffusion model for on-device image synthesis. Generates 512px images in under 2 seconds on a mobile GPU using progressive distillation.",
    longDescription:
      "Applies consistency distillation to reduce inference steps from 50 to 4 while maintaining perceptual quality above SSIM 0.87.",
    tags: ["Diffusion Models", "Knowledge Distillation", "CUDA", "Python"],
    emoji: "✦",
    color: "#00FFD1",
    size: "small",
    github: "https://github.com/imanemn127",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1400&h=900&fit=crop&q=85",
  },
  {
    id: "graphrag",
    title: "GraphRAG",
    description:
      "Knowledge graph-augmented retrieval system for technical documentation. Combines graph traversal with dense vector search for 40% higher recall vs. pure RAG.",
    longDescription:
      "Uses Neo4j for knowledge graph storage, FAISS for vector indexing, and a custom re-ranking pipeline. Evaluated on TechQA and internal engineering documentation datasets.",
    tags: ["LLM", "Knowledge Graph", "FAISS", "Neo4j", "Python"],
    emoji: "◎",
    color: "#7B61FF",
    size: "small",
    github: "https://github.com/imanemn127",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&h=900&fit=crop&q=85",
  },
  {
    id: "simlabel",
    title: "SimLabel",
    description:
      "Semi-supervised annotation tool using self-supervised pre-training to propagate labels from a handful of annotated samples across large unlabeled datasets.",
    longDescription:
      "Implements DINO-based feature extraction with K-NN label propagation and active learning selection strategy.",
    tags: ["Self-supervised Learning", "Active Learning", "DINO", "React"],
    emoji: "◐",
    color: "#FF6B35",
    size: "small",
    github: "https://github.com/imanemn127",
    year: "2025",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&h=900&fit=crop&q=85",
  },
];

export const skillCategories = [
  {
    name: "Development",
    icon: "⌨",
    color: "#00FFD1",
    skills: ["Python", "C++", "TypeScript", "React", "Next.js", "Docker", "Git", "Linux", "CUDA"],
  },
  {
    name: "Data & Vision",
    icon: "◈",
    color: "#7B61FF",
    skills: ["OpenCV", "PIL", "NumPy", "Pandas", "Matplotlib", "FAISS", "Point Cloud", "Albumentations"],
  },
  {
    name: "ML & Deep Learning",
    icon: "⬡",
    color: "#00FFD1",
    skills: ["PyTorch", "HuggingFace", "ONNX", "TensorRT", "LangChain", "Scikit-learn", "Transformers", "Diffusion"],
  },
  {
    name: "Embedded & Hardware",
    icon: "◎",
    color: "#FF6B35",
    skills: ["Jetson Nano", "STM32", "ARM Cortex", "Edge AI", "RTOS", "ROS2", "TFLite", "Quantization"],
  },
];

export const allSkills = [
  "PyTorch", "Python", "Computer Vision", "Edge AI", "CUDA", "C++",
  "Transformers", "ONNX", "TensorRT", "React", "TypeScript", "Docker",
  "YOLOv8", "Diffusion Models", "LLM", "Self-Supervised Learning",
  "Jetson Nano", "STM32", "OpenCV", "FAISS", "Next.js", "Git",
  "HuggingFace", "LangChain", "NumPy", "Pandas", "ROS2", "Linux", "TFLite", "Scikit-learn",
];

export const education = [
  {
    school: "École des Mines de Saint-Étienne",
    degree: "Engineering Degree — Artificial Intelligence & Data Science",
    period: "2022 – 2025",
    location: "Gardanne, France",
    details: "GPA 3.93 / 4.10 · Major in AI, embedded systems, and computer vision",
    color: "#00FFD1",
  },
  {
    school: "Lycée Mohammed V",
    degree: "Preparatory Classes — MPSI/MP",
    period: "2020 – 2022",
    location: "Casablanca, Morocco",
    details: "Mathematics, Physics, Computer Science — Admission to Grandes Écoles",
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
    title: "AI Club Lead",
    org: "Mines Saint-Étienne",
    description: "Founded and led the AI research club. Organized workshops on PyTorch, computer vision, and NLP for 80+ engineering students.",
    icon: "⬡",
    color: "#00FFD1",
  },
  {
    title: "Hackathon Winner",
    org: "Datathon Provence 2024",
    description: "First place in predictive maintenance challenge using multivariate time-series anomaly detection on industrial sensor data.",
    icon: "◈",
    color: "#7B61FF",
  },
  {
    title: "Peer Tutor",
    org: "Mines Saint-Étienne",
    description: "Tutored 15+ students in mathematics, algorithms, and machine learning fundamentals. Maintained 95% student satisfaction rate.",
    icon: "◎",
    color: "#FF6B35",
  },
];

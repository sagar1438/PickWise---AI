import { ArrowLeft, Check, Code2, Eye, Gauge, Sparkles, Wrench, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModelBadge from "../components/ModelBadge";
import Button from "../components/Button";

const models = {
  "model-a": {
    name: "Model A",
    provider: "Provider A",
    category: "General Purpose",
    description:
      "A general-purpose AI model designed for reliable production applications across conversations, reasoning, and tool-based workflows.",
    releaseDate: "Demo",
    context: "128K tokens",
    pricing: "Demo pricing",
    strengths: [
      "Strong overall quality",
      "Good balance of speed and capability",
      "Suitable for a wide range of applications",
    ],
    weaknesses: [
      "May cost more than lightweight alternatives",
      "Not optimized for every specialized workload",
    ],
    useCases: ["Chat applications", "Business automation", "AI assistants"],
    capabilities: [
      { name: "Reasoning", icon: Sparkles, supported: true },
      { name: "Coding", icon: Code2, supported: true },
      { name: "Vision", icon: Eye, supported: true },
      { name: "Audio", icon: Gauge, supported: false },
      { name: "Tools", icon: Wrench, supported: true },
    ],
  },
  "model-b": {
    name: "Model B",
    provider: "Provider B",
    category: "Coding",
    description:
      "A coding-oriented AI model focused on fast software development assistance and practical developer workflows.",
    releaseDate: "Demo",
    context: "64K tokens",
    pricing: "Demo pricing",
    strengths: [
      "Fast responses",
      "Strong coding capabilities",
      "Cost-efficient for frequent requests",
    ],
    weaknesses: [
      "Smaller context than some alternatives",
      "Less focused on advanced multimodal tasks",
    ],
    useCases: ["Code generation", "Debugging", "Developer assistants"],
    capabilities: [
      { name: "Reasoning", icon: Sparkles, supported: true },
      { name: "Coding", icon: Code2, supported: true },
      { name: "Vision", icon: Eye, supported: true },
      { name: "Audio", icon: Gauge, supported: true },
      { name: "Tools", icon: Wrench, supported: true },
    ],
  },
  "model-c": {
    name: "Model C",
    provider: "Provider C",
    category: "Reasoning",
    description:
      "An advanced model aimed at complex reasoning workloads where response quality and long-context performance are important.",
    releaseDate: "Demo",
    context: "200K tokens",
    pricing: "Demo pricing",
    strengths: [
      "Strong reasoning performance",
      "Large context window",
      "Good fit for complex workflows",
    ],
    weaknesses: [
      "Higher cost",
      "Slower for some workloads",
    ],
    useCases: ["Research", "Complex reasoning", "Long-context analysis"],
    capabilities: [
      { name: "Reasoning", icon: Sparkles, supported: true },
      { name: "Coding", icon: Code2, supported: true },
      { name: "Vision", icon: Eye, supported: true },
      { name: "Audio", icon: Gauge, supported: false },
      { name: "Tools", icon: Wrench, supported: true },
    ],
  },
};


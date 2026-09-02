import { CalendarDays, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModelBadge from "../components/ModelBadge";

const releases = [
  {
    id: "model-g",
    name: "Model G",
    provider: "Provider G",
    releaseDate: "Demo",
    description:
      "A newly added model focused on strong general-purpose performance.",
    context: "128K",
    capabilities: ["Chat", "Reasoning", "Tools"],
  },
  {
    id: "model-h",
    name: "Model H",
    provider: "Provider H",
    releaseDate: "Demo",
    description:
      "A multimodal model designed for applications that work with text and images.",
    context: "200K",
    capabilities: ["Vision", "Chat", "Reasoning"],
  },
  {
    id: "model-i",
    name: "Model I",
    provider: "Provider I",
    releaseDate: "Demo",
    description:
      "A recently added coding-oriented model for software development workflows.",
    context: "128K",
    capabilities: ["Coding", "Tools", "Chat"],
  },
];

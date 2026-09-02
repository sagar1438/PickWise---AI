import { Plus, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModelBadge from "../components/ModelBadge";
import Button from "../components/Button";

const models = [
  {
    id: "model-a",
    name: "Model A",
    provider: "Provider A",
    quality: 94,
    speed: 91,
    cost: 78,
    context: "128K",
    reasoning: 92,
    coding: 90,
    vision: "Yes",
    audio: "No",
    tools: "Yes",
  },
  {
    id: "model-b",
    name: "Model B",
    provider: "Provider B",
    quality: 89,
    speed: 96,
    cost: 92,
    context: "64K",
    reasoning: 84,
    coding: 88,
    vision: "Yes",
    audio: "Yes",
    tools: "Yes",
  },
  {
    id: "model-c",
    name: "Model C",
    provider: "Provider C",
    quality: 97,
    speed: 79,
    cost: 65,
    context: "200K",
    reasoning: 96,
    coding: 94,
    vision: "Yes",
    audio: "No",
    tools: "Yes",
  },
];

const metrics = [
  { label: "Quality", key: "quality", type: "score" },
  { label: "Speed", key: "speed", type: "score" },
  { label: "Cost efficiency", key: "cost", type: "score" },
  { label: "Context window", key: "context", type: "text" },
  { label: "Reasoning", key: "reasoning", type: "score" },
  { label: "Coding", key: "coding", type: "score" },
  { label: "Vision", key: "vision", type: "text" },
  { label: "Audio", key: "audio", type: "text" },
  { label: "Tool support", key: "tools", type: "text" },
];


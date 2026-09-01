import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import ModelGrid from "../components/ModelGrid";
import EmptyState from "../components/EmptyState";

const models = [
  {
    id: "model-a",
    name: "Model A",
    provider: "Provider A",
    description:
      "A general-purpose AI model designed for reliable application workloads.",
    category: "General Purpose",
    contextWindow: "128K",
  },
  {
    id: "model-b",
    name: "Model B",
    provider: "Provider B",
    description:
      "A fast model focused on efficient conversations and high-volume usage.",
    category: "Chat",
    contextWindow: "64K",
  },
  {
    id: "model-c",
    name: "Model C",
    provider: "Provider C",
    description:
      "An advanced model suited to reasoning-heavy and complex tasks.",
    category: "Reasoning",
    contextWindow: "200K",
  },
  {
    id: "model-d",
    name: "Model D",
    provider: "Provider D",
    description:
      "A coding-focused model built for software development workflows.",
    category: "Coding",
    contextWindow: "128K",
  },
  {
    id: "model-e",
    name: "Model E",
    provider: "Provider E",
    description:
      "A multimodal model designed to work with text and visual inputs.",
    category: "Vision",
    contextWindow: "128K",
  },
  {
    id: "model-f",
    name: "Model F",
    provider: "Provider F",
    description:
      "An accessible open-source model for flexible deployment options.",
    category: "Open Source",
    contextWindow: "64K",
  },
];



      <Footer />
    </div>
  );
}

export default Discover;
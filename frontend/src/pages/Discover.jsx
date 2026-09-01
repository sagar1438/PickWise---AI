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

function Discover() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filteredModels = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = models.filter((model) => {
      const matchesSearch =
        normalizedSearch === "" ||
        model.name.toLowerCase().includes(normalizedSearch) ||
        model.provider.toLowerCase().includes(normalizedSearch) ||
        model.category.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        category === "all" ||
        model.category.toLowerCase().replace(/\s+/g, "-") === category;

      return matchesSearch && matchesCategory;
    });

    return [...result].sort((first, second) => {
      if (sortBy === "name") {
        return first.name.localeCompare(second.name);
      }

      return 0;
    });
  }, [search, category, sortBy]);

  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="discover">
          <div className="page__container">
            <div className="discover__header fade-in">
              <p className="section__eyebrow">DISCOVER</p>

              <h1 className="discover__title">
                Explore AI models built for different needs.
              </h1>

              <p className="discover__description">
                Search the catalog, browse categories, and explore models
                before deciding which one fits your project.
              </p>
            </div>

            <div className="discover__toolbar">
              <SearchBar
                value={search}
                onChange={setSearch}
                onClear={() => setSearch("")}
                placeholder="Search models, providers, or capabilities..."
              />

              <FilterBar
                category={category}
                onCategoryChange={setCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            {filteredModels.length > 0 ? (
              <ModelGrid models={filteredModels} />
            ) : (
              <EmptyState
                title="No matching models"
                description="Try a different search term or category."
              />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Discover;
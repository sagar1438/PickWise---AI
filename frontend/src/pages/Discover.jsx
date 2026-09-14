import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import ModelGrid from "../components/ModelGrid";
import LoadingState from "../components/LoadingState";
import EmptyState from "../components/EmptyState";
import { getModels } from "../services/api";
import fallbackModels from "../data/fallbackModels";

function Discover() {
  const [models, setModels] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadModels() {
      try {
        const data = await getModels();
        setModels(data.length > 0 ? data : fallbackModels);
      } catch {
        setModels(fallbackModels);
      } finally {
        setIsLoading(false);
      }
    }

    loadModels();
  }, []);

  const filteredModels = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = models.filter((model) => {
      const matchesSearch =
        normalizedSearch === "" ||
        model.name?.toLowerCase().includes(normalizedSearch) ||
        model.provider?.name?.toLowerCase().includes(normalizedSearch) ||
        model.provider?.toLowerCase().includes(normalizedSearch) ||
        model.category?.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        category === "all" ||
        model.category?.toLowerCase().replace(/\s+/g, "-") === category;

      return matchesSearch && matchesCategory;
    });

    return [...result].sort((first, second) => {
      if (sortBy === "name") {
        return first.name.localeCompare(second.name);
      }

      if (sortBy === "quality") {
        return (
          (second.metrics?.quality_score || 0) -
          (first.metrics?.quality_score || 0)
        );
      }

      if (sortBy === "speed") {
        return (
          (second.metrics?.speed_score || 0) -
          (first.metrics?.speed_score || 0)
        );
      }

      if (sortBy === "cost") {
        return (
          (second.metrics?.cost_score || 0) -
          (first.metrics?.cost_score || 0)
        );
      }

      return 0;
    });
  }, [models, search, category, sortBy]);

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
                placeholder="Search models, providers, or categories..."
              />

              <FilterBar
                category={category}
                onCategoryChange={setCategory}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            {isLoading ? (
              <LoadingState message="Loading models..." />
            ) : filteredModels.length > 0 ? (
              <ModelGrid
                models={filteredModels.map((model) => ({
                  ...model,
                  provider:
                    typeof model.provider === "string"
                      ? model.provider
                      : model.provider?.name || "Unknown provider",
                  contextWindow: model.capabilities?.context_window
                    ? `${Math.round(
                        model.capabilities.context_window / 1000
                      )}K`
                    : model.contextWindow,
                }))}
              />
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
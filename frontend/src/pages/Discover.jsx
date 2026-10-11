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
    let isMounted = true;

    async function loadModels() {
      try {
        const data = await getModels();
        const modelList = Array.isArray(data)
          ? data
          : data?.models ?? data?.items ?? [];

        if (isMounted) {
          setModels(modelList.length > 0 ? modelList : fallbackModels);
        }
      } catch {
        if (isMounted) {
          setModels(fallbackModels);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadModels();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredModels = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = models.filter((model) => {
      const provider =
        typeof model.provider === "string"
          ? model.provider
          : model.provider?.name ?? "";

      const modelCategory = String(model.category ?? "")
        .toLowerCase()
        .replace(/\s+/g, "-");

      const matchesSearch =
        !query ||
        String(model.name ?? "").toLowerCase().includes(query) ||
        provider.toLowerCase().includes(query) ||
        modelCategory.includes(query);

      const matchesCategory =
        category === "all" || modelCategory === category;

      return matchesSearch && matchesCategory;
    });

    return [...result].sort((a, b) => {
      if (sortBy === "name") {
        return String(a.name ?? "").localeCompare(String(b.name ?? ""));
      }

      const metricKey = {
        quality: "quality_score",
        speed: "speed_score",
        cost: "cost_score",
      }[sortBy];

      if (metricKey) {
        return (
          Number(b.metrics?.[metricKey] ?? 0) -
          Number(a.metrics?.[metricKey] ?? 0)
        );
      }

      return 0;
    });
  }, [models, search, category, sortBy]);

  const displayModels = filteredModels.map((model) => ({
    ...model,
    provider:
      typeof model.provider === "string"
        ? model.provider
        : model.provider?.name ?? "Unknown provider",
    contextWindow: model.capabilities?.context_window
      ? `${Math.round(model.capabilities.context_window / 1000)}K`
      : model.contextWindow,
  }));

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

            {!isLoading && (
              <p className="discover__results">
                {filteredModels.length}{" "}
                {filteredModels.length === 1 ? "model" : "models"} found
              </p>
            )}

            {isLoading ? (
              <LoadingState message="Loading models..." />
            ) : displayModels.length > 0 ? (
              <ModelGrid models={displayModels} />
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
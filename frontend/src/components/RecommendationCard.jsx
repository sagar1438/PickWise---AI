import { ArrowUpRight, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import MatchScore from "./MatchScore";
import ModelBadge from "./ModelBadge";

function RecommendationCard({
  rank,
  id,
  name,
  provider,
  description,
  score,
  strengths = [],
  weaknesses = [],
  cost,
  speed,
  context,
}) 
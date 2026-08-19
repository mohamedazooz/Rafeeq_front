"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProgramsService } from "../services/programs.service";
import { ProgramItem } from "../types/programs.types";
import { FEATURED_PROGRAMS } from "@/features/home/components/FeaturedProgramsSection";

export function useProgramsFilter() {
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selectedDest, setSelectedDest] = useState(searchParams.get("destination_slug") || "");
  const [selectedCat, setSelectedCat] = useState(searchParams.get("category_slug") || "");
  const [sortBy, setSortBy] = useState<string>(searchParams.get("sort") || "popular");
  const [isLoading, setIsLoading] = useState(false);
  const [programsList, setProgramsList] = useState<ProgramItem[]>(FEATURED_PROGRAMS);

  const applyFilters = async () => {
    setIsLoading(true);
    const filtered = await ProgramsService.getPrograms({
      query,
      destinationSlug: selectedDest,
      categorySlug: selectedCat,
      sortBy: sortBy as "popular" | "rating" | "price_asc" | "price_desc",
    });
    setProgramsList(filtered);
    setIsLoading(false);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedDest, selectedCat, sortBy]);

  return {
    query,
    setQuery,
    selectedDest,
    setSelectedDest,
    selectedCat,
    setSelectedCat,
    sortBy,
    setSortBy,
    isLoading,
    programsList,
    applyFilters,
    resetFilters: () => {
      setQuery("");
      setSelectedDest("");
      setSelectedCat("");
      setSortBy("popular");
    },
  };
}

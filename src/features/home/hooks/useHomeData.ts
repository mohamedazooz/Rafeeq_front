"use client";

import { useState, useEffect } from "react";
import { HomeService } from "../services/home.service";
import { HomeHeroSlide } from "../types/home.types";

export function useHomeData() {
  const [slides, setSlides] = useState<HomeHeroSlide[]>([]);

  useEffect(() => {
    HomeService.getHeroSlides().then(setSlides);
  }, []);

  return { slides };
}

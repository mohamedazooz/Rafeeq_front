"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  theme: ThemeMode;
  isAuto: boolean;
  toggleTheme: () => void;
  resetToAuto: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  isAuto: true,
  toggleTheme: () => {},
  resetToAuto: () => {},
});

export function ThemeProvider({ children }: { readonly children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>("dark");
  const [isAuto, setIsAuto] = useState<boolean>(true);

  // Auto 12-hour time calculation:
  // 6:00 AM (6) to 6:00 PM (18) -> Light Mode
  // 6:00 PM (18) to 6:00 AM (6) -> Dark Mode
  const getAutoThemeByTime = (): ThemeMode => {
    const hours = new Date().getHours();
    return hours >= 6 && hours < 18 ? "light" : "dark";
  };

  useEffect(() => {
    const savedManualTheme = localStorage.getItem("rafeeq_user_theme") as ThemeMode | null;
    if (savedManualTheme) {
      setTheme(savedManualTheme);
      setIsAuto(false);
    } else {
      setTheme(getAutoThemeByTime());
      setIsAuto(true);
    }

    // Set interval to check time every minute if in auto mode
    const interval = setInterval(() => {
      if (!localStorage.getItem("rafeeq_user_theme")) {
        setTheme(getAutoThemeByTime());
        setIsAuto(true);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    setIsAuto(false);
    localStorage.setItem("rafeeq_user_theme", nextTheme);
  };

  const resetToAuto = () => {
    localStorage.removeItem("rafeeq_user_theme");
    setTheme(getAutoThemeByTime());
    setIsAuto(true);
  };

  return (
    <ThemeContext.Provider value={{ theme, isAuto, toggleTheme, resetToAuto }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

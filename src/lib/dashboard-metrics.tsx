"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface DashboardMetrics {
  pendingGuidesCount: number;
  pendingProgramsCount: number;
  pendingDisputesCount: number;
  pendingPayoutsCount: number;
  unreadMessagesCount: number;
  guideBookingsCount: number;
  clientBookingsCount: number;
}

const DEFAULT_METRICS: DashboardMetrics = {
  pendingGuidesCount: 2,
  pendingProgramsCount: 2,
  pendingDisputesCount: 1,
  pendingPayoutsCount: 1,
  unreadMessagesCount: 3,
  guideBookingsCount: 2,
  clientBookingsCount: 1,
};

interface DashboardMetricsContextType {
  metrics: DashboardMetrics;
  decrementGuidesQueue: () => void;
  decrementProgramsQueue: () => void;
  decrementDisputesQueue: () => void;
  decrementPayoutsQueue: () => void;
  decrementMessagesQueue: () => void;
  resetMetrics: () => void;
  updateMetric: (key: keyof DashboardMetrics, value: number) => void;
}

const DashboardMetricsContext = createContext<DashboardMetricsContextType>({
  metrics: DEFAULT_METRICS,
  decrementGuidesQueue: () => {},
  decrementProgramsQueue: () => {},
  decrementDisputesQueue: () => {},
  decrementPayoutsQueue: () => {},
  decrementMessagesQueue: () => {},
  resetMetrics: () => {},
  updateMetric: () => {},
});

const STORAGE_KEY = "rafeeq_dashboard_metrics_v1";

export function DashboardMetricsProvider({ children }: { readonly children: React.ReactNode }) {
  const [metrics, setMetricsState] = useState<DashboardMetrics>(DEFAULT_METRICS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setMetricsState({ ...DEFAULT_METRICS, ...JSON.parse(saved) });
      }
    } catch {
      // ignore JSON parse error fallback
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveMetrics = useCallback((newMetrics: DashboardMetrics) => {
    setMetricsState(newMetrics);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMetrics));
    } catch {
      // storage error handling
    }
  }, []);

  const decrementGuidesQueue = useCallback(() => {
    setMetricsState((prev) => {
      const next = { ...prev, pendingGuidesCount: Math.max(0, prev.pendingGuidesCount - 1) };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const decrementProgramsQueue = useCallback(() => {
    setMetricsState((prev) => {
      const next = { ...prev, pendingProgramsCount: Math.max(0, prev.pendingProgramsCount - 1) };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const decrementDisputesQueue = useCallback(() => {
    setMetricsState((prev) => {
      const next = { ...prev, pendingDisputesCount: Math.max(0, prev.pendingDisputesCount - 1) };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const decrementPayoutsQueue = useCallback(() => {
    setMetricsState((prev) => {
      const next = { ...prev, pendingPayoutsCount: Math.max(0, prev.pendingPayoutsCount - 1) };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const decrementMessagesQueue = useCallback(() => {
    setMetricsState((prev) => {
      const next = { ...prev, unreadMessagesCount: Math.max(0, prev.unreadMessagesCount - 1) };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const resetMetrics = useCallback(() => {
    saveMetrics(DEFAULT_METRICS);
  }, [saveMetrics]);

  const updateMetric = useCallback((key: keyof DashboardMetrics, value: number) => {
    setMetricsState((prev) => {
      const next = { ...prev, [key]: Math.max(0, value) };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return (
    <DashboardMetricsContext.Provider
      value={{
        metrics: isLoaded ? metrics : DEFAULT_METRICS,
        decrementGuidesQueue,
        decrementProgramsQueue,
        decrementDisputesQueue,
        decrementPayoutsQueue,
        decrementMessagesQueue,
        resetMetrics,
        updateMetric,
      }}
    >
      {children}
    </DashboardMetricsContext.Provider>
  );
}

export const useDashboardMetrics = () => useContext(DashboardMetricsContext);

"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { HistoryEntry } from "@/lib/types";

const STORAGE_KEY = "histopath-prediction-history";
const MAX_ENTRIES = 12;

interface HistoryContextValue {
  entries: HistoryEntry[];
  addEntry: (entry: HistoryEntry) => void;
  clearHistory: () => void;
}

const HistoryContext = createContext<HistoryContextValue | null>(null);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setEntries(JSON.parse(stored));
    } catch {
      // ignore corrupt storage
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const value = useMemo<HistoryContextValue>(
    () => ({
      entries,
      addEntry: (entry) => setEntries((prev) => [entry, ...prev].slice(0, MAX_ENTRIES)),
      clearHistory: () => setEntries([]),
    }),
    [entries]
  );

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
}

export function useHistory() {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error("useHistory must be used within HistoryProvider");
  return ctx;
}

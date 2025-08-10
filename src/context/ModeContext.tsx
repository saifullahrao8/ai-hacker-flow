import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export type Mode = "demo" | "live";

interface ModeContextValue {
  mode: Mode;
  setMode: (m: Mode) => void;
  liveAvailable: boolean;
}

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const [mode, setModeState] = useState<Mode>(() => (localStorage.getItem("ht_mode") as Mode) || "demo");

  // In this first version, Live is disabled until Supabase is connected and keys are stored.
  const liveAvailable = false;

  const setMode = (m: Mode) => {
    if (m === "live" && !liveAvailable) {
      toast({
        title: "Live mode locked",
        description: "Connect Supabase and store required API keys in Settings to enable Live mode.",
      });
      return;
    }
    setModeState(m);
  };

  useEffect(() => {
    localStorage.setItem("ht_mode", mode);
  }, [mode]);

  const value = useMemo(() => ({ mode, setMode, liveAvailable }), [mode]);

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};

export const useMode = () => {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
};

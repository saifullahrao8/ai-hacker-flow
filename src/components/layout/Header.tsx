import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useMode } from "@/context/ModeContext";
import { motion } from "framer-motion";
import { Rocket, Users, ClipboardList, CalendarDays, LineChart, Settings as SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
const nav = [
  { to: "/dashboard", label: "Dashboard", icon: Rocket },
  { to: "/agents", label: "Agents", icon: ClipboardList },
  { to: "/community", label: "Community", icon: Users },
  { to: "/planner", label: "Planner", icon: CalendarDays },
  { to: "/logs", label: "Logs", icon: LineChart },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

export default function Header() {
  const { mode, setMode, liveAvailable } = useMode();
  const location = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/dashboard": "Hackathon Twin — Dashboard",
      "/agents": "Hackathon Twin — Agents Console",
      "/community": "Hackathon Twin — Community Hub",
      "/planner": "Hackathon Twin — Event Planner",
      "/logs": "Hackathon Twin — Logs & Analytics",
      "/settings": "Hackathon Twin — Settings",
    };
    document.title = titles[location.pathname] || "Hackathon Twin";
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex items-center justify-between py-3">
        <Link to="/navigation" className="flex items-center gap-2">
          <div className="relative">
            <motion.div
              className="h-8 w-8 rounded-md bg-accent/20 border border-accent/30"
              animate={{ boxShadow: [
                "0 0 0px hsl(var(--accent-glow) / 0)",
                "0 0 24px hsl(var(--accent-glow) / 0.6)",
                "0 0 0px hsl(var(--accent-glow) / 0)",
              ]}}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="font-semibold tracking-wide">Hackathon Twin</span>
        </Link>

        <div className="flex items-center gap-2">
          <ModeSwitch mode={mode} setMode={setMode} liveAvailable={liveAvailable} />
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0" />
    </header>
  );
}

function ModeSwitch({ mode, setMode, liveAvailable }: { mode: "demo" | "live"; setMode: (m: any) => void; liveAvailable: boolean; }) {
  return (
    <div className="relative inline-flex items-center rounded-full border bg-secondary/60 p-1">
      <button
        type="button"
        onClick={() => setMode("demo")}
        className={cn(
          "relative z-10 px-3 py-1 text-sm rounded-full",
          mode === "demo" ? "text-foreground" : "text-muted-foreground"
        )}
      >
        Demo
      </button>
      <button
        type="button"
        onClick={() => setMode("live")}
        className={cn(
          "relative z-10 px-3 py-1 text-sm rounded-full",
          mode === "live" ? "text-foreground" : "text-muted-foreground"
        )}
        aria-disabled={!liveAvailable}
      >
        Live
      </button>
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
        className="absolute top-1 bottom-1 rounded-full shadow"
        style={{
          width: "calc(50% - 4px)",
          left: mode === "demo" ? 4 : "calc(50% + 0px)",
          background: mode === "demo" ? "hsl(var(--accent) / 0.2)" : "hsl(var(--primary) / 0.2)",
        }}
      />
    </div>
  );
}

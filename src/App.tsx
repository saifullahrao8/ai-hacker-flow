import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import AgentsConsole from "./pages/AgentsConsole";
import CommunityHub from "./pages/CommunityHub";
import EventPlanner from "./pages/EventPlanner";
import LogsAnalytics from "./pages/LogsAnalytics";
import Settings from "./pages/Settings";
import Header from "./components/layout/Header";
import { ModeProvider } from "./context/ModeContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./components/layout/AppSidebar";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ModeProvider>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <div className="flex-1">
                <Header />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/agents" element={<AgentsConsole />} />
                  <Route path="/community" element={<CommunityHub />} />
                  <Route path="/planner" element={<EventPlanner />} />
                  <Route path="/logs" element={<LogsAnalytics />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </SidebarProvider>
        </ModeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

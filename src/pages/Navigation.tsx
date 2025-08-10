import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Rocket, ClipboardList, Users, CalendarDays, LineChart, Settings as SettingsIcon, Home } from "lucide-react";
import SEO from "@/components/SEO";

const pages = [
  {
    title: "Dashboard",
    path: "/dashboard",
    description: "KPIs, live agent feed, and quick actions",
    icon: Rocket,
    color: "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20"
  },
  {
    title: "Agents Console",
    path: "/agents",
    description: "Trigger agents and review the latest logs",
    icon: ClipboardList,
    color: "bg-green-500/10 border-green-500/20 hover:bg-green-500/20"
  },
  {
    title: "Community Hub",
    path: "/community",
    description: "Leaderboard, referrals and badges",
    icon: Users,
    color: "bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
  },
  {
    title: "Event Planner",
    path: "/planner",
    description: "Interactive calendar and agenda",
    icon: CalendarDays,
    color: "bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20"
  },
  {
    title: "Logs & Analytics",
    path: "/logs",
    description: "Search logs and view quick charts",
    icon: LineChart,
    color: "bg-red-500/10 border-red-500/20 hover:bg-red-500/20"
  },
  {
    title: "Settings",
    path: "/settings",
    description: "Manage API keys and Live mode",
    icon: SettingsIcon,
    color: "bg-gray-500/10 border-gray-500/20 hover:bg-gray-500/20"
  }
];

export default function Navigation() {
  return (
    <>
      <SEO 
        title="Hackathon Twin — Navigation" 
        description="Navigate to all pages and features of Hackathon Twin" 
        canonicalPath="/navigation" 
      />
      <main className="container max-w-6xl mx-auto py-8">
        <section className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Navigation</h1>
          <p className="text-xl text-muted-foreground">
            Choose a page to explore the Hackathon Twin platform
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <Card key={page.path} className={`transition-all duration-200 ${page.color}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-background/50">
                      <Icon size={24} />
                    </div>
                    <CardTitle className="text-lg">{page.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {page.description}
                  </p>
                  <Button asChild className="w-full">
                    <Link to={page.path}>
                      Visit {page.title}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="mt-12 text-center">
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="pt-6">
              <Home size={32} className="mx-auto mb-4 text-accent" />
              <h3 className="text-lg font-semibold mb-2">Quick Access</h3>
              <p className="text-muted-foreground mb-4">
                You can always return to this navigation page by clicking the logo in the header
              </p>
              <Button variant="outline" asChild>
                <Link to="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
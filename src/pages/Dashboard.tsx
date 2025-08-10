import { useMemo } from "react";
import { motion } from "framer-motion";
import { demoLeaderboard, demoLogs, demoParticipants } from "@/data/demo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Activity, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
const fadeIn = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } };

export default function Dashboard() {
  const totalParticipants = demoParticipants.length;
  const totalPoints = demoLeaderboard.reduce((a, b) => a + b.points, 0);
  const activeAgents = 7;

  const latestLogs = useMemo(() => demoLogs.slice(0, 4), []);

  return (
    <>
      <SEO title="Hackathon Twin — Dashboard" description="KPIs, live agent feed, and quick actions" canonicalPath="/dashboard" />
      <main className="container max-w-7xl mx-auto py-8">
      <section className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <motion.h1 {...fadeIn} transition={{ duration: 0.4 }} className="text-3xl font-semibold">
              Hackathon Twin Dashboard
            </motion.h1>
            <p className="text-muted-foreground mt-1">KPIs, live agent feed, and quick actions</p>
          </div>
          <div className="hidden md:flex gap-2">
            <Button variant="outline" onClick={() => toast({ title: "Exported (Demo)" })}>Export</Button>
            <Button variant="secondary" onClick={() => toast({ title: "Shared (Demo)" })}>Share</Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard title="Participants" value={totalParticipants.toLocaleString()} icon={<Users size={18} />} />
        <StatCard title="Total Points" value={totalPoints.toLocaleString()} icon={<Award size={18} />} />
        <StatCard title="Active Agents" value={activeAgents} icon={<Activity size={18} />} />
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <motion.div {...fadeIn} transition={{ delay: 0.05 }} className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Live Agent Feed (Demo)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {latestLogs.map((log, i) => (
                <div key={i} className="flex items-center justify-between border-b last:border-none pb-3">
                  <div>
                    <p className="text-sm font-medium">{log.agent}</p>
                    <p className="text-xs text-muted-foreground">{log.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={() => toast({ title: "Outreach queued (Demo)" })}>Run Outreach</Button>
              <Button variant="secondary" className="w-full" onClick={() => toast({ title: "Agenda generated (Demo)" })}>Generate Agenda</Button>
              <Button variant="secondary" className="w-full" onClick={() => toast({ title: "Leaderboard refreshed (Demo)" })}>Refresh Leaderboard</Button>
              <Link className="block" to="/agents"><Button variant="outline" className="w-full">Open Agents Console</Button></Link>
            </CardContent>
          </Card>
        </motion.div>
      </section>
      </main>
    </>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) {
  return (
    <motion.div {...fadeIn}>
      <Card className="h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="text-muted-foreground">{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{value}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

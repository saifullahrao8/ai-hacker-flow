import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { demoLogs } from "@/data/demo";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

export default function LogsAnalytics() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => demoLogs.filter(l => (l.agent + l.action).toLowerCase().includes(q.toLowerCase())), [q]);

  const byAgent = useMemo(() => {
    const map = new Map<string, number>();
    demoLogs.forEach(l => map.set(l.agent, (map.get(l.agent) || 0) + 1));
    return Array.from(map, ([agent, count]) => ({ agent, count }));
  }, []);

  return (
    <>
      <SEO title="Hackathon Twin — Logs & Analytics" description="Search logs and view quick charts" canonicalPath="/logs" />
      <main className="container max-w-7xl mx-auto py-8">
        <section className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">Logs & Analytics</h1>
              <p className="text-muted-foreground mt-1">Search logs and view quick charts (Demo)</p>
            </div>
            <div className="hidden md:flex gap-2">
              <Button variant="outline" onClick={() => { toast({ title: "Exported CSV (Demo)" })}}>Export CSV</Button>
              <Button variant="secondary" onClick={() => setQ("")}>Clear Search</Button>
            </div>
          </div>
        </section>

      <section className="grid gap-6 md:grid-cols-3 mt-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search logs..." />
            <div className="mt-4 max-h-[420px] overflow-auto space-y-2">
              {filtered.map((l, i) => (
                <div key={i} className="border-b last:border-none pb-2 text-sm">
                  <span className="font-medium">{l.agent}</span>: {l.action}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Events by Agent</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byAgent}>
                <XAxis dataKey="agent" hide />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>
      </main>
    </>
  );
}

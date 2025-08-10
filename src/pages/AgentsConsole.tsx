import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoLogs } from "@/data/demo";
import type { AgentRole } from "@/data/demo";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
const agents: AgentRole[] = ["Outreach Agent", "Team & Volunteer Manager Agent", "Speaker & Jury Agent", "Content & Agenda Agent", "Live Event Moderator Agent", "Sponsor Manager Agent", "Community Growth Agent"];
export default function AgentsConsole() {
  return <>
      <SEO title="Hackathon Twin — Agents Console" description="Trigger agents and review the latest logs" canonicalPath="/agents" />
      <main className="container max-w-7xl mx-auto py-8">
        <section className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">Agents Console</h1>
              <p className="text-muted-foreground mt-1">Trigger agents and review the latest logs (Demo)</p>
            </div>
            <div className="hidden md:flex gap-2">
              <Button asChild variant="outline"><Link to="/logs">View Logs</Link></Button>
              <Button variant="secondary" onClick={() => toast({
              title: `Add Agent (Demo)`
            })}>Add Agent</Button>
            </div>
          </div>
        </section>
      <Tabs defaultValue={agents[0]} className="mt-6">
        <TabsList className="flex flex-wrap px-[14px] rounded-2xl py-[56px]">
          {agents.map(a => <TabsTrigger key={a} value={a} className="mx-[4px] my-0 py-0 px-[18px]">{a}</TabsTrigger>)}
        </TabsList>
        {agents.map(a => <TabsContent key={a} value={a} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{a}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium" onClick={() => toast({
                  title: `${a} triggered (Demo)`
                })}>
                    ▶ Run Once
                  </Button>
                  <Button variant="secondary" className="flex-1 font-medium" onClick={() => toast({
                  title: `${a} scheduled batch (Demo)`
                })}>
                    📅 Schedule Batch
                  </Button>
                </div>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-muted-foreground">Latest logs</p>
                  {demoLogs.filter(l => l.agent === a).slice(0, 5).map((l, i) => <div key={i} className="text-sm border-b last:border-none pb-2">
                        <span className="font-medium">{l.agent}</span>: {l.action}
                      </div>)}
                </div>
              </CardContent>
            </Card>
          </TabsContent>)}
      </Tabs>
      </main>
    </>;
}
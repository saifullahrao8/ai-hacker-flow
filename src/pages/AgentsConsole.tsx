import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { demoLogs } from "@/data/demo";
import type { AgentRole } from "@/data/demo";
import { toast } from "@/hooks/use-toast";

const agents: AgentRole[] = [
  "Outreach Agent",
  "Team & Volunteer Manager Agent",
  "Speaker & Jury Agent",
  "Content & Agenda Agent",
  "Live Event Moderator Agent",
  "Sponsor Manager Agent",
  "Community Growth Agent",
];

export default function AgentsConsole() {
  return (
    <main className="container max-w-7xl mx-auto py-8">
      <h1 className="text-3xl font-semibold">Agents Console</h1>
      <p className="text-muted-foreground mt-1">Trigger agents and review the latest logs (Demo)</p>

      <Tabs defaultValue={agents[0]} className="mt-6">
        <TabsList className="flex flex-wrap">
          {agents.map((a) => (
            <TabsTrigger key={a} value={a}>{a}</TabsTrigger>
          ))}
        </TabsList>
        {agents.map((a) => (
          <TabsContent key={a} value={a} className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{a}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Button onClick={() => toast({ title: `${a} triggered (Demo)` })}>Run once</Button>
                  <Button variant="secondary" onClick={() => toast({ title: `${a} scheduled batch (Demo)` })}>Schedule batch</Button>
                </div>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-muted-foreground">Latest logs</p>
                  {demoLogs
                    .filter((l) => l.agent === a)
                    .slice(0, 5)
                    .map((l, i) => (
                      <div key={i} className="text-sm border-b last:border-none pb-2">
                        <span className="font-medium">{l.agent}</span>: {l.action}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}

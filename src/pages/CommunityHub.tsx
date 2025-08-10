import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { demoLeaderboard, demoParticipants } from "@/data/demo";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

export default function CommunityHub() {
  return (
    <>
      <SEO title="Hackathon Twin — Community Hub" description="Leaderboard, referrals and badges" canonicalPath="/community" />
      <main className="container max-w-7xl mx-auto py-8">
        <section className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">Community Hub</h1>
              <p className="text-muted-foreground mt-1">Leaderboard, referrals and badges (Demo)</p>
            </div>
            <div className="hidden md:flex gap-2">
              <Button variant="secondary" onClick={() => toast({ title: "Invite link copied (Demo)" })}>Invite Members</Button>
              <Button variant="outline" onClick={() => toast({ title: "Leaderboard exported (Demo)" })}>Export</Button>
            </div>
          </div>
        </section>

      <section className="grid gap-6 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Leaderboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoLeaderboard.map((e) => (
              <div key={e.rank} className="flex items-center justify-between border-b last:border-none pb-2">
                <span className="text-sm">#{e.rank} {e.name}</span>
                <span className="text-sm font-medium">{e.points} pts</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Referrals Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {demoParticipants.map((p) => (
              <div key={p.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{p.name}</span>
                  <span>{p.referrals_count}/20</span>
                </div>
                <Progress value={(p.referrals_count/20)*100} />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {["Early Bird","Top 10%","Mentor","Team Lead","Streak x7"].map((b) => (
              <span key={b} className="px-3 py-1 rounded-full border bg-secondary/60 text-sm">{b}</span>
            ))}
          </CardContent>
        </Card>
      </section>
      </main>
    </>
  );

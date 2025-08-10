import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const fields = [
  { key: "openai", label: "OpenAI API Key" },
  { key: "slack_verification", label: "Slack Verification Token" },
  { key: "discord_public", label: "Discord Public Key" },
  { key: "airtable", label: "Airtable API Key" },
  { key: "google_workspace", label: "Google Workspace API Key" },
];

export default function Settings() {
  return (
    <main className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-semibold">Settings</h1>
      <p className="text-muted-foreground mt-1">Manage API keys and Live mode</p>

      <Alert className="mt-6">
        <AlertTitle>Enable Live Mode</AlertTitle>
        <AlertDescription>
          To securely store API keys and enable Live mode, connect your project to Supabase via Lovable's native integration. Once connected, we'll save keys to the api_keys table with RLS policies.
        </AlertDescription>
      </Alert>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((f) => (
            <div key={f.key} className="grid gap-2">
              <Label htmlFor={f.key}>{f.label}</Label>
              <Input id={f.key} placeholder="Connect Supabase to enable secure storage" disabled />
            </div>
          ))}
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="secondary" disabled>Load</Button>
            <Button disabled>Save</Button>
          </div>
          <p className="text-xs text-muted-foreground">Live mode becomes available automatically once all required keys are securely stored.</p>
        </CardContent>
      </Card>
    </main>
  );
}

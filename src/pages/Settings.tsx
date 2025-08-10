import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Key, Shield, AlertCircle } from "lucide-react";

const fields = [
  { key: "openai", label: "OpenAI API Key", required: true },
  { key: "slack_verification", label: "Slack Verification Token", required: true },
  { key: "discord_public", label: "Discord Public Key", required: true },
  { key: "airtable", label: "Airtable API Key", required: false },
  { key: "google_workspace", label: "Google Workspace API Key", required: false },
];

export default function Settings() {
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [liveAvailable, setLiveAvailable] = useState(false);

  useEffect(() => {
    // Load stored keys from localStorage
    const stored: Record<string, string> = {};
    fields.forEach(f => {
      const value = localStorage.getItem(`ht_api_${f.key}`);
      if (value) stored[f.key] = value;
    });
    setKeys(stored);
    
    // Check if all required keys are present
    const requiredKeys = fields.filter(f => f.required).map(f => f.key);
    const hasAllRequired = requiredKeys.every(key => stored[key]);
    setLiveAvailable(hasAllRequired);
  }, []);

  const handleSave = () => {
    // Save to localStorage
    Object.entries(keys).forEach(([key, value]) => {
      if (value.trim()) {
        localStorage.setItem(`ht_api_${key}`, value.trim());
      } else {
        localStorage.removeItem(`ht_api_${key}`);
      }
    });

    // Check if Live mode should be enabled
    const requiredKeys = fields.filter(f => f.required).map(f => f.key);
    const hasAllRequired = requiredKeys.every(key => keys[key]?.trim());
    setLiveAvailable(hasAllRequired);

    toast({
      title: "API Keys Saved",
      description: hasAllRequired 
        ? "All required keys saved. Live mode is now available!" 
        : "Keys saved. Add all required keys to enable Live mode.",
    });

    // Trigger a re-check in the mode context
    window.dispatchEvent(new Event('storage'));
  };

  const handleClear = () => {
    fields.forEach(f => localStorage.removeItem(`ht_api_${f.key}`));
    setKeys({});
    setLiveAvailable(false);
    toast({ title: "All API keys cleared" });
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <main className="container max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-semibold">Settings</h1>
      <p className="text-muted-foreground mt-1">Manage API keys and Live mode</p>

      <Alert className="mt-6">
        <Shield className="h-4 w-4" />
        <AlertTitle>Security Notice</AlertTitle>
        <AlertDescription>
          API keys are stored in browser localStorage for demo purposes. For production use, connect Supabase for secure encrypted storage and backend functionality.
        </AlertDescription>
      </Alert>

      {liveAvailable && (
        <Alert className="mt-4">
          <Key className="h-4 w-4" />
          <AlertTitle>Live Mode Available</AlertTitle>
          <AlertDescription>
            All required API keys are configured. You can now switch to Live mode in the header.
          </AlertDescription>
        </Alert>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key size={20} />
            API Keys
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((f) => (
            <div key={f.key} className="grid gap-2">
              <Label htmlFor={f.key} className="flex items-center gap-2">
                {f.label}
                {f.required && <span className="text-destructive">*</span>}
              </Label>
              <Input
                id={f.key}
                type="password"
                value={keys[f.key] || ""}
                onChange={(e) => setKeys(prev => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={`Enter your ${f.label.toLowerCase()}`}
              />
            </div>
          ))}
          
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle size={16} />
              <span>* Required for Live mode</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClear}>
                Clear All
              </Button>
              <Button onClick={handleSave}>
                Save Keys
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="mt-6">
        <AlertTitle>Connect Supabase for Production</AlertTitle>
        <AlertDescription>
          For secure API key storage, backend workflows, and database functionality, connect your project to Supabase using Lovable's native integration.
        </AlertDescription>
      </Alert>
    </main>
  );
}

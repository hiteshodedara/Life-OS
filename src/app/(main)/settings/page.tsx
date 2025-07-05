
'use client';

import { useTheme } from 'next-themes';
import { useSettings } from '@/contexts/SettingsContext';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Palette, Landmark, KeyRound, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SettingsPage() {
  const { setTheme, theme } = useTheme();
  const { currency, setCurrency, geminiApiKey, setGeminiApiKey } = useSettings();

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title="Settings"
        description="Manage your application preferences and configurations."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Palette className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of the app.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>Theme</Label>
                <RadioGroup
                  value={theme}
                  onValueChange={setTheme}
                  className="flex items-center space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system">System</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Landmark className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>Currency</CardTitle>
                <CardDescription>
                  Select your preferred currency for expense tracking.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                   <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger id="currency" className="w-[180px]">
                          <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="JPY">JPY (¥)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="INR">INR (₹)</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <KeyRound className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>
                  Manage API keys for third-party integrations.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="gemini-key">Gemini API Key</Label>
                  <Input 
                    id="gemini-key" 
                    type="password" 
                    placeholder="Enter your Gemini API Key" 
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                  />
               </div>
               <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Server Configuration Required</AlertTitle>
                  <AlertDescription>
                    For the AI assistant to work, you must copy this key into the <code className="font-mono text-sm bg-muted px-1 py-0.5 rounded">.env</code> file at the root of your project as <code className="font-mono text-sm bg-muted px-1 py-0.5 rounded">GEMINI_API_KEY=...</code> and restart your server.
                  </AlertDescription>
                </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

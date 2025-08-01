
'use client';

import { useTheme } from 'next-themes';
import { useSettings } from '@/contexts/SettingsContext';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Palette, Landmark, KeyRound, AlertTriangle, LogOut, CheckCircle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  const { setTheme, theme } = useTheme();
  const { currency, setCurrency, geminiApiKey, setGeminiApiKey, isValidApiKey } = useSettings();
  const { logout } = useAuth();

  return (
    <div className="p-4 md:p-6">
      <PageHeader
        title="Settings"
        description="Manage your application preferences and configurations."
      />
      <div className="grid gap-6 max-w-4xl mx-auto">
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
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <KeyRound className="w-6 h-6 text-primary" />
              <div>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>
                  Securely configure your AI assistant with your Gemini API key.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="gemini-key">Gemini API Key</Label>
                  <div className="relative">
                    <Input 
                      id="gemini-key" 
                      type="password" 
                      placeholder="Enter your Gemini API Key (starts with AIza...)" 
                      value={geminiApiKey}
                      onChange={(e) => setGeminiApiKey(e.target.value)}
                      className={geminiApiKey && !isValidApiKey ? "border-destructive" : geminiApiKey && isValidApiKey ? "border-green-500" : ""}
                    />
                    {geminiApiKey && isValidApiKey && (
                      <CheckCircle className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                    )}
                  </div>
               </div>
               
               {/* Security Information */}
               <Alert>
                 <Info className="h-4 w-4" />
                 <AlertTitle>Security Note</AlertTitle>
                 <AlertDescription>
                   Your API key is stored locally in your browser and transmitted securely to our servers. 
                   We never store your API key on our servers. You can get a free API key from{' '}
                   <a 
                     href="https://aistudio.google.com/app/apikey" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-primary underline hover:no-underline"
                   >
                     Google AI Studio
                   </a>.
                 </AlertDescription>
               </Alert>

               {/* Validation Messages */}
               {geminiApiKey && !isValidApiKey && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Invalid API Key</AlertTitle>
                  <AlertDescription>
                    The API key format appears to be invalid. Gemini API keys should start with "AIza" and be at least 30 characters long.
                  </AlertDescription>
                </Alert>
               )}
               
               {geminiApiKey && isValidApiKey && (
                <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>API Key Valid</AlertTitle>
                  <AlertDescription>
                    Your API key format looks correct! The AI assistant should now work properly.
                  </AlertDescription>
                </Alert>
               )}
               
               {!geminiApiKey && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Action Required</AlertTitle>
                  <AlertDescription>
                    The AI assistant will not work without an API key. You can get a free key from Google AI Studio.
                  </AlertDescription>
                </Alert>
               )}
            </CardContent>
          </Card>
           <Card>
             <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings.</CardDescription>
             </CardHeader>
             <CardContent>
                 <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                 </Button>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

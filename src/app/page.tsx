'use client';
import { Bot, CreditCard, Notebook, ClipboardList, LogIn, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const AiAssistantIllustration = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="ai-grad" x1="100" y1="0" x2="100" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="hsl(var(--primary))" />
                <stop offset="1" stopColor="hsl(var(--accent))" />
            </linearGradient>
        </defs>
        <path d="M85 40C85 34.4772 89.4772 30 95 30H105C110.523 30 115 34.4772 115 40V45H85V40Z" stroke="url(#ai-grad)" strokeWidth="4" />
        <rect x="70" y="45" width="60" height="50" rx="8" stroke="url(#ai-grad)" strokeWidth="4" />
        <circle cx="88" cy="65" r="4" fill="hsl(var(--primary))" />
        <circle cx="112" cy="65" r="4" fill="hsl(var(--accent))" />
        <path d="M85 80H115" stroke="hsl(var(--muted-foreground))" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

const TaskManagementIllustration = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="160" height="80" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2"/>
        <path d="M70 20V100" stroke="hsl(var(--border))" strokeWidth="2" />
        <path d="M130 20V100" stroke="hsl(var(--border))" strokeWidth="2" />
        <rect x="30" y="30" width="30" height="20" rx="4" fill="hsl(var(--primary))" opacity="0.7" />
        <rect x="80" y="50" width="40" height="35" rx="4" fill="hsl(var(--accent))" opacity="0.8" />
        <rect x="30" y="60" width="30" height="30" rx="4" fill="hsl(var(--muted))" />
        <rect x="140" y="35" width="40" height="20" rx="4" fill="hsl(var(--primary))" />
    </svg>
);

const NoteTakingIllustration = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 99.9999C40 94.4771 44.4772 90 50 90H150C155.523 90 160 94.4771 160 99.9999V99.9999H40V99.9999Z" fill="hsl(var(--muted))"/>
        <path d="M40 20C40 14.4772 44.4772 10 50 10H150C155.523 10 160 14.4772 160 20V90H40V20Z" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2"/>
        <rect x="50" y="30" width="80" height="8" rx="4" fill="hsl(var(--primary))" opacity="0.5"/>
        <rect x="50" y="50" width="100" height="6" rx="3" fill="hsl(var(--muted-foreground))" opacity="0.4"/>
        <rect x="50" y="65" width="90" height="6" rx="3" fill="hsl(var(--muted-foreground))" opacity="0.4"/>
    </svg>
);

const FinancialOverviewIllustration = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 100H160" stroke="hsl(var(--border))" strokeWidth="2" strokeLinecap="round"/>
        <rect x="50" y="60" width="20" height="40" rx="4" fill="hsl(var(--primary))" />
        <rect x="90" y="40" width="20" height="60" rx="4" fill="hsl(var(--accent))" />
        <rect x="130" y="20" width="20" height="80" rx="4" fill="hsl(var(--primary))" opacity="0.6"/>
    </svg>
);


const features = [
  {
    name: 'Intelligent AI Assistant',
    description: 'Get personalized suggestions, manage your tasks with natural language, and let our AI help you stay on track.',
    icon: Bot,
    image: { component: AiAssistantIllustration },
  },
  {
    name: 'Effortless Task Management',
    description: 'Organize your life with a powerful to-do list. Prioritize tasks, set due dates, and visualize your progress on a kanban board.',
    icon: ClipboardList,
    image: { component: TaskManagementIllustration },
  },
  {
    name: 'Seamless Note-Taking',
    description: 'Capture your thoughts, ideas, and inspiration in a clean, organized space. Tag and search your notes with ease.',
    icon: Notebook,
    image: { component: NoteTakingIllustration },
  },
  {
    name: 'Clear Financial Overview',
    description: 'Track your income and expenses effortlessly. Understand your spending habits with clear charts and reports.',
    icon: CreditCard,
    image: { component: FinancialOverviewIllustration },
  },
];

const HeroBlob1 = () => (
    <svg className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3 text-primary/10 -z-10" width="600" height="600" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_902_20)">
        <path fill="currentColor" d="M128.502 12.3331C150.151 22.3138 163.743 47.3725 171.79 71.3323C179.837 95.2921 182.339 118.153 173.729 139.333C165.119 160.513 145.397 179.912 122.998 186.231C100.6 192.55 75.5235 185.788 53.6457 174.49C31.7679 163.192 13.0883 147.357 5.52093 125.138C-2.04646 102.919 1.49841 74.3149 13.6338 51.5831C25.7692 28.8513 46.4951 12.0001 69.4984 4.50011C92.5016 -3.00014 117.892 -1.18731 128.502 12.3331Z"/>
        </g>
    </svg>
)

const HeroBlob2 = () => (
    <svg className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 text-accent/10 -z-10" width="500" height="500" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_902_21)">
        <path fill="currentColor" d="M174.453 58.2331C188.083 82.8317 186.134 113.89 171.391 138.6C156.648 163.31 129.11 181.67 101.025 186.231C72.9395 190.792 44.2981 181.554 24.3101 162.774C4.32212 143.993 -6.9922 115.671 2.37874 90.2335C11.7497 64.7959 33.8056 42.2333 58.7454 28.6677C83.6852 15.1021 111.509 10.5332 137.989 17.5831C164.469 24.6331 160.823 33.6345 174.453 58.2331Z"/>
        </g>
    </svg>
)

export default function LandingPage() {
    const { user, loading, loginWithGoogle } = useAuth();
    
    useEffect(() => {
        if (!loading && user) {
            redirect('/assistant');
        }
    }, [user, loading]);

    if (loading || user) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
        );
    }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="p-1.5 rounded-lg bg-gradient-primary">
                <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold font-headline">Life OS</h1>
          </div>
          <Button onClick={loginWithGoogle}>
              <Rocket className="mr-2 h-4 w-4" />
              Login / Sign Up
          </Button>
        </div>
      </header>
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <HeroBlob1/>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
              Organize Your Life, <span className="bg-gradient-primary bg-clip-text text-transparent">Unleash Your Potential.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Life OS is the all-in-one platform to manage your tasks, notes, and finances with the power of an intelligent AI assistant.
            </p>
            <div className="mt-10">
              <Button size="lg" onClick={loginWithGoogle}>
                <Rocket className="mr-2" />
                Launch Your Life OS
              </Button>
            </div>
            <HeroBlob2/>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">A single hub for your entire life.</h3>
              <p className="mt-4 text-lg text-muted-foreground">Stop juggling apps. Life OS brings everything together in one smart, beautiful interface.</p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col overflow-hidden rounded-lg bg-card shadow-lg">
                  <div className="flex-shrink-0 bg-muted/30 flex items-center justify-center p-8 h-64 w-full">
                    <feature.image.component className="h-full w-full" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <feature.icon className="h-8 w-8 text-primary" />
                        <h4 className="text-xl font-semibold font-headline">{feature.name}</h4>
                      </div>
                      <p className="mt-3 text-base text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <h3 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                    Ready to take control?
                </h3>
                <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                    Sign up now and experience a smarter way to manage your life. It's free to get started.
                </p>
                <div className="mt-8">
                    <Button size="lg" onClick={loginWithGoogle}>
                        Begin Your Transformation
                    </Button>
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Life OS by Hitesh Odedara. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

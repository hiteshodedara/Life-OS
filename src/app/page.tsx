'use client';
import { Bot, CreditCard, Notebook, ClipboardList, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

const features = [
  {
    name: 'Intelligent AI Assistant',
    description: 'Get personalized suggestions, manage your tasks with natural language, and let our AI help you stay on track.',
    icon: Bot,
    image: { src: "https://placehold.co/600x400.png", hint: "robot assistant" },
  },
  {
    name: 'Effortless Task Management',
    description: 'Organize your life with a powerful to-do list. Prioritize tasks, set due dates, and visualize your progress on a kanban board.',
    icon: ClipboardList,
    image: { src: "https://placehold.co/600x400.png", hint: "task list" },
  },
  {
    name: 'Seamless Note-Taking',
    description: 'Capture your thoughts, ideas, and inspiration in a clean, organized space. Tag and search your notes with ease.',
    icon: Notebook,
    image: { src: "https://placehold.co/600x400.png", hint: "notebook journal" },
  },
  {
    name: 'Clear Financial Overview',
    description: 'Track your income and expenses effortlessly. Understand your spending habits with clear charts and reports.',
    icon: CreditCard,
    image: { src: "https://placehold.co/600x400.png", hint: "financial chart" },
  },
];

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
              <LogIn className="mr-2 h-4 w-4" />
              Login / Sign Up
          </Button>
        </div>
      </header>
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
              Organize Your Life, <span className="bg-gradient-primary bg-clip-text text-transparent">Unleash Your Potential.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Life OS is the all-in-one platform to manage your tasks, notes, and finances with the power of an intelligent AI assistant.
            </p>
            <div className="mt-10">
              <Button size="lg" onClick={loginWithGoogle}>
                <LogIn className="mr-2" />
                Get Started with Google
              </Button>
            </div>
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
              {features.map((feature, index) => (
                <div key={feature.name} className="flex flex-col overflow-hidden rounded-lg bg-card shadow-lg">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-64 w-full object-cover"
                      src={feature.image.src}
                      alt={feature.name}
                      width={600}
                      height={400}
                      data-ai-hint={feature.image.hint}
                    />
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
                        Start Your Journey for Free
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

'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AppSidebar from '@/components/shared/AppSidebar';
import MobileNav from '@/components/shared/MobileNav';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SettingsProvider } from '@/contexts/SettingsContext';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      redirect('/');
    }
  }, [user, loading]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <SettingsProvider>
      <SidebarProvider>
        <Sidebar className="hidden md:block">
          <AppSidebar />
        </Sidebar>
        <SidebarInset>
          {children}
        </SidebarInset>
        <MobileNav />
      </SidebarProvider>
    </SettingsProvider>
  );
}

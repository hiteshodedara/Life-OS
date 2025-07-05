import AppSidebar from '@/components/shared/AppSidebar';
import MobileNav from '@/components/shared/MobileNav';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SettingsProvider } from '@/contexts/SettingsContext';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

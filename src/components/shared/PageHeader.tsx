import type { ReactNode } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export default function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between mb-8">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <div className="grid gap-1">
          <h1 className="text-2xl md:text-3xl font-bold font-headline tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      </div>
      {actions && <div className="flex w-full items-center justify-end gap-2 md:w-auto">{actions}</div>}
    </div>
  );
}

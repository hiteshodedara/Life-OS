'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, Wallet, CheckSquare, FileText, Bot, LifeBuoy, Settings, PanelLeft } from 'lucide-react'
import { useSidebar } from "@/components/ui/sidebar"

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

const menuItems = [
  { href: '/assistant', label: 'Assistant', icon: Sparkles },
  { href: '/expenses', label: 'Expenses', icon: Wallet },
  { href: '/todos', label: 'To-Do', icon: CheckSquare },
  { href: '/notes', label: 'Notes', icon: FileText },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary">
                <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold font-headline group-data-[collapsible=icon]:hidden">Life OS</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  tooltip={item.label}
                  isActive={pathname.startsWith(item.href)}
                  asChild
                >
                  <a>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2" />
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => toggleSidebar()} tooltip="Collapse">
                    <PanelLeft />
                    <span>Collapse</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Help & Support">
                    <LifeBuoy />
                    <span>Help & Support</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Settings">
                    <Settings />
                    <span>Settings</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}

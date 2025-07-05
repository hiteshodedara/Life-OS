
'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Sparkles, CreditCard, ClipboardList, Notebook, Bot, LifeBuoy, Settings, PanelLeft, LogOut } from 'lucide-react'
import { useSidebar } from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/AuthContext"

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"

const mainMenuItems = [
  { href: '/assistant', label: 'Assistant', icon: Sparkles },
  { href: '/expenses', label: 'Expenses', icon: CreditCard },
  { href: '/todos', label: 'To-Do', icon: ClipboardList },
  { href: '/notes', label: 'Notes', icon: Notebook },
]

const utilityMenuItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/help', label: 'Help & Support', icon: LifeBuoy },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const { toggleSidebar } = useSidebar();
  const { userProfile, logout } = useAuth();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-primary">
                <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold font-headline group-data-[collapsible=icon]:hidden">Life OS</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {mainMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                tooltip={item.label}
                isActive={pathname.startsWith(item.href)}
                asChild
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <SidebarMenu>
          {utilityMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                tooltip={item.label}
                isActive={pathname.startsWith(item.href)}
                asChild
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <Separator className="my-2" />
        {userProfile && (
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start items-center gap-2 p-2 h-auto group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:justify-center">
                       <Avatar className="h-8 w-8">
                            {userProfile.photoURL && <AvatarImage src={userProfile.photoURL} alt={userProfile.displayName || 'User'} />}
                            <AvatarFallback>{userProfile.displayName?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start truncate group-data-[collapsible=icon]:hidden">
                            <span className="font-semibold text-sm">{userProfile.displayName}</span>
                            <span className="text-xs text-muted-foreground">{userProfile.email}</span>
                        </div>
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { /* maybe a profile page later */ }}>
                      Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { /* maybe billing page later */ }}>
                      Billing
                  </DropdownMenuItem>
                   <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                  </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Separator className="my-2" />
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => toggleSidebar()} tooltip="Collapse">
                    <PanelLeft />
                    <span>Collapse</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}

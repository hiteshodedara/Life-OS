'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, CreditCard, ClipboardList, Notebook, User } from 'lucide-react'
import { cn } from "@/lib/utils"

const menuItems = [
  { href: '/assistant', label: 'Assistant', icon: Sparkles },
  { href: '/expenses', label: 'Expenses', icon: CreditCard },
  { href: '/todos', label: 'To-Do', icon: ClipboardList },
  { href: '/notes', label: 'Notes', icon: Notebook },
  { href: '/settings', label: 'Profile', icon: User },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <nav className="grid h-16 grid-cols-5 items-center gap-x-1 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1.5 rounded-lg p-2 text-muted-foreground transition-colors hover:text-primary",
              pathname.startsWith(item.href) && "text-primary"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs font-medium text-center">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, Wallet, CheckSquare, FileText, Settings, LifeBuoy } from 'lucide-react'
import { cn } from "@/lib/utils"

const menuItems = [
  { href: '/assistant', label: 'Assistant', icon: Sparkles },
  { href: '/expenses', label: 'Expenses', icon: Wallet },
  { href: '/todos', label: 'To-Do', icon: CheckSquare },
  { href: '/notes', label: 'Notes', icon: FileText },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/help', label: 'Help', icon: LifeBuoy },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <nav className="grid h-16 grid-cols-6 items-center gap-x-2 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname.startsWith(item.href) && "bg-accent text-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium text-center">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

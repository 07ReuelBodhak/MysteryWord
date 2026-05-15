"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/shared/Avatar";

export default function MobileNav({ links }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-zinc-400 hover:text-white transition-colors"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-zinc-950 border-b border-zinc-800 p-4 flex flex-col gap-4 shadow-xl">
          {links.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "p-2 text-sm font-medium rounded-lg transition-colors text-center",
                pathname.startsWith(link.href) ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-zinc-800 w-full" />
          <Link 
            href="/profile" 
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-3 p-2 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg text-sm font-medium transition-colors"
          >
            <Avatar fallback="P" size="sm" />
            Profile
          </Link>
        </div>
      )}
    </>
  );
}

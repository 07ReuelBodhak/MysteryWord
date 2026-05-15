"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/shared/Avatar";
import { cn } from "@/lib/utils";
import MobileNav from "./MobileNav";
import { Gamepad2 } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  
  const links = [
    { href: "/home", label: "Home" },
    { href: "/leaderboard", label: "Leaderboard" }
  ];

  return (
    <nav className="sticky top-0 z-40 w-full h-16 border-b border-neutral-800 px-6 flex items-center justify-between bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/home" className="text-xl font-black tracking-tighter uppercase italic text-white flex items-center gap-2">
            <Gamepad2 className="w-5 h-5" />
            <span>GuessArena</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-[11px] font-bold uppercase tracking-widest transition-colors hover:text-white",
                  pathname.startsWith(link.href) ? "text-white" : "text-neutral-400"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/profile" className="hidden md:flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Rank #42</span>
              <span className="text-sm font-semibold italic text-white">@player_one</span>
            </div>
            <Avatar fallback="P" size="md" className="bg-neutral-800 border-neutral-700 text-neutral-300" />
          </Link>
          <div className="md:hidden">
            <MobileNav links={links} />
          </div>
        </div>
      </div>
    </nav>
  );
}

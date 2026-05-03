"use client";

import Link from "next/link";
import { Zap, Store, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-carbon-black text-white py-6 px-8 sticky top-0 z-50 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-safety-orange rounded-xl flex items-center justify-center text-white font-black italic group-hover:rotate-6 transition-transform">V</div>
          <span className="font-black text-2xl tracking-tighter uppercase italic">VELO<span className="text-safety-orange">DASH</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <NavLink href="/#cities">Cities</NavLink>
          <NavLink href="/shops/claim">For Shops</NavLink>
          <a 
            href="/#booking" 
            className="bg-safety-orange hover:bg-safety-orange-muted text-white px-6 py-3 rounded-premium font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-safety-orange/20"
          >
            Book Slot
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-carbon-black border-b border-white/10 p-8 md:hidden flex flex-col gap-6"
          >
            <MobileNavLink href="/#cities" onClick={() => setIsOpen(false)}>Cities</MobileNavLink>
            <MobileNavLink href="/shops/claim" onClick={() => setIsOpen(false)}>For Shops</MobileNavLink>
            <a 
              href="/#booking" 
              onClick={() => setIsOpen(false)}
              className="bg-safety-orange text-white px-6 py-4 rounded-premium font-black uppercase tracking-widest text-center"
            >
              Book Slot Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-xs font-black uppercase tracking-[0.2em] text-slate-medium hover:text-safety-orange transition-colors">
      {children}
    </a>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <a href={href} onClick={onClick} className="text-xl font-black uppercase tracking-tighter italic hover:text-safety-orange transition-colors border-b border-white/5 pb-4">
      {children}
    </a>
  );
}

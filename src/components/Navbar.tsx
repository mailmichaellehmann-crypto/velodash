"use client";

import Link from "next/link";
import { Zap, Store, Menu, X, Bike } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md text-slate-900 py-5 px-6 sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-blue-electric rounded-lg flex items-center justify-center text-white transition-transform group-hover:rotate-12">
            <Bike className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight italic">Velo<span className="text-blue-electric">Dash</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/#cities">Cities</NavLink>
          <NavLink href="/shops/claim">For Shops</NavLink>
          <Link 
            href="/#booking" 
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all shadow-sm"
          >
            Find a Slot
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-slate-500" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 md:hidden flex flex-col gap-4 overflow-hidden"
          >
            <MobileNavLink href="/#cities" onClick={() => setIsOpen(false)}>Cities</MobileNavLink>
            <MobileNavLink href="/shops/claim" onClick={() => setIsOpen(false)}>For Shops</MobileNavLink>
            <Link 
              href="/#booking" 
              onClick={() => setIsOpen(false)}
              className="bg-blue-electric text-white px-6 py-4 rounded-xl font-bold text-center"
            >
              Book Slot Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm font-medium text-slate-500 hover:text-blue-electric transition-colors">
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="text-lg font-semibold text-slate-900 border-b border-slate-50 pb-2">
      {children}
    </Link>
  );
}

"use client";

import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface CityHeroProps {
  city: string;
  headline: ReactNode;
  subtext: string;
}

export default function CityHero({ city, headline, subtext }: CityHeroProps) {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-white">
      {/* Decorative colored blobs */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-electric/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-green-lime/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-electric/10 text-blue-electric text-xs font-bold tracking-wider uppercase mb-8 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-electric opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-electric"></span>
              </span>
              Express in {city}
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 leading-[1] tracking-tight">
              {headline}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl leading-relaxed font-medium">
              {subtext}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="#booking"
                className="bg-blue-electric hover:bg-blue-electric-hover text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-blue-electric/25 flex items-center justify-center gap-2 hover-lift"
              >
                Slot buchen <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="#how-it-works"
                className="bg-slate-50 hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-2xl text-lg font-bold transition-all flex items-center justify-center"
              >
                Mehr erfahren
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface CityHeroProps {
  city: string;
  headline: string;
  subtext: string;
}

export default function CityHero({ city, headline, subtext }: CityHeroProps) {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-carbon-black text-white">
      {/* Decorative background elements for asymmetrical look */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-safety-orange/5 -skew-x-12 transform translate-x-20 z-0" />
      
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-3 py-1 bg-safety-orange/20 text-safety-orange text-sm font-bold tracking-widest uppercase mb-6 rounded">
              {city} EXPRESS
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
              {headline.split(' ').map((word, i) => (
                <span key={i} className={word.toLowerCase() === 'express' ? 'text-safety-orange' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-xl md:text-2xl text-slate-medium mb-10 max-w-xl leading-relaxed">
              {subtext}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#booking"
                className="bg-safety-orange hover:bg-safety-orange-muted text-white px-10 py-5 rounded-premium text-lg font-bold transition-all shadow-2xl shadow-safety-orange/20 flex items-center justify-center gap-2"
              >
                Slot reservieren <ChevronRight className="w-5 h-5" />
              </motion.a>
              <a 
                href="#how-it-works"
                className="bg-transparent border border-white/20 hover:border-white/40 text-white px-10 py-5 rounded-premium text-lg font-bold transition-all flex items-center justify-center"
              >
                Wie es funktioniert
              </a>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden premium-shadow border-4 border-slate-dark/50">
              <img
                src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800"
                alt="Premium Bike Repair"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating stats card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 glass-effect p-6 rounded-2xl premium-shadow"
            >
              <div className="text-safety-orange font-black text-3xl">98%</div>
              <div className="text-xs uppercase tracking-wider text-slate-medium">Zufriedenheit in {city}</div>
            </motion.div>
          </motion.div>
          
          {/* Background decorative square */}
          <div className="absolute -top-10 -right-10 w-64 h-64 border-2 border-safety-orange/30 rounded-full z-0 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

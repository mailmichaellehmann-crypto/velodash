"use client";

import { motion } from "framer-motion";

interface CityHeroProps {
  city: string;
  headline: string;
  subtext: string;
}

export default function CityHero({ city, headline, subtext }: CityHeroProps) {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20 z-10" />
        <img
          src="/hero-bike.jpg" // Placeholder or dynamic based on city
          alt={`Fahrrad Reparatur in ${city}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
        >
          {headline}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-200 mb-8 font-light"
        >
          {subtext}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <a 
            href="#booking"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/20"
          >
            Express Slot Buchen
          </a>
        </motion.div>
      </div>
    </section>
  );
}

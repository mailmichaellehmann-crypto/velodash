"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call would go here
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 p-8 rounded-2xl text-center"
      >
        <h3 className="text-xl font-bold text-green-800 mb-2">Vielen Dank!</h3>
        <p className="text-green-700">Wir benachrichtigen dich, sobald VeloDash in deiner Region verfügbar ist.</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">VeloDash noch nicht in deiner Stadt?</h3>
      <p className="text-slate-600 mb-6">Stimme für dein Viertel ab! Wir kommen dorthin, wo der Bedarf am größten ist.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Postleitzahl"
            required
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="email"
            placeholder="Deine E-Mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-slate-900 hover:bg-black text-white py-4 rounded-xl font-bold transition-colors"
        >
          Für meine Stadt abstimmen
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Users, Send, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (zipCode.length === 5) {
      fetch(`/api/waitlist?zipCode=${zipCode}`)
        .then(res => res.json())
        .then(data => {
          if (data.count !== undefined) setCount(data.count);
        })
        .catch(err => console.error('Error fetching count:', err));
    } else {
      setCount(null);
    }
  }, [zipCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, zipCode }),
      });

      const result = await res.json();

      if (res.ok) {
        setSubmitted(true);
        if (result.count !== undefined) setCount(result.count);
      } else {
        setError(result.message || "Etwas ist schief gelaufen.");
      }
    } catch (err) {
      setError("Verbindung fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-lime/10 p-12 rounded-[2.5rem] text-center border-2 border-green-lime/20"
      >
        <div className="w-20 h-20 bg-white text-green-lime rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-lime/10">
          <Send className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-4">You're in!</h3>
        <p className="text-slate-500 font-medium mb-8">Wir melden uns, sobald wir in <span className="text-green-lime font-bold">{zipCode}</span> live gehen.</p>
        
        {count !== null && (
          <div className="inline-flex items-center gap-2 text-green-lime text-xs font-black uppercase tracking-widest bg-white px-5 py-2.5 rounded-full shadow-sm">
            <Users className="w-4 h-4" />
            {count} people waiting here
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="bg-slate-50 p-12 rounded-[2.5rem] border border-slate-100 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-md">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Deine Stadt fehlt?</h3>
            <p className="text-slate-500 font-medium text-lg leading-relaxed text-balance">
              Wir expandieren schnell. Stimme jetzt für dein Viertel ab und wir kommen früher zu dir.
            </p>
          </div>
          
          <AnimatePresence>
            {count !== null && count > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-indigo-vibrant text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg"
              >
                <Users className="w-4 h-4" />
                {count} Waiting
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="PLZ"
              required
              pattern="[0-9]{5}"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
              className="w-full px-6 py-5 bg-white rounded-2xl border-2 border-transparent focus:border-blue-electric outline-none transition-all font-bold text-slate-900 shadow-sm placeholder:text-slate-300"
            />
            <input
              type="email"
              placeholder="E-Mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-5 bg-white rounded-2xl border-2 border-transparent focus:border-blue-electric outline-none transition-all font-bold text-slate-900 shadow-sm placeholder:text-slate-300"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || zipCode.length !== 5}
            className="bg-blue-electric hover:bg-blue-electric-hover text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-blue-electric/20"
          >
            {loading ? "..." : <><span className="hidden md:inline">Voten</span> <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>
        
        {error && <p className="text-accent-coral text-xs font-black uppercase mt-4">{error}</p>}
      </div>
    </div>
  );
}

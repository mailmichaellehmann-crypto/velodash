"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Users, Send, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch count when zipCode is 5 digits (German PLZ length)
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
      setError("Verbindung zum Server fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-carbon-black p-10 rounded-[2rem] text-center premium-shadow border-4 border-safety-orange/20"
      >
        <div className="w-20 h-20 bg-safety-orange/10 text-safety-orange rounded-full flex items-center justify-center mx-auto mb-6">
          <Send className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-black text-white tracking-tighter mb-4">Erfolgreich eingetragen!</h3>
        <p className="text-slate-medium font-medium mb-8">Du wirst sofort benachrichtigt, sobald wir in <span className="text-safety-orange font-bold">{zipCode}</span> starten.</p>
        
        {count !== null && (
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-safety-orange text-sm font-black uppercase tracking-widest">
            <Users className="w-5 h-5" />
            {count} BIKER WARTEN IN DIESER ZONE
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-10 rounded-[2rem] premium-shadow border border-slate-light relative overflow-hidden group">
      {/* Decorative orange corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-safety-orange/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl group-hover:bg-safety-orange/10 transition-colors" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-3xl font-black text-carbon-black tracking-tighter mb-2">Deine Stadt fehlt?</h3>
            <p className="text-slate-medium font-medium max-w-sm">Gib uns Bescheid. Wir expandieren dorthin, wo der Bedarf brennt.</p>
          </div>
          <AnimatePresence>
            {count !== null && count > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-safety-orange text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg"
              >
                <Users className="w-4 h-4" />
                {count} Waiting
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group/input">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-medium w-5 h-5 transition-colors group-focus-within/input:text-safety-orange" />
              <input
                type="text"
                placeholder="PLZ (z.B. 10115)"
                required
                pattern="[0-9]{5}"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                className="w-full pl-12 pr-4 py-5 bg-slate-light rounded-premium border-2 border-transparent focus:border-safety-orange focus:bg-white outline-none transition-all font-bold tracking-tight text-carbon-black"
              />
            </div>
            <div className="relative group/input">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-medium w-5 h-5 transition-colors group-focus-within/input:text-safety-orange" />
              <input
                type="email"
                placeholder="E-Mail Adresse"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-5 bg-slate-light rounded-premium border-2 border-transparent focus:border-safety-orange focus:bg-white outline-none transition-all font-bold tracking-tight text-carbon-black"
              />
            </div>
          </div>
          
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs font-black uppercase tracking-widest"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading || zipCode.length !== 5}
            className="w-full bg-carbon-black hover:bg-slate-dark text-white py-6 rounded-premium font-black uppercase tracking-[0.2em] text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl"
          >
            {loading ? "Wird verarbeitet..." : (
              <>
                Abstimmen <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

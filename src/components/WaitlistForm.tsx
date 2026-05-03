"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Users } from "lucide-react";

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
      const res = await fetch(\"/api/waitlist\", {
        method: \"POST\",
        headers: { \"Content-Type\": \"application/json\" },
        body: JSON.stringify({ email, zipCode }),
      });

      const result = await res.json();

      if (res.ok) {
        setSubmitted(true);
        if (result.count !== undefined) setCount(result.count);
      } else {
        setError(result.message || \"Etwas ist schief gelaufen.\");
      }
    } catch (err) {
      setError(\"Verbindung zum Server fehlgeschlagen.\");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className=\"bg-green-50 border border-green-200 p-8 rounded-2xl text-center\"
      >
        <h3 className=\"text-xl font-bold text-green-800 mb-2\">Vielen Dank!</h3>
        <p className=\"text-green-700\">Du bist nun auf der Warteliste für ${zipCode}.</p>
        {count !== null && (
          <div className=\"mt-4 inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full text-green-800 text-sm font-bold\">
            <Users className=\"w-4 h-4\" />
            {count} Personen warten bereits in diesem Bereich!
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <div className=\"bg-slate-50 border border-slate-200 p-8 rounded-2xl relative overflow-hidden\">
      <AnimatePresence>
        {count !== null && count > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className=\"absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg z-10\"
          >
            <Users className=\"w-3 h-3\" />
            {count} Warten
          </motion.div>
        )}
      </AnimatePresence>

      <h3 className=\"text-2xl font-bold text-slate-900 mb-4 text-left\">VeloDash noch nicht in deiner Stadt?</h3>
      <p className=\"text-slate-600 mb-6 text-left\">Stimme für dein Viertel ab! Wir kommen dorthin, wo der Bedarf am größten ist.</p>
      
      <form onSubmit={handleSubmit} className=\"space-y-4\">
        <div className=\"relative\">
          <MapPin className=\"absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5\" />
          <input
            type=\"text\"
            placeholder=\"Postleitzahl (z.B. 10115)\"
            required
            pattern=\"[0-9]{5}\"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
            className=\"w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all\"
          />
        </div>
        <div className=\"relative\">
          <Mail className=\"absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5\" />
          <input
            type=\"email\"
            placeholder=\"Deine E-Mail Adresse\"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=\"w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all\"
          />
        </div>
        
        {error && (
          <p className=\"text-red-500 text-sm font-medium\">{error}</p>
        )}

        <button
          type=\"submit\"
          disabled={loading || zipCode.length !== 5}
          className=\"w-full bg-slate-900 hover:bg-black text-white py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2\"
        >
          {loading ? \"Wird gesendet...\" : \"Für meine Stadt abstimmen\"}
        </button>
      </form>
    </div>
  );
}

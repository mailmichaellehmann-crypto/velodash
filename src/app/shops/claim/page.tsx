"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Store, 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  Sparkles,
  Bike,
  Users
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShopClaim() {
  const [revenue, setRevenue] = useState(2500);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-lime/10 text-green-lime rounded-full text-xs font-black uppercase tracking-widest mb-10">
            <TrendingUp className="w-4 h-4" /> Partner Program
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-10 max-w-5xl mx-auto">
            Füll deine Werkstatt <br />
            <span className="text-green-lime italic">per Knopfdruck.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
            Schließe dich dem VeloDash Netzwerk an und erhalte automatisch hochprofitable Express-Buchungen direkt auf dein Handy.
          </p>
        </div>
      </section>

      {/* Revenue Calculator */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto bg-white rounded-[4rem] p-8 md:p-20 border border-slate-100 shadow-2xl shadow-slate-200/50 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-6">Wie viel Umsatz entgeht dir?</h2>
                <p className="text-slate-500 font-medium text-lg leading-relaxed">
                  VeloDash Nutzer sind bereit, Premium-Preise für Schnelligkeit zu zahlen. Berechne dein monatliches Potenzial.
                </p>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between font-black uppercase tracking-widest text-xs text-slate-400">
                    <span>Leere Slots pro Woche</span>
                    <span className="text-green-lime">{revenue / 250} Slots</span>
                  </div>
                  <input 
                    type="range" 
                    min="500" 
                    max="10000" 
                    step="500"
                    value={revenue}
                    onChange={(e) => setRevenue(parseInt(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-green-lime"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">Potenzial / Monat</p>
                    <h4 className="text-3xl font-black text-slate-900">+{revenue}€</h4>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">Neue Kunden</p>
                    <h4 className="text-3xl font-black text-slate-900">+{Math.floor(revenue/80)}</h4>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-lime p-12 rounded-[3rem] text-white space-y-10 relative overflow-hidden">
               <Sparkles className="absolute -bottom-12 -right-12 w-64 h-64 opacity-10" />
               <h3 className="text-3xl font-black tracking-tight">Kostenlos starten</h3>
               
               <form className="space-y-4 relative z-10" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="text" 
                    placeholder="Name der Werkstatt" 
                    className="w-full px-8 py-5 bg-white/10 border-2 border-white/20 rounded-2xl placeholder:text-white/50 font-bold outline-none focus:border-white transition-all"
                  />
                  <input 
                    type="email" 
                    placeholder="E-Mail Adresse" 
                    className="w-full px-8 py-5 bg-white/10 border-2 border-white/20 rounded-2xl placeholder:text-white/50 font-bold outline-none focus:border-white transition-all"
                  />
                  <button className="w-full bg-white text-green-lime py-6 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-green-lime/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                    Shop beanspruchen <ArrowRight className="w-5 h-5" />
                  </button>
               </form>

               <div className="flex items-center gap-4 text-sm font-bold opacity-80 pt-4">
                  <CheckCircle2 className="w-5 h-5" /> Keine Grundgebühr. Nur bei Erfolg.
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-blue-electric text-white rounded-[1.5rem] flex items-center justify-center">
                <Zap className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Express Dashboard</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Steuere deine Verfügbarkeit mit einem Klick. Schalte 'Express' ein, wenn du Leerlauf hast.</p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 bg-indigo-vibrant text-white rounded-[1.5rem] flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Premium Klientel</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Erreiche kaufkräftige Pendler und E-Bike Fahrer, die Wert auf Qualität und Zeit legen.</p>
            </div>
            <div className="space-y-6">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] flex items-center justify-center">
                <Bike className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Automatische Payouts</h3>
              <p className="text-slate-500 font-medium leading-relaxed">Sichere Zahlungsabwicklung via Stripe. Dein Geld landet automatisch auf deinem Konto.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer city="Merchant Edition" />
    </main>
  );
}

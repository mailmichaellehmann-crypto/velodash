"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight,
  Calculator,
  Zap,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShopClaimPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    shopName: "",
    address: "",
    phone: "",
    email: ""
  });

  const [simulatedRevenue, setSimulatedRevenue] = useState(2450);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => Math.max(0, s - 1));

  return (
    <main className="min-h-screen bg-slate-light text-carbon-black font-sans">
      {/* Premium Header */}
      <header className="bg-carbon-black text-white py-6 px-8 sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-safety-orange rounded-xl flex items-center justify-center text-white font-black italic">V</div>
            <span className="font-black text-2xl tracking-tighter uppercase italic">VELO<span className="text-safety-orange">DASH</span> <span className="text-white/40 not-italic ml-2 text-sm uppercase tracking-[0.2em]">Partner</span></span>
          </div>
          <a href="/" className="text-xs font-black uppercase tracking-widest text-slate-medium hover:text-safety-orange transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Zurück
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto py-20 px-6">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              <div className="max-w-3xl">
                <span className="inline-block px-4 py-2 bg-safety-orange/10 text-safety-orange text-xs font-black tracking-[0.3em] uppercase mb-8 rounded">
                  Merchant Acquisition
                </span>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-10 italic uppercase">
                  DEINE WERKSTATT, <br />UNSER <span className="text-safety-orange">SPEED.</span>
                </h1>
                <p className="text-2xl text-slate-medium font-medium leading-relaxed max-w-2xl">
                  VeloDash verbindet Premium-Fahrradläden mit Kunden, die sofortige Express-Reparaturen suchen. Optimiere deine Auslastung und steigere den Umsatz pro Quadratmeter.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "MAX Umsatz", text: "Zusätzliche Buchungen durch exklusive Express-Slots.", icon: TrendingUp },
                  { title: "ZERO Aufwand", text: "Vollautomatisches Dashboard & Buchungsmanagement.", icon: CheckCircle2 },
                  { title: "SMART Payout", text: "Automatisierte Payouts via Stripe Connect Integration.", icon: Zap },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-10 rounded-[2rem] premium-shadow border border-slate-light group hover:border-safety-orange transition-all duration-500">
                    <div className="w-16 h-16 bg-carbon-black text-safety-orange rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-6">
                      <item.icon className="w-8 h-8 fill-current" />
                    </div>
                    <h3 className="font-black text-carbon-black tracking-tighter mb-4 uppercase italic text-2xl">{item.title}</h3>
                    <p className="text-slate-medium font-medium leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-10">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  className="bg-safety-orange hover:bg-safety-orange-muted text-white px-16 py-8 rounded-premium text-2xl font-black uppercase tracking-tighter transition-all shadow-2xl shadow-safety-orange/40 flex items-center gap-4 italic"
                >
                  Werkstatt claimen <ChevronRight className="w-8 h-8" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
            >
              <div className="lg:col-span-7 bg-white p-12 rounded-[2.5rem] premium-shadow border border-slate-light">
                <h2 className="text-4xl font-black text-carbon-black tracking-tighter mb-10 italic uppercase">Onboarding</h2>
                <form className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-medium uppercase tracking-[0.2em] ml-1">Werkstatt Name</label>
                    <div className="relative group">
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-medium w-6 h-6 group-focus-within:text-safety-orange transition-colors" />
                      <input 
                        type="text" 
                        placeholder="z.B. RadHaus Berlin" 
                        className="w-full pl-14 pr-4 py-6 bg-slate-light rounded-premium border-2 border-transparent focus:border-safety-orange focus:bg-white outline-none transition-all font-bold text-lg"
                        value={formData.shopName}
                        onChange={(e) => setFormData({...formData, shopName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-medium uppercase tracking-[0.2em] ml-1">Standort</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-medium w-6 h-6 group-focus-within:text-safety-orange transition-colors" />
                      <input 
                        type="text" 
                        placeholder="Straße, PLZ, Stadt" 
                        className="w-full pl-14 pr-4 py-6 bg-slate-light rounded-premium border-2 border-transparent focus:border-safety-orange focus:bg-white outline-none transition-all font-bold text-lg"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-medium uppercase tracking-[0.2em] ml-1">Telefon</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-medium w-6 h-6 group-focus-within:text-safety-orange transition-colors" />
                        <input 
                          type="tel" 
                          placeholder="+49 ..." 
                          className="w-full pl-14 pr-4 py-6 bg-slate-light rounded-premium border-2 border-transparent focus:border-safety-orange focus:bg-white outline-none transition-all font-bold text-lg"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-medium uppercase tracking-[0.2em] ml-1">E-Mail</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-medium w-6 h-6 group-focus-within:text-safety-orange transition-colors" />
                        <input 
                          type="email" 
                          placeholder="shop@beispiel.de" 
                          className="w-full pl-14 pr-4 py-6 bg-slate-light rounded-premium border-2 border-transparent focus:border-safety-orange focus:bg-white outline-none transition-all font-bold text-lg"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    type="button"
                    onClick={nextStep}
                    disabled={!formData.shopName || !formData.email}
                    className="w-full bg-carbon-black text-white py-6 rounded-premium font-black uppercase tracking-[0.2em] text-lg hover:bg-slate-dark transition-all shadow-xl mt-6 disabled:opacity-50"
                  >
                    Profil verifizieren
                  </button>
                </form>
              </div>

              <div className="lg:col-span-5 space-y-8">
                <div className="bg-carbon-black p-10 rounded-[2.5rem] text-white premium-shadow border-4 border-safety-orange/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-safety-orange/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl" />
                  
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-safety-orange/10 text-safety-orange rounded-2xl">
                      <Calculator className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter italic uppercase">Einnahmen Schätzung</h3>
                  </div>
                  <p className="text-slate-medium font-medium mb-8 leading-relaxed">
                    Basierend auf der lokalen Nachfrage in deiner Zone verpasst du aktuell signifikanten Umsatz.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-8 rounded-premium text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-medium mb-2">Monatliches Potential</p>
                    <p className="text-5xl font-black tracking-tighter text-safety-orange italic">+ {simulatedRevenue},00 €</p>
                    <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-black uppercase tracking-widest text-white/40">
                      <Zap className="w-3 h-3 fill-safety-orange text-safety-orange" /> Real-time Demand Data
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[2rem] border border-slate-light">
                  <h4 className="text-[10px] font-black text-slate-medium uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Profil Vorschau
                  </h4>
                  <div className="border-2 border-slate-light rounded-premium p-6 flex gap-6 items-center italic">
                    <div className="w-16 h-16 bg-carbon-black text-safety-orange rounded-2xl flex items-center justify-center font-black text-2xl">
                      {formData.shopName ? formData.shopName[0].toUpperCase() : 'W'}
                    </div>
                    <div>
                      <p className="text-xl font-black text-carbon-black tracking-tighter uppercase">{formData.shopName || "Deine Werkstatt"}</p>
                      <p className="text-[10px] font-bold text-slate-medium uppercase tracking-widest mt-1">{formData.address || "Adresse angeben"}</p>
                      <div className="flex gap-1 mt-2">
                        {[1,2,3,4,5].map(s => <div key={s} className="w-4 h-4 bg-safety-orange rounded-full" />)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-16 rounded-[3rem] premium-shadow border border-slate-light text-center max-w-3xl mx-auto relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2 bg-safety-orange" />
              
              <div className="w-24 h-24 bg-carbon-black text-safety-orange rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl rotate-3">
                <Zap className="w-12 h-12 fill-current" />
              </div>
              
              <h2 className="text-5xl font-black text-carbon-black tracking-tighter mb-6 italic uppercase">Ready for Takeoff?</h2>
              <p className="text-xl text-slate-medium font-medium mb-12 leading-relaxed max-w-xl mx-auto">
                VeloDash nutzt <span className="text-carbon-black font-black italic">Stripe Connect</span> für blitzschnelle, sichere Auszahlungen. 25% Kommission — keine versteckten Kosten.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-slate-light p-8 rounded-premium text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-medium mb-2 italic">Auszahlungs-Zyklus</p>
                  <p className="text-2xl font-black tracking-tighter text-carbon-black uppercase italic">Wöchentlich</p>
                </div>
                <div className="bg-slate-light p-8 rounded-premium text-left">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-medium mb-2 italic">Partner Gebühr</p>
                  <p className="text-2xl font-black tracking-tighter text-carbon-black uppercase italic">25% Revenue</p>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => alert("Redirecting to Stripe Connect...")}
                className="w-full bg-safety-orange text-white py-8 rounded-premium font-black uppercase tracking-[0.2em] text-xl hover:bg-safety-orange-muted transition-all shadow-2xl shadow-safety-orange/30 flex items-center justify-center gap-4 italic"
              >
                Stripe verknüpfen <ChevronRight className="w-8 h-8" />
              </motion.button>
              
              <div className="mt-10 flex items-center justify-center gap-3 grayscale opacity-40">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" className="h-8" />
                <span className="text-[10px] font-black uppercase tracking-widest text-carbon-black border-l border-carbon-black pl-3 italic">Secure Partner</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step > 0 && (
        <div className="max-w-6xl mx-auto px-6 pb-20">
          <button 
            onClick={prevStep}
            className="flex items-center gap-2 text-slate-medium hover:text-carbon-black transition-colors font-black uppercase tracking-widest text-xs italic"
          >
            <ArrowLeft className="w-4 h-4" /> Zurück
          </button>
        </div>
      )}
    </main>
  );
}

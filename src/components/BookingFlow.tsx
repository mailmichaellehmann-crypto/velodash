"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bike, ChevronRight, ChevronLeft, Clock, CheckCircle2, Zap } from "lucide-react";
import SlotPicker from "./SlotPicker";
import { cn } from "@/lib/utils";

const STEPS = ["Bike", "Problem", "Schätzung", "Termin", "Check"];

const BIKE_TYPES = [
  { id: "rennrad", name: "Rennrad", icon: Bike },
  { id: "mtb", name: "Mountainbike", icon: Bike },
  { id: "ebike", name: "E-Bike", icon: Bike },
  { id: "trekking", name: "Trekkingrad", icon: Bike },
];

const PROBLEMS = [
  { id: "chain", name: "Kette wechseln / schmieren" },
  { id: "brakes", name: "Bremsen einstellen / Beläge" },
  { id: "tire", name: "Reifen / Schlauch wechseln" },
  { id: "gears", name: "Schaltung einstellen" },
  { id: "other", name: "Sonstiges Problem" },
];

export default function BookingFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    bikeType: "",
    problem: "",
    problemDetails: "",
    slotId: "",
  });

  // Mock slots
  const mockSlots = [
    { id: "1", starts_at: new Date(Date.now() + 3600000).toISOString(), is_express: true },
    { id: "2", starts_at: new Date(Date.now() + 7200000).toISOString(), is_express: true },
    { id: "3", starts_at: new Date(Date.now() + 86400000).toISOString(), is_express: false },
    { id: "4", starts_at: new Date(Date.now() + 90000000).toISOString(), is_express: false },
  ];

  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div id="booking" className="max-w-4xl mx-auto py-20 px-6">
      <div className="flex justify-between items-center mb-16 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10" />
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-col items-center bg-background px-4">
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 border-2",
                step >= i 
                  ? "bg-safety-orange border-safety-orange text-white scale-110 shadow-lg shadow-safety-orange/20" 
                  : "bg-white border-slate-200 text-slate-400"
              )}
            >
              {i + 1}
            </div>
            <span className={cn(
              "text-[10px] uppercase tracking-[0.2em] font-black mt-3 transition-colors", 
              step >= i ? "text-carbon-black" : "text-slate-400"
            )}>
              {s}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] premium-shadow border border-slate-dark/5 p-10 min-h-[500px] relative overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-safety-orange/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-black text-carbon-black tracking-tighter mb-2">Welches Bike?</h2>
                <p className="text-slate-medium font-medium">Wähle deinen Fahrradtyp aus.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {BIKE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => { setData({...data, bikeType: type.id}); nextStep(); }}
                    className={cn(
                      "p-8 rounded-premium border-2 flex flex-col items-center gap-4 transition-all group",
                      data.bikeType === type.id 
                        ? "border-safety-orange bg-safety-orange/5 text-safety-orange" 
                        : "border-slate-light bg-slate-light hover:border-slate-medium text-slate-medium"
                    )}
                  >
                    <type.icon className={cn("w-12 h-12 transition-transform group-hover:scale-110", data.bikeType === type.id ? "text-safety-orange" : "text-carbon-black")} />
                    <span className="font-black uppercase tracking-tighter text-sm">{type.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-black text-carbon-black tracking-tighter mb-2">Das Problem?</h2>
                <p className="text-slate-medium font-medium">Was genau müssen wir reparieren?</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {PROBLEMS.map((prob) => (
                  <button
                    key={prob.id}
                    onClick={() => { setData({...data, problem: prob.id}); nextStep(); }}
                    className={cn(
                      "w-full p-6 rounded-premium border-2 text-left transition-all flex justify-between items-center group",
                      data.problem === prob.id 
                        ? "border-safety-orange bg-safety-orange/5" 
                        : "border-slate-light bg-slate-light hover:border-slate-medium"
                    )}
                  >
                    <span className={cn("font-black uppercase tracking-tighter", data.problem === prob.id ? "text-safety-orange" : "text-carbon-black")}>
                      {prob.name}
                    </span>
                    <ChevronRight className={cn("w-6 h-6 transition-transform group-hover:translate-x-1", data.problem === prob.id ? "text-safety-orange" : "text-slate-medium")} />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12 text-center py-10"
            >
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-safety-orange/10 text-safety-orange rounded-full flex items-center justify-center mx-auto relative z-10">
                  <Clock className="w-16 h-16 animate-pulse" />
                </div>
                <div className="absolute top-0 right-0 w-8 h-8 bg-carbon-black rounded-full flex items-center justify-center border-4 border-white z-20">
                  <Zap className="w-4 h-4 text-safety-orange fill-current" />
                </div>
              </div>
              
              <div>
                <div className="text-sm font-black uppercase tracking-[0.3em] text-safety-orange mb-2">AI Schätzung</div>
                <h2 className="text-6xl font-black text-carbon-black tracking-tighter mb-4">~ 45 Min</h2>
                <p className="text-slate-medium text-xl max-w-sm mx-auto leading-relaxed">
                  Basierend auf deinem <span className="text-carbon-black font-bold">{data.bikeType}</span> & dem <span className="text-carbon-black font-bold">{PROBLEMS.find(p => p.id === data.problem)?.name}</span>.
                </p>
              </div>

              <div className="bg-carbon-black text-white p-8 rounded-premium flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-left">
                  <div className="text-slate-medium text-xs font-black uppercase tracking-widest mb-1">Fixpreis inkl. Express</div>
                  <div className="text-4xl font-black tracking-tighter">59,00 €</div>
                </div>
                <button 
                  onClick={nextStep}
                  className="w-full md:w-auto bg-safety-orange hover:bg-safety-orange-muted text-white px-12 py-5 rounded-premium font-black uppercase tracking-tighter text-lg transition-all shadow-xl shadow-safety-orange/30"
                >
                  Slot finden
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-black text-carbon-black tracking-tighter mb-2">Dein Termin?</h2>
                <p className="text-slate-medium font-medium">Wähle einen verfügbaren Express Slot.</p>
              </div>
              <SlotPicker 
                slots={mockSlots} 
                selectedSlotId={data.slotId}
                onSelect={(id) => { setData({...data, slotId: id}); nextStep(); }}
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-10 text-center py-6"
            >
              <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20">
                <CheckCircle2 className="w-14 h-14" />
              </div>
              
              <div>
                <h2 className="text-5xl font-black text-carbon-black tracking-tighter mb-2">Check & Go</h2>
                <p className="text-slate-medium font-bold uppercase tracking-widest text-sm">Berlin-Mitte Station</p>
              </div>

              <div className="bg-slate-light p-8 rounded-premium space-y-4 text-left border-l-8 border-safety-orange">
                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-medium">Service</span>
                  <span className="font-black tracking-tighter text-carbon-black">{PROBLEMS.find(p => p.id === data.problem)?.name}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-medium">Zeitpunkt</span>
                  <span className="font-black tracking-tighter text-carbon-black">Heute, 14:30 Uhr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-medium">Total</span>
                  <span className="text-3xl font-black tracking-tighter text-safety-orange">59,00 €</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => alert("Weiterleitung zu Stripe...")}
                  className="bg-carbon-black text-white py-6 rounded-premium font-black uppercase tracking-widest text-lg hover:bg-slate-dark transition-all shadow-xl"
                >
                  Jetzt bezahlen
                </button>
                <div className="bg-white border-2 border-slate-light p-4 rounded-premium flex items-center gap-3 text-left">
                  <div className="p-2 bg-safety-orange/10 rounded-lg text-safety-orange">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-medium leading-tight">
                    Durch die Buchung reservierst du einen <span className="text-carbon-black">EXPRESS SLOT</span>. Bezahlung erfolgt sicher via Stripe.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step > 0 && step < 4 && (
        <button 
          onClick={prevStep}
          className="mt-8 flex items-center gap-2 text-slate-medium hover:text-carbon-black transition-colors font-black uppercase tracking-widest text-xs"
        >
          <ChevronLeft className="w-4 h-4" /> Zurück
        </button>
      )}
    </div>
  );
}

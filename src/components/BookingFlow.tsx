"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bike, Wrench, Calendar, CheckCircle2, ChevronRight, ArrowRight, Zap, Sparkles } from "lucide-react";
import SlotPicker from "./SlotPicker";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 'bike', label: 'Bike', icon: Bike, color: 'bg-blue-electric' },
  { id: 'problem', label: 'Service', icon: Wrench, color: 'bg-green-lime' },
  { id: 'slot', label: 'Slot', icon: Calendar, color: 'bg-indigo-vibrant' },
];

export default function BookingFlow() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    bikeType: "",
    problem: "",
    slotId: ""
  });

  const next = () => setStep(s => Math.min(s + 1, 3));
  const back = () => setStep(s => Math.max(s - 1, 0));

  return (
    <div id="booking" className="max-w-4xl mx-auto py-24 px-6">
      <div className="bg-white rounded-[3rem] p-8 md:p-16 border border-slate-100 soft-shadow relative overflow-hidden">
        {/* Progress Dots */}
        <div className="flex justify-center gap-4 mb-16">
          {STEPS.map((s, idx) => (
            <div 
              key={s.id}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                step === idx ? `w-12 ${s.color}` : "w-2 bg-slate-100"
              )}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div 
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-6">Was fährst du?</h2>
                <p className="text-slate-400 font-bold text-lg uppercase tracking-widest">Wähle deinen Fahrrad-Typ</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {['E-Bike', 'Rennrad', 'City Bike', 'Mountainbike'].map((type) => (
                  <button
                    key={type}
                    onClick={() => { setData({ ...data, bikeType: type }); next(); }}
                    className="group p-8 rounded-[2rem] border-2 border-slate-50 bg-slate-50/50 hover:bg-white hover:border-blue-electric transition-all text-left flex justify-between items-center hover-lift"
                  >
                    <span className="text-2xl font-bold text-slate-900">{type}</span>
                    <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center group-hover:bg-blue-electric group-hover:text-white transition-all">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-6">Was hakt?</h2>
                <p className="text-slate-400 font-bold text-lg uppercase tracking-widest">Wähle dein Problem</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'inspection', label: 'Inspektion', desc: 'Voll-Checkup', price: 'ab 69€', time: '60 min' },
                  { id: 'brakes', label: 'Bremsen', desc: 'Sicherheit geht vor', price: 'ab 29€', time: '20 min' },
                  { id: 'gears', label: 'Schaltung', desc: 'Präzises Schalten', price: 'ab 39€', time: '30 min' },
                  { id: 'other', label: 'Sonstiges', desc: 'Individuelle Hilfe', price: 'Checkup', time: '15 min' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setData({ ...data, problem: item.label }); next(); }}
                    className="group p-8 rounded-[2rem] border-2 border-slate-50 bg-slate-50/50 hover:bg-white hover:border-green-lime transition-all text-left hover-lift"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-slate-900">{item.label}</h3>
                      <div className="bg-green-lime text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {item.price}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                       <Zap className="w-3 h-3 text-green-lime" /> {item.time} Repair Time
                    </div>
                  </button>
                ))}
              </div>
              
              <button onClick={back} className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors uppercase tracking-widest text-xs">Zurück</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="text-center">
                <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-6">Zeit wählen</h2>
                <div className="flex justify-center items-center gap-3">
                   <div className="flex items-center gap-2 px-4 py-2 bg-indigo-vibrant/10 text-indigo-vibrant rounded-full text-sm font-black uppercase tracking-widest">
                      <Sparkles className="w-4 h-4" /> AI Estimation
                   </div>
                </div>
              </div>

              <SlotPicker 
                slots={[
                  { id: '1', starts_at: '2024-05-10T10:00:00Z', is_express: true },
                  { id: '2', starts_at: '2024-05-10T14:30:00Z', is_express: false },
                  { id: '3', starts_at: '2024-05-11T09:00:00Z', is_express: true },
                ]} 
                selectedSlotId={data.slotId}
                onSelect={(id) => { setData({ ...data, slotId: id }); next(); }}
              />
              
              <button onClick={back} className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors uppercase tracking-widest text-xs">Zurück</button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-green-lime text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-lime/30">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-6">Booking Confirmed!</h2>
              <p className="text-xl text-slate-500 font-medium max-w-sm mx-auto mb-12">
                Wir haben deinen Slot für dein <span className="text-slate-900 font-bold">{data.bikeType}</span> reserviert.
              </p>
              
              <div className="bg-slate-50 p-8 rounded-3xl text-left border border-slate-100 mb-12">
                <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-4">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Fahrrad</span>
                  <span className="text-slate-900 font-bold">{data.bikeType}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-4 mb-4">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Problem</span>
                  <span className="text-slate-900 font-bold">{data.problem}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Status</span>
                  <span className="text-green-lime font-black uppercase tracking-widest text-xs flex items-center gap-2">
                    <Zap className="w-3 h-3 fill-current" /> Express
                  </span>
                </div>
              </div>

              <button 
                onClick={() => setStep(0)} 
                className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all hover-lift"
              >
                Fertig
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bike, ChevronRight, ChevronLeft, Clock, MapPin, CheckCircle2 } from "lucide-react";
import SlotPicker from "./SlotPicker";
import { cn } from "@/lib/utils";

const STEPS = ["Bike Type", "Problem", "Estimate", "Slot", "Confirm"];

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
    <div id="booking" className="max-w-3xl mx-auto py-12 px-4">
      <div className="flex justify-between mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex flex-col items-center flex-1">
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-colors",
                step >= i ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
              )}
            >
              {i + 1}
            </div>
            <span className={cn("text-[10px] uppercase tracking-wider font-bold", step >= i ? "text-blue-600" : "text-slate-400")}>
              {s}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-900">Welches Bike hast du?</h2>
              <div className="grid grid-cols-2 gap-4">
                {BIKE_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => { setData({...data, bikeType: type.id}); nextStep(); }}
                    className={cn(
                      "p-6 rounded-2xl border-2 flex flex-col items-center gap-4 transition-all",
                      data.bikeType === type.id ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 hover:border-blue-200 text-slate-600"
                    )}
                  >
                    <type.icon className="w-10 h-10" />
                    <span className="font-semibold">{type.name}</span>
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
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-900">Was ist das Problem?</h2>
              <div className="space-y-3">
                {PROBLEMS.map((prob) => (
                  <button
                    key={prob.id}
                    onClick={() => { setData({...data, problem: prob.id}); nextStep(); }}
                    className={cn(
                      "w-full p-4 rounded-xl border-2 text-left transition-all",
                      data.problem === prob.id ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 hover:border-blue-200 text-slate-600"
                    )}
                  >
                    {prob.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 text-center py-8"
            >
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">~ 45 Minuten</h2>
                <p className="text-slate-500 italic text-lg">AI-gestützte Zeit-Schätzung</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-slate-600">Geschätzter Preis:</span>
                  <span className="text-slate-900 text-2xl">59,00 €</span>
                </div>
              </div>
              <button 
                onClick={nextStep}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                Passenden Slot finden
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-900">Wähle deinen Express Slot</h2>
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
              className="space-y-8 text-center py-8"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Zusammenfassung</h2>
                <p className="text-slate-500">Dein Termin in Berlin-Mitte</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl space-y-3 text-left">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold">{PROBLEMS.find(p => p.id === data.problem)?.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Zeitpunkt:</span>
                  <span className="font-semibold">Heute, 14:30 Uhr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Preis:</span>
                  <span className="font-bold text-blue-600 text-xl">59,00 €</span>
                </div>
              </div>
              <button 
                onClick={() => alert("Redirecting to Stripe...")}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                Jetzt verbindlich buchen
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step > 0 && step < 4 && (
        <button 
          onClick={prevStep}
          className="mt-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
        >
          <ChevronLeft className="w-4 h-4" /> Zurück
        </button>
      )}
    </div>
  );
}

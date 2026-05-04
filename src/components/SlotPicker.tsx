"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Zap, Clock } from "lucide-react";

interface Slot {
  id: string;
  starts_at: string;
  is_express: boolean;
}

interface SlotPickerProps {
  slots: Slot[];
  selectedSlotId?: string;
  onSelect: (slotId: string) => void;
}

export default function SlotPicker({ slots, selectedSlotId, onSelect }: SlotPickerProps) {
  if (slots.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
        <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500 font-semibold">Keine freien Termine gefunden.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {slots.map((slot) => {
        const isSelected = selectedSlotId === slot.id;
        const startTime = new Date(slot.starts_at);
        
        return (
          <motion.button
            key={slot.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(slot.id)}
            className={cn(
              "group p-6 rounded-3xl border-2 transition-all text-left relative",
              isSelected
                ? "border-blue-electric bg-blue-electric/5 ring-4 ring-blue-electric/10"
                : "border-slate-100 bg-white hover:border-slate-300 soft-shadow"
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <span className={cn(
                "text-2xl font-black tracking-tight",
                isSelected ? "text-blue-electric" : "text-slate-900"
              )}>
                {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Uhr
              </span>
              
              {slot.is_express && (
                <div className={cn(
                  "px-3 py-1 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 rounded-full transition-colors",
                  isSelected ? "bg-blue-electric text-white" : "bg-green-lime text-white"
                )}>
                  <Zap className="w-3 h-3 fill-current" /> Express
                </div>
              )}
            </div>
            
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">
              {startTime.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'short' })}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

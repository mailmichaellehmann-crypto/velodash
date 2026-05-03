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
      <div className="text-center py-12 bg-slate-100 rounded-premium border-2 border-dashed border-slate-300">
        <Clock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-500 font-medium">Aktuell keine freien Slots verfügbar.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {slots.map((slot) => {
        const isSelected = selectedSlotId === slot.id;
        const startTime = new Date(slot.starts_at);
        
        return (
          <motion.button
            key={slot.id}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(slot.id)}
            className={cn(
              "group p-5 rounded-premium border-2 transition-all text-left relative overflow-hidden",
              isSelected
                ? "border-safety-orange bg-safety-orange/5 shadow-lg shadow-safety-orange/10"
                : "border-white bg-white hover:border-slate-medium shadow-sm hover:shadow-md",
              slot.is_express && !isSelected && "bg-slate-light"
            )}
          >
            {slot.is_express && (
              <div className={cn(
                "absolute top-0 right-0 px-3 py-1 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 rounded-bl-lg",
                isSelected ? "bg-safety-orange text-white" : "bg-carbon-black text-white"
              )}>
                <Zap className="w-3 h-3 fill-current" /> Express
              </div>
            )}
            
            <div className="flex flex-col">
              <span className={cn(
                "text-2xl font-black tracking-tighter mb-1 transition-colors",
                isSelected ? "text-safety-orange" : "text-carbon-black"
              )}>
                {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} Uhr
              </span>
              <span className="text-sm font-bold text-slate-medium uppercase tracking-tight">
                {startTime.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
            </div>
            
            {isSelected && (
              <motion.div 
                layoutId="active-indicator"
                className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-safety-orange"
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

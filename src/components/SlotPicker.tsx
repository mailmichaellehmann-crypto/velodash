"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {slots.map((slot) => (
        <motion.button
          key={slot.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(slot.id)}
          className={cn(
            "p-4 rounded-xl border-2 transition-all text-center relative overflow-hidden",
            selectedSlotId === slot.id
              ? "border-blue-600 bg-blue-50 text-blue-700"
              : "border-slate-200 hover:border-blue-300 text-slate-700",
            slot.is_express && "border-orange-200 bg-orange-50/30"
          )}
        >
          {slot.is_express && (
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-bl-lg font-bold uppercase tracking-wider">
              Express
            </div>
          )}
          <span className="text-lg font-semibold">
            {new Date(slot.starts_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="block text-xs mt-1 text-slate-500">
            {new Date(slot.starts_at).toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

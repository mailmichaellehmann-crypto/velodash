"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Calendar, 
  TrendingUp, 
  Settings, 
  Zap, 
  CheckCircle2, 
  Clock,
  Euro
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShopDashboard() {
  const [isExpressAvailable, setIsExpressAvailable] = useState(false);

  // Mock data
  const bookings = [
    { id: "1", customer: "Max Mustermann", bike: "Rennrad", service: "Kette wechseln", time: "14:30 Uhr", status: "confirmed" },
    { id: "2", customer: "Sarah Schmidt", bike: "E-Bike", service: "Inspektion", time: "16:00 Uhr", status: "pending" },
    { id: "3", customer: "Lukas Weber", bike: "MTB", service: "Bremsen", time: "Morgen, 10:00 Uhr", status: "confirmed" },
  ];

  const stats = [
    { label: "Umsatz (Woche)", value: "1.240,00 €", icon: Euro, trend: "+12%" },
    { label: "Buchungen", value: "24", icon: Calendar, trend: "+5%" },
    { label: "Express Slots", value: "8", icon: Zap, trend: "Aktiv" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col hidden md:flex">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">V</div>
          <span className="font-bold text-xl tracking-tight text-slate-900">VeloDash</span>
        </div>
        
        <nav className="space-y-1 flex-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Calendar className="w-5 h-5" /> Buchungen
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <TrendingUp className="w-5 h-5" /> Finanzen
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Settings className="w-5 h-5" /> Einstellungen
          </a>
        </nav>

        <div className="mt-auto p-4 bg-slate-900 rounded-2xl text-white">
          <p className="text-xs text-slate-400 mb-2">Shop Status</p>
          <p className="font-semibold mb-3">RadHaus München</p>
          <div className="flex items-center gap-2 text-xs text-green-400 font-medium">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online & Aktiv
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Guten Tag, RadHaus!</h1>
            <p className="text-slate-500">Hier ist die Übersicht für heute.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div 
              onClick={() => setIsExpressAvailable(!isExpressAvailable)}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-full cursor-pointer transition-all border-2",
                isExpressAvailable 
                  ? "bg-orange-500 border-orange-600 text-white shadow-lg shadow-orange-500/20" 
                  : "bg-white border-slate-200 text-slate-600 hover:border-orange-300"
              )}
            >
              <Zap className={cn("w-5 h-5", isExpressAvailable ? "fill-white" : "text-orange-500")} />
              <span className="font-bold">Emergency Slot {isExpressAvailable ? "Aktiv" : "Anbieten"}</span>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <stat.icon className="w-6 h-6 text-slate-600" />
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{stat.trend}</span>
              </div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-xl font-bold text-slate-900">Nächste Termine</h2>
              <button className="text-blue-600 font-semibold text-sm hover:underline">Alle ansehen</button>
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Kunde</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Zeit</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{booking.customer}</p>
                        <p className="text-xs text-slate-500">{booking.bike}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{booking.service}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                          <Clock className="w-4 h-4 text-blue-500" /> {booking.time}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                          booking.status === "confirmed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                        )}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 px-2">Auszahlungen</h2>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                  <Euro className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Nächste Auszahlung</p>
                  <p className="text-xl font-bold text-slate-900">Mo, 10. Mai</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Verfügbar:</span>
                  <span className="font-bold text-slate-900">450,20 €</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">In Bearbeitung:</span>
                  <span className="font-bold text-slate-900">189,00 €</span>
                </div>
                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-sm mt-4 hover:bg-black transition-colors">
                  Stripe Express öffnen
                </button>
              </div>
            </div>

            <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-500/20">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-200" /> Shop Profil
              </h3>
              <p className="text-blue-100 text-sm mb-4">Ihr Shop wird in München aktuell 4,8/5 Sternen bewertet.</p>
              <button className="w-full bg-white/20 hover:bg-white/30 py-2 rounded-lg text-sm font-semibold transition-all">
                Bewertungen sehen
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

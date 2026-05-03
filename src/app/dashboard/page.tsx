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
  Euro,
  ChevronRight,
  Bell,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShopDashboard() {
  const [isExpressAvailable, setIsExpressAvailable] = useState(false);

  // Mock data
  const bookings = [
    { id: "1", customer: "Max Mustermann", bike: "Rennrad", service: "Kette wechseln", time: "14:30 Uhr", status: "bestätigt" },
    { id: "2", customer: "Sarah Schmidt", bike: "E-Bike", service: "Inspektion", time: "16:00 Uhr", status: "ausstehend" },
    { id: "3", customer: "Lukas Weber", bike: "MTB", service: "Bremsen", time: "Morgen, 10:00 Uhr", status: "bestätigt" },
  ];

  const stats = [
    { label: "Umsatz (Woche)", value: "1.240,00 €", icon: Euro, trend: "+12%" },
    { label: "Buchungen", value: "24", icon: Calendar, trend: "+5%" },
    { label: "Express Slots", value: "8", icon: Zap, trend: "Aktiv" },
  ];

  return (
    <div className="min-h-screen bg-slate-light flex text-carbon-black font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-carbon-black p-8 flex flex-col hidden lg:flex sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 bg-safety-orange rounded-xl flex items-center justify-center text-white font-black italic">V</div>
          <span className="font-black text-2xl tracking-tighter text-white uppercase italic">VELO<span className="text-safety-orange">DASH</span></span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" active />
          <NavItem icon={Calendar} label="Termine" />
          <NavItem icon={TrendingUp} label="Analysen" />
          <NavItem icon={Settings} label="Werkstatt" />
        </nav>

        <div className="mt-auto p-6 bg-slate-dark rounded-premium text-white border border-white/5 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-safety-orange/10 rounded-full blur-2xl" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-medium mb-2">Angemeldet als</p>
          <p className="font-black tracking-tighter mb-4 text-lg">RadHaus München</p>
          <div className="flex items-center gap-2 text-[10px] text-green-400 font-black uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Online
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <h1 className="text-5xl font-black text-carbon-black tracking-tighter mb-2 italic uppercase">Guten Tag, <span className="text-safety-orange">RadHaus!</span></h1>
            <p className="text-slate-medium font-bold uppercase tracking-widest text-xs">Shop Performance & Operations</p>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsExpressAvailable(!isExpressAvailable)}
              className={cn(
                "flex-1 md:flex-none flex items-center gap-4 px-8 py-4 rounded-premium cursor-pointer transition-all border-2",
                isExpressAvailable 
                  ? "bg-safety-orange border-safety-orange text-white shadow-2xl shadow-safety-orange/30" 
                  : "bg-white border-slate-light text-carbon-black hover:border-safety-orange group"
              )}
            >
              <Zap className={cn("w-6 h-6", isExpressAvailable ? "fill-white" : "text-safety-orange group-hover:scale-110 transition-transform")} />
              <span className="font-black uppercase tracking-widest text-sm">
                Emergency Slot {isExpressAvailable ? "Aktiv" : "Anbieten"}
              </span>
            </motion.div>
            
            <button className="p-4 bg-white rounded-premium border-2 border-slate-light text-carbon-black hover:border-slate-medium transition-all relative">
              <Bell className="w-6 h-6" />
              <div className="absolute top-3 right-3 w-2 h-2 bg-safety-orange rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-8 rounded-premium border border-slate-light premium-shadow relative group hover:border-safety-orange/50 transition-colors">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-slate-light rounded-2xl group-hover:bg-safety-orange/5 transition-colors">
                  <stat.icon className="w-8 h-8 text-carbon-black group-hover:text-safety-orange transition-colors" />
                </div>
                <span className="text-[10px] font-black text-safety-orange bg-safety-orange/10 px-3 py-1 rounded-full uppercase tracking-widest">{stat.trend}</span>
              </div>
              <p className="text-slate-medium text-xs font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <p className="text-4xl font-black text-carbon-black tracking-tighter">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Recent Bookings */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-end px-2">
              <div>
                <h2 className="text-3xl font-black text-carbon-black tracking-tighter italic uppercase">Termine</h2>
                <div className="w-12 h-1 bg-safety-orange mt-1" />
              </div>
              <button className="text-safety-orange font-black text-xs uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-1">
                Alle sehen <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="bg-white rounded-[2rem] border border-slate-light overflow-hidden premium-shadow">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-light/50 border-b border-slate-light">
                    <th className="px-8 py-6 text-[10px] font-black text-slate-medium uppercase tracking-[0.2em]">Kunde</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-medium uppercase tracking-[0.2em]">Service</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-medium uppercase tracking-[0.2em]">Zeit</th>
                    <th className="px-8 py-6 text-[10px] font-black text-slate-medium uppercase tracking-[0.2em]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-light">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-light/30 transition-colors group">
                      <td className="px-8 py-6">
                        <p className="font-black text-carbon-black tracking-tight">{booking.customer}</p>
                        <p className="text-[10px] font-bold text-slate-medium uppercase tracking-widest mt-1">{booking.bike}</p>
                      </td>
                      <td className="px-8 py-6">
                         <span className="text-sm font-bold text-slate-dark">{booking.service}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3 text-sm font-black text-carbon-black">
                          <div className="w-8 h-8 rounded-lg bg-safety-orange/10 flex items-center justify-center text-safety-orange">
                            <Clock className="w-4 h-4" />
                          </div>
                          {booking.time}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border-2",
                          booking.status === "bestätigt" 
                            ? "bg-green-50 border-green-200 text-green-700" 
                            : "bg-safety-orange/5 border-safety-orange/20 text-safety-orange"
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

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-10">
            <div>
              <h2 className="text-3xl font-black text-carbon-black tracking-tighter italic uppercase mb-6">Finanzen</h2>
              <div className="bg-carbon-black p-8 rounded-[2rem] text-white premium-shadow border-4 border-safety-orange/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-safety-orange/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl" />
                
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-white/10">
                  <div className="w-16 h-16 bg-safety-orange rounded-2xl flex items-center justify-center text-white shadow-lg shadow-safety-orange/20 rotate-3">
                    <Euro className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-medium uppercase tracking-widest mb-1">Auszahlung am</p>
                    <p className="text-2xl font-black tracking-tighter">Mo, 10. Mai</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-medium uppercase tracking-widest">Verfügbar</span>
                    <span className="text-2xl font-black tracking-tighter text-safety-orange">450,20 €</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-white/10">
                    <span className="text-xs font-bold text-slate-medium uppercase tracking-widest">Schwebend</span>
                    <span className="font-black tracking-tighter">189,00 €</span>
                  </div>
                  <button className="w-full bg-white text-carbon-black py-5 rounded-premium font-black uppercase tracking-widest text-xs hover:bg-safety-orange hover:text-white transition-all">
                    Stripe Dashboard
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-light group hover:border-safety-orange transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-carbon-black text-safety-orange rounded-xl">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="font-black tracking-tighter uppercase italic text-xl">Shop Profil</h3>
              </div>
              <p className="text-slate-medium font-medium text-sm mb-6 leading-relaxed">
                Ihre aktuelle Bewertung in München beträgt <span className="text-carbon-black font-black">4,8/5 Sternen</span>. Das entspricht dem VeloDash Premium Status.
              </p>
              <button className="w-full bg-slate-light hover:bg-slate-medium hover:text-white py-3 rounded-premium text-[10px] font-black uppercase tracking-widest transition-all">
                Bewertungen verwalten
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <a 
      href="#" 
      className={cn(
        "flex items-center gap-4 px-4 py-4 rounded-premium transition-all group",
        active 
          ? "bg-safety-orange text-white shadow-lg shadow-safety-orange/20" 
          : "text-slate-medium hover:text-white hover:bg-white/5"
      )}
    >
      <Icon className={cn("w-6 h-6", active ? "text-white" : "group-hover:text-safety-orange transition-colors")} />
      <span className="font-black uppercase tracking-widest text-xs">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />}
    </a>
  );
}

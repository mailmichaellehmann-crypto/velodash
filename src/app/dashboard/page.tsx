"use client";

import { useState } from "react";
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  TrendingUp, 
  Zap, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Bell,
  Menu,
  ChevronRight,
  LogOut,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function ShopDashboard() {
  const [emergencyActive, setEmergencyActive] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-electric rounded-xl flex items-center justify-center text-white">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <span className="font-black text-xl tracking-tighter text-slate-900">VeloDash</span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <NavItem icon={LayoutDashboard} label="Overview" active />
          <NavItem icon={Calendar} label="Bookings" />
          <NavItem icon={TrendingUp} label="Revenue" />
          <NavItem icon={Settings} label="Settings" />
        </nav>

        <div className="pt-6 border-t border-slate-100">
           <button className="flex items-center gap-3 text-slate-400 hover:text-accent-coral font-bold transition-colors w-full px-3 py-2">
             <LogOut className="w-5 h-5" /> Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Radhaus Mitte</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Shop Dashboard</p>
          </div>
          <button className="relative p-3 bg-white rounded-full border border-slate-200 text-slate-400 hover:text-blue-electric transition-all shadow-sm">
            <Bell className="w-6 h-6" />
            <span className="absolute top-2 right-2 w-3 h-3 bg-accent-coral rounded-full border-2 border-white"></span>
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Controls */}
          <div className="lg:col-span-2 space-y-8">
            {/* Emergency Toggle */}
            <div className={cn(
              "p-10 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-8",
              emergencyActive 
                ? "bg-blue-electric border-blue-electric shadow-2xl shadow-blue-electric/20 text-white" 
                : "bg-white border-slate-200 text-slate-900"
            )}>
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-3xl font-black tracking-tight">Emergency Slot</h3>
                <p className={cn("font-medium", emergencyActive ? "text-blue-50" : "text-slate-400")}>
                  {emergencyActive ? "Currently visible to customers within 5km." : "Activate to show up as 'Express' for users."}
                </p>
              </div>
              <button 
                onClick={() => setEmergencyActive(!emergencyActive)}
                className={cn(
                  "w-20 h-10 rounded-full p-1 transition-all relative",
                  emergencyActive ? "bg-white" : "bg-slate-200"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full shadow-lg transition-all absolute top-1",
                  emergencyActive ? "right-1 bg-blue-electric" : "left-1 bg-white"
                )} />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StatCard label="Today's Revenue" value="428,00€" change="+12%" icon={TrendingUp} color="blue" />
              <StatCard label="Active Bookings" value="14" change="3 Express" icon={Calendar} color="green" />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 soft-shadow">
              <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Recent Bookings</h3>
              <div className="space-y-4">
                <BookingItem user="Markus W." bike="Canyon Grizl" service="Brakes" time="10:30" status="express" />
                <BookingItem user="Sarah K." bike="VanMoof S3" service="Inspection" time="11:45" status="regular" />
                <BookingItem user="Tom S." bike="Specialized SL7" service="Gears" time="14:00" status="regular" />
              </div>
            </div>
          </div>

          {/* Side Info */}
          <div className="space-y-8">
             <div className="bg-indigo-vibrant p-10 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-vibrant/20 relative overflow-hidden group">
                <Sparkles className="absolute -top-6 -right-6 w-32 h-32 opacity-10 group-hover:rotate-12 transition-transform" />
                <h3 className="text-2xl font-black mb-4">Pro Insights</h3>
                <p className="text-indigo-100 font-medium mb-8 leading-relaxed">Your shop is in high demand for <span className="font-bold text-white">E-Bike Inspections</span> this week.</p>
                <button className="w-full bg-white text-indigo-vibrant py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-50 transition-all">View Analytics</button>
             </div>

             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 soft-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-lime/10 text-green-lime rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-slate-900">VeloDash Certified</h3>
                </div>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">You have maintained a 98% satisfaction rate this month. Keep it up!</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon: Icon, label, active = false }: any) {
  return (
    <button className={cn(
      "flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all w-full",
      active ? "bg-blue-electric text-white shadow-lg shadow-blue-electric/20" : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
    )}>
      <Icon className="w-6 h-6" />
      {label}
    </button>
  );
}

function StatCard({ label, value, change, color }: any) {
  const colors = {
    blue: "bg-blue-electric",
    green: "bg-green-lime",
  };
  
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 soft-shadow">
      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-2">{label}</p>
      <h4 className="text-3xl font-black text-slate-900 mb-2">{value}</h4>
      <span className={cn(
        "text-xs font-black px-2 py-1 rounded-full text-white uppercase tracking-widest",
        color === 'blue' ? 'bg-blue-electric' : 'bg-green-lime'
      )}>{change}</span>
    </div>
  );
}

function BookingItem({ user, bike, service, time, status }: any) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400">{user[0]}</div>
        <div>
          <h5 className="font-bold text-slate-900">{user}</h5>
          <p className="text-xs text-slate-400 font-medium">{bike} • {service}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-black text-slate-900">{time}</p>
        <span className={cn(
          "text-[10px] font-black uppercase tracking-widest",
          status === 'express' ? 'text-blue-electric' : 'text-slate-300'
        )}>{status}</span>
      </div>
    </div>
  );
}

"use client";

import { Zap } from "lucide-react";

export default function Footer({ city = "City Edition" }: { city?: string }) {
  return (
    <footer className="py-32 bg-carbon-black text-white border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 mb-20">
          <div className="lg:col-span-2">
            <div className="text-5xl font-black tracking-tighter mb-6 italic uppercase">
              VELO<span className="text-safety-orange">DASH</span>
            </div>
            <p className="text-slate-medium text-sm font-bold uppercase tracking-widest mb-4">
              {city}
            </p>
            <p className="text-slate-medium font-medium text-xl max-w-sm leading-relaxed">
              Die erste autonome Plattform für Premium Fahrrad-Logistik und Express-Reparaturen.
            </p>
          </div>
          
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-safety-orange">Product</h4>
            <ul className="space-y-4 font-black uppercase tracking-widest text-[10px]">
              <li><a href="/#cities" className="hover:text-safety-orange transition-colors">Cities</a></li>
              <li><a href="/shops/claim" className="hover:text-safety-orange transition-colors">For Shops</a></li>
              <li><a href="#" className="hover:text-safety-orange transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-safety-orange">Company</h4>
            <ul className="space-y-4 font-black uppercase tracking-widest text-[10px]">
              <li><a href="#" className="hover:text-safety-orange transition-colors">About</a></li>
              <li><a href="#" className="hover:text-safety-orange transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-safety-orange transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-slate-medium text-xs font-black uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} — GERMAN ENGINEERED BICYCLE LOGISTICS
          </div>
          <div className="flex gap-6 grayscale opacity-50">
            <span className="font-black uppercase tracking-widest text-[10px] hover:text-safety-orange hover:grayscale-0 cursor-pointer transition-all">INSTAGRAM</span>
            <span className="font-black uppercase tracking-widest text-[10px] hover:text-safety-orange hover:grayscale-0 cursor-pointer transition-all">TWITTER</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

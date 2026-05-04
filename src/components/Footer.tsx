"use client";

import Link from "next/link";
import { Zap, Bike } from "lucide-react";

export default function Footer({ city = "City Edition" }: { city?: string }) {
  return (
    <footer className="py-24 bg-white text-slate-900 border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-electric rounded flex items-center justify-center text-white">
                <Bike className="w-4 h-4" />
              </div>
              <span className="font-bold text-xl tracking-tight">VeloDash</span>
            </Link>
            <p className="text-slate-500 font-medium text-sm uppercase tracking-widest">
              {city}
            </p>
            <p className="text-slate-500 font-normal text-lg max-w-sm leading-relaxed">
              The fastest way to book premium bike repair slots. German engineered efficiency.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Product</h4>
            <ul className="space-y-3 text-slate-500 font-medium">
              <li><Link href="/#cities" className="hover:text-blue-electric transition-colors">Cities</Link></li>
              <li><Link href="/shops/claim" className="hover:text-blue-electric transition-colors">For Shops</Link></li>
              <li><a href="#" className="hover:text-blue-electric transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
            <ul className="space-y-3 text-slate-500 font-medium">
              <li><a href="#" className="hover:text-blue-electric transition-colors">About</a></li>
              <li><a href="#" className="hover:text-blue-electric transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-blue-electric transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8 text-sm font-medium text-slate-400">
          <div>
            © {new Date().getFullYear()} VeloDash Express.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-blue-electric cursor-pointer transition-all">Instagram</span>
            <span className="hover:text-blue-electric cursor-pointer transition-all">Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

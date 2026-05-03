"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight,
  Calculator,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ShopClaimPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    shopName: "",
    address: "",
    phone: "",
    email: ""
  });

  const [simulatedRevenue, setSimulatedRevenue] = useState(2450);

  const nextStep = () => setStep(s => s + 1);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">V</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">VeloDash <span className="text-blue-600 font-medium">Partner</span></span>
          </div>
          <a href="/" className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">Zurück zur Hauptseite</a>
        </div>
      </header>

      <div className="max-w-4xl mx-auto py-12 px-4">
        {step === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 fill-blue-700" /> Werkstatt-Partner werden
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Holen Sie sich mehr Kunden <br />in Ihre Werkstatt.
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              VeloDash verbindet Premium-Fahrradläden mit Kunden, die sofortige Express-Reparaturen suchen. Steigern Sie Ihren Umsatz ohne Mehraufwand.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
              {[
                { title: "Mehr Umsatz", text: "Zusätzliche Buchungen durch Express-Slots.", icon: TrendingUp },
                { title: "Einfache Verwaltung", text: "Dashboard für alle Termine und Zahlungen.", icon: CheckCircle2 },
                { title: "Sichere Auszahlung", text: "Automatisierte Payouts via Stripe Connect.", icon: Zap },
              ].map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center gap-3 mx-auto group"
            >
              Jetzt Werkstatt listen <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Werkstatt-Daten angeben</h2>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Name der Werkstatt</label>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="z.B. RadProfi München" 
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={formData.shopName}
                      onChange={(e) => setFormData({...formData, shopName: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Adresse</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Straße, PLZ, Stadt" 
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Telefonnummer</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="tel" 
                      placeholder="+49 ..." 
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">E-Mail Adresse</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="email" 
                      placeholder="werkstatt@beispiel.de" 
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <button 
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.shopName || !formData.email}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-colors disabled:opacity-50 mt-4"
                >
                  Daten verifizieren
                </button>
              </form>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-orange-50 border-2 border-orange-200 p-8 rounded-3xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Calculator className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-orange-900">Umsatz-Potential</h3>
                </div>
                <p className="text-orange-800 mb-6 font-medium leading-relaxed">
                  In Ihrer Region wurden diesen Monat bereits über **120 Express-Reparaturen** angefragt. 
                </p>
                <div className="text-center bg-white p-6 rounded-2xl border border-orange-200 shadow-sm">
                  <p className="text-slate-500 text-sm font-bold uppercase mb-1">Ihr entgangener Umsatz</p>
                  <p className="text-4xl font-black text-slate-900 tracking-tight">~ {simulatedRevenue},00 €</p>
                  <p className="text-xs text-orange-600 font-bold mt-2 flex items-center justify-center gap-1">
                    <Zap className="w-3 h-3 fill-orange-600" /> Potential basierend auf lokalen Daten
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" /> Live Vorschau
                </h4>
                <div className="border border-slate-100 rounded-xl p-4 flex gap-4 items-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Store className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{formData.shopName || "Ihre Werkstatt"}</p>
                    <p className="text-xs text-slate-500">{formData.address || "Adresse noch nicht angegeben"}</p>
                    <div className="flex gap-1 mt-1">
                      {[1,2,3,4,5].map(s => <div key={s} className="w-3 h-3 bg-yellow-400 rounded-full" />)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 rounded-[40px] border border-slate-200 shadow-2xl text-center max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Zap className="w-10 h-10 fill-blue-600" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Fast geschafft!</h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              VeloDash nutzt **Stripe Connect**, um sicherzustellen, dass Sie Ihre Zahlungen pünktlich und sicher erhalten. 
              Wir behalten lediglich 25% Provision ein – der Rest gehört Ihnen.
            </p>

            <div className="bg-slate-50 p-6 rounded-2xl mb-10 text-left space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Auszahlungs-Rhythmus:</span>
                <span className="text-slate-900 font-bold">Wöchentlich</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Gebühr pro Buchung:</span>
                <span className="text-slate-900 font-bold">VeloDash (25%) + Stripe Fee</span>
              </div>
            </div>

            <button 
              onClick={() => alert("Redirecting to Stripe Connect...")}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3 group"
            >
              Konto verknüpfen & Starten <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-xs text-slate-400 mt-6 uppercase font-bold tracking-widest">Sichere Verbindung via Stripe</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}

import Link from "next/link";
import { ArrowRight, Zap, MapPin, Bike, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Modern Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-electric/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-lime/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-electric/10 text-blue-electric rounded-full text-xs font-black uppercase tracking-widest mb-10">
            <Sparkles className="w-4 h-4" /> Jetzt in 50+ Städten
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-10">
            Fix your bike <br /> 
            <span className="text-blue-electric italic">in no time.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
            Die erste vollautomatisierte Buchungsplattform für Premium-Fahrradreparaturen. Schnell, sicher, effizient.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="#cities" 
              className="w-full sm:w-auto bg-blue-electric hover:bg-blue-electric-hover text-white px-12 py-6 rounded-[2rem] text-xl font-bold flex items-center justify-center gap-3 transition-all shadow-2xl shadow-blue-electric/20 hover-lift"
            >
              Finde deinen Slot <ArrowRight className="w-6 h-6" />
            </Link>
            <Link 
              href="/shops/claim" 
              className="w-full sm:w-auto bg-slate-50 hover:bg-slate-100 text-slate-900 px-12 py-6 rounded-[2rem] text-xl font-bold flex items-center justify-center gap-3 transition-all"
            >
              Für Werkstätten
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-12 border-y border-slate-50 bg-slate-50/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale">
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter">SHIMANO</div>
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter">CANYON</div>
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter">SPECIALIZED</div>
            <div className="flex items-center gap-2 font-black text-xl tracking-tighter">TREK</div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6 group">
              <div className="w-16 h-16 bg-blue-electric text-white rounded-[1.5rem] flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-blue-electric/20">
                <Zap className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Express Slots</h3>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">Keine Wartezeiten mehr. Buche Notfall-Termine, wenn du sie wirklich brauchst.</p>
            </div>
            
            <div className="space-y-6 group">
              <div className="w-16 h-16 bg-green-lime text-white rounded-[1.5rem] flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-green-lime/20">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Top Mechaniker</h3>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">Nur zertifizierte Partnerwerkstätten mit den höchsten Qualitätsstandards.</p>
            </div>
            
            <div className="space-y-6 group">
              <div className="w-16 h-16 bg-indigo-vibrant text-white rounded-[1.5rem] flex items-center justify-center group-hover:rotate-6 transition-transform shadow-lg shadow-indigo-vibrant/20">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">Fair Pricing</h3>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">Transparente Kostenvoranschläge durch unsere AI-Zeitkalkulation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* City Selector Section */}
      <section id="cities" className="py-32 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">Wir sind bereit.</h2>
            <p className="text-2xl text-slate-400 font-medium uppercase tracking-widest">Wähle deine Stadt</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Berlin', path: '/reparatur/berlin', slots: '12 Slots frei', color: 'bg-blue-electric' },
              { name: 'Hamburg', path: '/reparatur/hamburg', slots: '8 Slots frei', color: 'bg-green-lime' },
              { name: 'München', path: '/reparatur/muenchen', slots: '15 Slots frei', color: 'bg-accent-coral' },
              { name: 'Köln', path: '/reparatur/koeln', slots: '5 Slots frei', color: 'bg-indigo-vibrant' },
              { name: 'Frankfurt', path: '/reparatur/frankfurt', slots: '22 Slots frei', color: 'bg-slate-900' },
            ].map((city) => (
              <Link key={city.name} href={city.path} className="group relative bg-white p-12 rounded-[2.5rem] border border-slate-100 soft-shadow hover-lift overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-4xl font-black text-slate-900 mb-2">{city.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-lime animate-pulse" />
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">{city.slots}</span>
                  </div>
                </div>
                <div className={cn(
                  "absolute bottom-0 right-0 w-24 h-24 flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-12",
                  city.color,
                  "rounded-tl-[3rem] text-white"
                )}>
                  <ArrowRight className="w-8 h-8" />
                </div>
              </Link>
            ))}
            
            <div className="group relative bg-slate-900 p-12 rounded-[2.5rem] border border-slate-800 soft-shadow hover-lift overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-4xl font-black text-white mb-2">Deine Stadt?</h3>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Stimme jetzt ab</p>
                </div>
                <div className="absolute bottom-0 right-0 w-24 h-24 flex items-center justify-center bg-white text-slate-900 rounded-tl-[3rem]">
                  <MapPin className="w-8 h-8" />
                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

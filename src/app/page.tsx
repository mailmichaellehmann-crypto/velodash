import Image from "next/image";
import { Zap, Bike, Store, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import WaitlistForm from "@/components/WaitlistForm";

export default function Home() {
  const cities = [
    { name: "Berlin", slug: "berlin", tag: "Hauptstadt" },
    { name: "Hamburg", slug: "hamburg", tag: "Hansestadt" },
    { name: "München", slug: "muenchen", tag: "Premium" },
    { name: "Köln", slug: "koeln", tag: "Klassik" },
    { name: "Frankfurt", slug: "frankfurt", tag: "Express" },
  ];

  return (
    <main className="min-h-screen bg-slate-light text-carbon-black font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-carbon-black text-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-safety-orange/10 -skew-x-12 translate-x-1/4 z-0" />
        
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 bg-safety-orange/20 text-safety-orange px-4 py-2 rounded-full text-xs font-black tracking-[0.3em] uppercase mb-8">
              <Zap className="w-4 h-4 fill-current" /> Next-Gen Bike Repair
            </div>
            <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.8] mb-12 italic uppercase">
              VELO<br /><span className="text-safety-orange">DASH</span>
            </h1>
            <p className="text-2xl md:text-4xl font-black text-white tracking-tight mb-12 uppercase italic leading-none max-w-2xl">
              Der Marktplatz für <span className="text-safety-orange underline underline-offset-8">Premium</span> Express-Reparatur Slots.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <a 
                href="#cities"
                className="bg-safety-orange hover:bg-safety-orange-muted text-white px-12 py-6 rounded-premium text-xl font-black uppercase tracking-tighter transition-all shadow-2xl shadow-safety-orange/40 flex items-center justify-center gap-3 italic"
              >
                Slot finden <ArrowRight className="w-6 h-6" />
              </a>
              <a 
                href="/shops/claim"
                className="bg-transparent border-2 border-white/20 hover:border-white text-white px-12 py-6 rounded-premium text-xl font-black uppercase tracking-tighter transition-all flex items-center justify-center gap-3 italic"
              >
                Für Werkstätten <Store className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-4 hidden lg:block relative">
            <div className="aspect-[3/4] rounded-[3rem] overflow-hidden premium-shadow border-4 border-white/10 rotate-3">
              <img 
                src="https://images.unsplash.com/photo-1571333250630-f0230c320b6d?auto=format&fit=crop&q=80&w=800" 
                alt="Express Repair" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl premium-shadow text-carbon-black">
              <div className="text-4xl font-black tracking-tighter text-safety-orange italic">25min</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-medium">Durchschn. Reparaturzeit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-white border-y border-slate-light">
        <div className="container mx-auto px-6 flex flex-wrap justify-between items-center gap-8 opacity-40">
          <div className="text-xl font-black italic tracking-tighter">BIKE<span className="text-safety-orange">MAG</span></div>
          <div className="text-xl font-black italic tracking-tighter text-slate-medium uppercase tracking-[0.2em]">City<span className="text-carbon-black">Cycle</span></div>
          <div className="text-xl font-black italic tracking-tighter">PREMIUM<span className="text-safety-orange">GEAR</span></div>
          <div className="text-xl font-black italic tracking-tighter text-slate-medium">VELO<span className="text-carbon-black">REVIEW</span></div>
        </div>
      </section>

      {/* Cities Section */}
      <section id="cities" className="py-32 container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-safety-orange font-black uppercase tracking-[0.4em] text-xs mb-4 block">Deployment Zones</span>
          <h2 className="text-5xl md:text-7xl font-black text-carbon-black tracking-tighter italic uppercase">WÄHLE DEINE STADT</h2>
          <div className="w-24 h-2 bg-safety-orange mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city) => (
            <a 
              key={city.slug}
              href={`/reparatur/${city.slug}`}
              className="group bg-white p-10 rounded-[2.5rem] premium-shadow border border-slate-light hover:border-safety-orange transition-all duration-500 overflow-hidden relative"
            >
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-safety-orange/5 rounded-full blur-2xl group-hover:bg-safety-orange/10 transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-safety-orange mb-4 block">{city.tag}</span>
              <h3 className="text-4xl font-black text-carbon-black tracking-tighter uppercase italic group-hover:translate-x-2 transition-transform">
                {city.name}
              </h3>
              <div className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-medium group-hover:text-carbon-black">
                Jetzt Verfügbarkeit prüfen <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </a>
          ))}
          
          <div className="bg-slate-dark p-10 rounded-[2.5rem] text-white flex flex-col justify-center items-center text-center border-4 border-dashed border-white/5 group hover:border-safety-orange/30 transition-all">
            <h3 className="text-2xl font-black tracking-tighter uppercase italic mb-4">Deine Stadt fehlt?</h3>
            <p className="text-slate-medium text-sm font-medium mb-6">Wir expandieren schnell. Stimme jetzt für dein Viertel ab.</p>
            <a href="#waitlist" className="text-safety-orange font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:translate-x-1 transition-transform">
              Voten <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-carbon-black text-white relative overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-safety-orange font-black uppercase tracking-[0.3em] text-sm mb-4 block">Value Proposition</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12 italic uppercase">
              KEINE ZEIT <br /><span className="text-safety-orange">FÜR WARTELISTEN.</span>
            </h2>
            
            <div className="space-y-10">
              <BenefitItem 
                icon={Clock} 
                title="EXPRESS BOOKING" 
                text="In unter 60 Sekunden zum bestätigten Reparatur-Termin. Kein Telefonat nötig."
              />
              <BenefitItem 
                icon={ShieldCheck} 
                title="CERTIFIED SHOPS" 
                text="Nur die besten Werkstätten deiner Stadt erhalten Zugang zum VeloDash Netzwerk."
              />
              <BenefitItem 
                icon={Zap} 
                title="AI ESTIMATION" 
                text="Unsere AI berechnet die Reparaturdauer und den Preis in Echtzeit."
              />
            </div>
          </div>
          
          <div className="relative">
             <div className="aspect-square bg-safety-orange/5 rounded-[4rem] border-2 border-white/5 flex items-center justify-center p-10 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-safety-orange/20 to-transparent z-0" />
                <img 
                  src="https://images.unsplash.com/photo-1530138960748-100464ac9427?auto=format&fit=crop&q=80&w=800" 
                  alt="Mechanic" 
                  className="w-full h-full object-cover rounded-[3rem] relative z-10 premium-shadow grayscale hover:grayscale-0 transition-all duration-700"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-32 bg-slate-light">
        <div className="container mx-auto px-6 max-w-4xl">
          <WaitlistForm />
        </div>
      </section>

      <footer className="py-32 bg-carbon-black text-white border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 mb-20">
            <div className="lg:col-span-2">
               <div className="text-5xl font-black tracking-tighter mb-6 italic uppercase">VELO<span className="text-safety-orange">DASH</span></div>
               <p className="text-slate-medium font-medium text-xl max-w-sm leading-relaxed">
                 Die erste autonome Plattform für Premium Fahrrad-Logistik und Express-Reparaturen.
               </p>
            </div>
            
            <div>
              <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-safety-orange">Product</h4>
              <ul className="space-y-4 font-black uppercase tracking-widest text-[10px]">
                <li><a href="#cities" className="hover:text-safety-orange">Cities</a></li>
                <li><a href="/shops/claim" className="hover:text-safety-orange">For Shops</a></li>
                <li><a href="#" className="hover:text-safety-orange">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-safety-orange">Company</h4>
              <ul className="space-y-4 font-black uppercase tracking-widest text-[10px]">
                <li><a href="#" className="hover:text-safety-orange">About</a></li>
                <li><a href="#" className="hover:text-safety-orange">Privacy</a></li>
                <li><a href="#" className="hover:text-safety-orange">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-slate-medium text-xs font-black uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} — GERMAN ENGINEERED BICYCLE LOGISTICS
            </div>
            <div className="flex gap-6 grayscale opacity-50">
               <span className="font-black uppercase tracking-widest text-[10px]">INSTAGRAM</span>
               <span className="font-black uppercase tracking-widest text-[10px]">TWITTER</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function BenefitItem({ icon: Icon, title, text }: { icon: any, title: string, text: string }) {
  return (
    <div className="flex gap-8 group">
      <div className="flex-shrink-0 w-16 h-16 bg-white/5 border border-white/10 text-safety-orange rounded-2xl flex items-center justify-center transition-all group-hover:bg-safety-orange group-hover:text-white group-hover:rotate-6">
        <Icon className="w-8 h-8 fill-current" />
      </div>
      <div>
        <h3 className="text-2xl font-black tracking-tighter mb-2 italic uppercase">{title}</h3>
        <p className="text-slate-medium font-medium leading-relaxed max-w-md">{text}</p>
      </div>
    </div>
  );
}

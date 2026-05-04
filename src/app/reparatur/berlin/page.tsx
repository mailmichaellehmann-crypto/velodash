import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CityHero from "@/components/CityHero";
import BookingFlow from "@/components/BookingFlow";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata = {
  title: 'Fahrrad Reparatur Berlin | Express Service | VeloDash',
  description: 'Buche deinen Fahrrad Reparatur Termin in Berlin in Sekunden. Express Slots für E-Bikes, Rennräder und City Bikes.',
};

export default function BerlinPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <CityHero 
        city="Berlin"
        headline={<>Fahrrad Reparatur <span className="text-blue-electric">Berlin Express.</span></>}
        subtext="Keine Lust auf 3 Wochen Wartezeit? Wir vermitteln dir sofort verfügbare Premium-Slots in ganz Berlin. Von Kreuzberg bis Spandau."
      />

      <section className="py-12 bg-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-slate-100" />
        <BookingFlow />
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-8">Warum VeloDash in Berlin?</h2>
              <div className="space-y-8">
                {[
                  { title: "24h Express", desc: "Über 80% unserer Buchungen werden innerhalb von 24 Stunden abgeschlossen.", color: "bg-blue-electric" },
                  { title: "Kiezkultur", desc: "Wir arbeiten mit den besten lokalen Meisterbetrieben in jedem Berliner Bezirk.", color: "bg-green-lime" },
                  { title: "Mobile Ready", desc: "Buchbar in 3 Taps direkt vom Smartphone, während du noch am Radweg stehst.", color: "bg-indigo-vibrant" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className={cn("w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-white font-bold", item.color)}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
               <div className="aspect-square bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 p-12">
                  <div className="w-full h-full bg-white rounded-3xl shadow-2xl p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <div className="bg-blue-electric/10 text-blue-electric px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Berlin Mitte</div>
                      <div className="text-slate-300 font-black">09:41</div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-4 w-3/4 bg-slate-50 rounded-full" />
                      <div className="h-4 w-1/2 bg-slate-50 rounded-full" />
                    </div>
                    <div className="h-48 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center text-slate-300 font-bold italic">
                      Slot Map Preview
                    </div>
                  </div>
               </div>
               {/* Floating elements */}
               <div className="absolute -bottom-6 -right-6 bg-green-lime text-white p-6 rounded-3xl shadow-xl shadow-green-lime/20 font-black italic">
                 +12 Slots Today
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <WaitlistForm />
        </div>
      </section>

      <Footer city="Berlin Edition" />
    </main>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

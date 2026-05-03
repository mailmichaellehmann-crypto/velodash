import { Metadata } from "next";
import CityHero from "@/components/CityHero";
import BookingFlow from "@/components/BookingFlow";
import WaitlistForm from "@/components/WaitlistForm";
import { CheckCircle2, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Fahrrad Reparatur Express Berlin | VeloDash",
  description: "Buchen Sie Ihren Berliner Fahrrad-Reparaturtermin in Rekordzeit. Express-Service für Rennräder, MTBs und E-Bikes in der Hauptstadt.",
};

const BENEFITS = [
  {
    title: "Hauptstadt-Tempo",
    description: "Von Mitte bis Neukölln – wir finden den schnellsten Slot in Ihrem Kiez.",
    icon: Zap,
  },
  {
    title: "Berliner Meister",
    description: "Handverlesene Experten, die Ihr Bike mit höchster Präzision reparieren.",
    icon: ShieldCheck,
  },
  {
    title: "AI-Estimation",
    description: "Keine Berliner Schnauze bei den Preisen. Transparente Schätzung vorab.",
    icon: CheckCircle2,
  },
];

const FAQS = [
  {
    question: "Gibt es Express-Termine am selben Tag?",
    answer: "Ja, unsere 'Emergency Slots' in Berlin sind oft noch am Tag der Buchung verfügbar.",
  },
  {
    question: "Welche Fahrräder werden repariert?",
    answer: "Wir reparieren alles vom klassischen Stadtrad über High-End Rennräder bis hin zu modernen Lasten-E-Bikes.",
  },
  {
    question: "Ist der Service teurer als direkt in der Werkstatt?",
    answer: "Nein, Sie zahlen den fairen Marktpreis. Wir erheben lediglich eine Servicegebühr für die Vermittlung der Express-Slots.",
  },
];

export default function BerlinPage() {
  return (
    <main className="min-h-screen bg-slate-light">
      <CityHero 
        city="Berlin"
        headline="Fahrrad Reparatur Express Berlin"
        subtext="Dein Kiez, Dein Bike, Dein Express-Termin. Ohne Wartezeit zurück auf die Berliner Straßen."
      />

      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-safety-orange font-black uppercase tracking-[0.3em] text-sm mb-4 block">VeloDash Impact</span>
            <h2 className="text-5xl md:text-6xl font-black text-carbon-black tracking-tighter leading-none">
              Warum Berlin auf uns <span className="text-safety-orange">abfährt.</span>
            </h2>
          </div>
          <p className="text-slate-medium font-medium text-lg max-w-sm">
            Die smarte Lösung für eine fahrradfreundliche Hauptstadt. Schnell, digital und gnadenlos effizient.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {BENEFITS.map((benefit, i) => (
            <div key={benefit.title} className="bg-white p-10 rounded-[2rem] premium-shadow border border-slate-light group hover:border-safety-orange transition-all duration-500">
              <div className="w-16 h-16 bg-carbon-black text-safety-orange rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-6">
                <benefit.icon className="w-8 h-8 fill-current" />
              </div>
              <h3 className="text-2xl font-black text-carbon-black tracking-tighter mb-4 uppercase italic">
                {String(i + 1).padStart(2, '0')}. {benefit.title}
              </h3>
              <p className="text-slate-medium font-medium leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 bg-carbon-black text-white relative overflow-hidden">
        {/* Abstract background shape */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-safety-orange/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-safety-orange font-black uppercase tracking-[0.4em] text-xs mb-4 block">Booking Engine</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic">EXPRESS CHECK-IN</h2>
            <div className="w-24 h-2 bg-safety-orange mx-auto" />
          </div>
          <BookingFlow />
        </div>
      </section>

      <section className="py-32 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
        <div className="lg:col-span-5">
          <span className="text-safety-orange font-black uppercase tracking-[0.3em] text-sm mb-4 block">Help Center</span>
          <h2 className="text-5xl font-black text-carbon-black tracking-tighter mb-8 italic leading-none">NOCH FRAGEN? <br/>WIR HABEN <br/>ANTWORTEN.</h2>
          <div className="bg-safety-orange h-px w-full mb-12 opacity-30" />
          <p className="text-slate-medium font-medium text-xl">
            Alles was du über den schnellsten Bike-Service Berlins wissen musst.
          </p>
        </div>
        
        <div className="lg:col-span-7 space-y-6">
          {FAQS.map((faq) => (
            <div key={faq.question} className="bg-white p-8 rounded-premium premium-shadow border border-slate-light group hover:border-slate-medium transition-all">
              <h3 className="text-xl font-black text-carbon-black tracking-tighter mb-4 flex items-center gap-4 group-hover:text-safety-orange transition-colors">
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                {faq.question}
              </h3>
              <p className="text-slate-medium font-medium leading-relaxed pl-9">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 bg-slate-light">
        <div className="container mx-auto px-6 max-w-4xl">
          <WaitlistForm />
        </div>
      </section>

      <footer className="py-20 bg-carbon-black text-white border-t border-white/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
          <div>
            <div className="text-3xl font-black tracking-tighter mb-2 italic">VELO<span className="text-safety-orange">DASH</span></div>
            <p className="text-slate-medium text-sm font-bold uppercase tracking-widest">Berlin City Edition</p>
          </div>
          <div className="text-slate-medium text-xs font-black uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} — Premium Bicycle Logistics & Repair Slots
          </div>
        </div>
      </footer>
    </main>
  );
}

import { Metadata } from "next";
import CityHero from "@/components/CityHero";
import BookingFlow from "@/components/BookingFlow";
import WaitlistForm from "@/components/WaitlistForm";
import { CheckCircle2, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Fahrrad Reparatur Express Köln | VeloDash",
  description: "Buchen Sie Ihren Kölner Fahrrad-Reparaturtermin in Rekordzeit. Express-Service für Rennräder, MTBs und E-Bikes in der Domstadt.",
};

const BENEFITS = [
  {
    title: "Veedel-Speed",
    description: "Von Ehrenfeld bis Deutz – wir finden den nächsten freien Express-Slot für Ihr Bike.",
    icon: Zap,
  },
  {
    title: "Zertifiziert",
    description: "Unsere Kölner Partnerwerkstätten werden regelmäßig auf Qualität und Schnelligkeit geprüft.",
    icon: ShieldCheck,
  },
  {
    title: "Smarte Schätzung",
    description: "Dank AI-Modell erhalten Sie sofort einen fairen Preisvorschlag für Ihre Reparatur am Rhein.",
    icon: CheckCircle2,
  },
];

const FAQS = [
  {
    question: "Repariert ihr auch E-Bikes in Köln?",
    answer: "Selbstverständlich! Unsere Partner in Köln sind Experten für moderne E-Bike-Systeme wie Bosch, Shimano und Brose.",
  },
  {
    question: "Wie funktioniert die Bezahlung?",
    answer: "Bequem und sicher online via Stripe nach der Terminbuchung. So ist alles erledigt, wenn Sie Ihr Rad abholen.",
  },
  {
    question: "Wo finde ich die Werkstätten?",
    answer: "Nach der Auswahl eines Slots zeigen wir Ihnen die genaue Adresse der Kölner Partnerwerkstatt an.",
  },
];

export default function KoelnPage() {
  return (
    <main className="min-h-screen bg-slate-light">
      <CityHero 
        city="Köln"
        headline="Fahrrad Reparatur Express Köln"
        subtext="Schnelle Hilfe in der Domstadt. Buchen Sie Ihren Kölner Reparatur-Slot in wenigen Klicks. Mit Hätz und High-Tech."
      />

      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-safety-orange font-black uppercase tracking-[0.3em] text-sm mb-4 block">Rheinische Effizienz</span>
            <h2 className="text-5xl md:text-6xl font-black text-carbon-black tracking-tighter leading-none">
              Der schnellste Weg zur fahrbereiten <span className="text-safety-orange">Leeze.</span>
            </h2>
          </div>
          <p className="text-slate-medium font-medium text-lg max-w-sm">
            Die smarte Lösung für ein fahrradfreundliches Köln. Schnell, digital und gnadenlos effizient.
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
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic uppercase">SLOT RESERVIEREN</h2>
            <div className="w-24 h-2 bg-safety-orange mx-auto" />
          </div>
          <BookingFlow />
        </div>
      </section>

      <section className="py-32 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
        <div className="lg:col-span-5">
          <span className="text-safety-orange font-black uppercase tracking-[0.3em] text-sm mb-4 block">FAQ Köln</span>
          <h2 className="text-5xl font-black text-carbon-black tracking-tighter mb-8 italic leading-none uppercase">FRAGEN? <br/>KÖLNER <br/>ANTWORTEN.</h2>
          <div className="bg-safety-orange h-px w-full mb-12 opacity-30" />
          <p className="text-slate-medium font-medium text-xl">
            Alles was du über den schnellsten Bike-Service in der Domstadt wissen musst.
          </p>
        </div>
        
        <div className="lg:col-span-7 space-y-6">
          {FAQS.map((faq) => (
            <div key={faq.question} className="bg-white p-8 rounded-premium premium-shadow border border-slate-light group hover:border-slate-medium transition-all">
              <h3 className="text-xl font-black text-carbon-black tracking-tighter mb-4 flex items-center gap-4 group-hover:text-safety-orange transition-colors uppercase">
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
            <p className="text-slate-medium text-sm font-bold uppercase tracking-widest">Köln City Edition</p>
          </div>
          <div className="text-slate-medium text-xs font-black uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} — Premium Bicycle Logistics & Repair Slots
          </div>
        </div>
      </footer>
    </main>
  );
}

import { Metadata } from "next";
import CityHero from "@/components/CityHero";
import BookingFlow from "@/components/BookingFlow";
import WaitlistForm from "@/components/WaitlistForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Fahrrad Reparatur Express Hamburg | VeloDash",
  description: "Buchen Sie Ihren Hamburger Fahrrad-Reparaturtermin in Rekordzeit. Express-Service für Rennräder, MTBs und E-Bikes in der Hansestadt.",
};

const BENEFITS = [
  {
    title: "Hanseaten-Speed",
    description: "Vom Fischmarkt bis zur Alster – wir finden den schnellsten Slot in Ihrer Nachbarschaft.",
    icon: Zap,
  },
  {
    title: "Premium Partner",
    description: "Nur handverlesene Hamburger Betriebe mit höchster Servicequalität werden Teil unseres Netzwerks.",
    icon: ShieldCheck,
  },
  {
    title: "Full Transparency",
    description: "Keine Überraschungen an der Elbe. Sie erhalten eine verbindliche AI-Preisschätzung vorab.",
    icon: CheckCircle2,
  },
];

const FAQS = [
  {
    question: "Gibt es auch Service für Lastenräder in Hamburg?",
    answer: "Ja, viele unserer Hamburger Partner sind auf die in der Stadt beliebten Lastenräder und E-Bikes spezialisiert.",
  },
  {
    question: "Wie finde ich eine Werkstatt in Altona oder Eimsbüttel?",
    answer: "Unser System nutzt Ihren Standort (optional) oder Ihre Postleitzahl, um Werkstätten in direkter Nähe zu finden.",
  },
  {
    question: "Kann ich den Termin kurzfristig absagen?",
    answer: "Stornierungen sind bis zu 2 Stunden vor dem Termin kostenfrei über Ihr Dashboard möglich.",
  },
];

export default function HamburgPage() {
  return (
    <main className="min-h-screen bg-slate-light">
      <Navbar />
      
      <CityHero 
        city="Hamburg"
        headline="Fahrrad Reparatur Express Hamburg"
        subtext="Express-Termine in der Hansestadt. Professioneller Service ohne lange Wartezeiten für echte Hamburger Biker."
      />

      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-safety-orange font-black uppercase tracking-[0.3em] text-sm mb-4 block">Hanseatic Excellence</span>
            <h2 className="text-5xl md:text-6xl font-black text-carbon-black tracking-tighter leading-none uppercase italic">
              VeloDash Hamburg <br /><span className="text-safety-orange">Standard.</span>
            </h2>
          </div>
          <p className="text-slate-medium font-medium text-lg max-w-sm italic">
            Hanseatische Zuverlässigkeit trifft auf modernste AI-Logistik. Wir machen Hamburg fahrradfit.
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

      <section id="booking" className="py-32 bg-carbon-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-safety-orange/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-safety-orange font-black uppercase tracking-[0.4em] text-xs mb-4 block">Hansa Booking</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic uppercase">SLOT RESERVIEREN</h2>
            <div className="w-24 h-2 bg-safety-orange mx-auto" />
          </div>
          <BookingFlow />
        </div>
      </section>

      <section className="py-32 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
        <div className="lg:col-span-5">
          <span className="text-safety-orange font-black uppercase tracking-[0.3em] text-sm mb-4 block">FAQ Hamburg</span>
          <h2 className="text-5xl font-black text-carbon-black tracking-tighter mb-8 italic leading-none uppercase">FRAGEN? <br/>ALLES KLAR <br/>AN BORD?</h2>
          <div className="bg-safety-orange h-px w-full mb-12 opacity-30" />
          <p className="text-slate-medium font-medium text-xl">
            Damit du keine Zeit im Hamburger Schietwetter verlierst.
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

      <section id="waitlist" className="py-32 bg-slate-light">
        <div className="container mx-auto px-6 max-w-4xl">
          <WaitlistForm />
        </div>
      </section>

      <Footer city="Hansestadt Hamburg Edition" />
    </main>
  );
}

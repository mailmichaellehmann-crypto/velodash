import { Metadata } from "next";
import CityHero from "@/components/CityHero";
import BookingFlow from "@/components/BookingFlow";
import WaitlistForm from "@/components/WaitlistForm";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Fahrrad Reparatur Express Hamburg | VeloDash",
  description: "Buchen Sie Ihren Hamburger Fahrrad-Reparaturtermin in Rekordzeit. Express-Service für Rennräder, MTBs und E-Bikes in der Hansestadt.",
};

const BENEFITS = [
  {
    title: "Hanseatische Schnelligkeit",
    description: "Vom Fischmarkt bis zur Alster – wir finden den schnellsten Slot in Ihrer Nachbarschaft.",
    icon: Zap,
  },
  {
    title: "Premium Werkstätten",
    description: "Nur handverlesene Hamburger Betriebe mit höchster Servicequalität werden Teil unseres Netzwerks.",
    icon: ShieldCheck,
  },
  {
    title: "Volle Preistransparenz",
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
    <main className="min-h-screen bg-white">
      <CityHero 
        city="Hamburg"
        headline="Fahrrad Reparatur Express Hamburg"
        subtext="Express-Termine in der Hansestadt. Professioneller Service ohne lange Wartezeiten."
      />

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Warum VeloDash in Hamburg?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Effiziente Lösungen für Hamburger Pendler und Freizeitradler.</p>
        </div>
        
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          {BENEFITS.map((benefit) => (
            <div key={benefit.title} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center mb-12">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Schnell-Buchung</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">Termin in Hamburg sichern</h2>
        </div>
        <BookingFlow />
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Häufig gestellte Fragen (FAQ)</h2>
          <div className="space-y-8">
            {FAQS.map((faq) => (
              <div key={faq.question} className="border-b border-slate-800 pb-8">
                <h3 className="text-xl font-semibold mb-4">{faq.question}</h3>
                <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <WaitlistForm />
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100 bg-slate-50">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>© {new Date().getFullYear()} VeloDash Express. Hansestadt Hamburg Edition.</p>
        </div>
      </footer>
    </main>
  );
}

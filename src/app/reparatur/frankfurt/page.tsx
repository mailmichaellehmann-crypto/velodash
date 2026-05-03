import { Metadata } from "next";
import CityHero from "@/components/CityHero";
import BookingFlow from "@/components/BookingFlow";
import WaitlistForm from "@/components/WaitlistForm";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Fahrrad Reparatur Express Frankfurt | VeloDash",
  description: "Buchen Sie Ihren Frankfurter Fahrrad-Reparaturtermin in Rekordzeit. Express-Service für Rennräder, MTBs und E-Bikes in der Mainmetropole.",
};

const BENEFITS = [
  {
    title: "Main-Tempo",
    description: "Vom Bankenviertel bis Bornheim – wir finden den nächsten freien Express-Slot für Ihr Bike.",
    icon: Zap,
  },
  {
    title: "Qualität aus Frankfurt",
    description: "Unsere Frankfurter Partnerwerkstätten sind auf High-Performance Räder und E-Bikes spezialisiert.",
    icon: ShieldCheck,
  },
  {
    title: "Echtzeit-Buchung",
    description: "Keine Warteschleifen am Telefon. Buchen Sie Ihren Termin in Frankfurt einfach digital.",
    icon: CheckCircle2,
  },
];

const FAQS = [
  {
    question: "Gibt es Werkstätten in der Nähe der Zeil?",
    answer: "Ja, wir haben mehrere Partner direkt in der Frankfurter Innenstadt und den angrenzenden Vierteln.",
  },
  {
    question: "Kann ich mein E-Bike zur Inspektion bringen?",
    answer: "Absolut. Unsere Frankfurter Mechaniker führen professionelle Inspektionen für alle gängigen E-Bike-Marken durch.",
  },
  {
    question: "Was passiert, wenn die Reparatur länger dauert?",
    answer: "Sollte die Reparatur wider Erwarten länger dauern, informiert Sie die Werkstatt umgehend via VeloDash.",
  },
];

export default function FrankfurtPage() {
  return (
    <main className="min-h-screen bg-white">
      <CityHero 
        city="Frankfurt"
        headline="Fahrrad Reparatur Express Frankfurt"
        subtext="Schnelle Hilfe in der Mainmetropole. Buchen Sie Ihren Frankfurter Reparatur-Slot in wenigen Sekunden."
      />

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Warum VeloDash in Frankfurt?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Die effizienteste Art, Ihr Fahrrad in Frankfurt am Main reparieren zu lassen.</p>
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
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Express-Service</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">Frankfurter Termin jetzt buchen</h2>
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
          <p>© {new Date().getFullYear()} VeloDash Express. Frankfurter Service-Power.</p>
        </div>
      </footer>
    </main>
  );
}

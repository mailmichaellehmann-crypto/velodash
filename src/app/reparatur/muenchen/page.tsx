import { Metadata } from "next";
import CityHero from "@/components/CityHero";
import BookingFlow from "@/components/BookingFlow";
import WaitlistForm from "@/components/WaitlistForm";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Fahrrad Reparatur Express München | VeloDash",
  description: "Buchen Sie Ihren Münchner Fahrrad-Reparaturtermin in Rekordzeit. Express-Service für Rennräder, MTBs und E-Bikes in ganz München.",
};

const BENEFITS = [
  {
    title: "Express-Abwicklung",
    description: "Keine Wochenlangen Wartezeiten. Wir finden den nächsten freien Slot in Ihrer Nähe.",
    icon: Zap,
  },
  {
    title: "Geprüfte Qualität",
    description: "Unsere Münchner Partnerwerkstätten sind zertifiziert und auf Premium-Bikes spezialisiert.",
    icon: ShieldCheck,
  },
  {
    title: "Festpreis-Garantie",
    description: "Dank AI-Schätzung wissen Sie schon vor der Buchung, was die Reparatur kosten wird.",
    icon: CheckCircle2,
  },
];

const FAQS = [
  {
    question: "Wie schnell bekomme ich einen Termin in München?",
    answer: "In der Regel finden wir innerhalb von 24 Stunden einen Express-Slot bei einer unserer Partnerwerkstätten.",
  },
  {
    question: "Welche Stadtteile werden abgedeckt?",
    answer: "Wir decken das gesamte Münchener Stadtgebiet ab, von Schwabing über Haidhausen bis nach Sendling.",
  },
  {
    question: "Muss ich mein Fahrrad bringen?",
    answer: "Ja, Sie bringen Ihr Fahrrad zum gebuchten Slot in die Werkstatt. Viele Partner bieten jedoch optionalen Hol- und Bringservice an.",
  },
];

export default function MuenchenPage() {
  return (
    <main className="min-h-screen bg-white">
      <CityHero 
        city="München"
        headline="Fahrrad Reparatur Express München"
        subtext="Buchen Sie jetzt Ihren nächsten Premium-Slot bei den besten Münchner Mechanikern."
      />

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Warum VeloDash in München?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Wir verbinden leidenschaftliche Münchner Radfahrer mit den effizientesten Werkstätten der Stadt.</p>
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
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Jetzt Buchen</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">Fahrrad-Service in 3 Minuten buchen</h2>
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
          <p>© {new Date().getFullYear()} VeloDash Express. Alle Rechte vorbehalten. Münchner Servicequalität.</p>
        </div>
      </footer>
    </main>
  );
}

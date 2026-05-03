import { Metadata } from "next";
import CityHero from "@/components/CityHero";
import BookingFlow from "@/components/BookingFlow";
import WaitlistForm from "@/components/WaitlistForm";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

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
    title: "Berliner Meisterwerkstätten",
    description: "Handverlesene Experten, die Ihr Bike mit höchster Präzision reparieren.",
    icon: ShieldCheck,
  },
  {
    title: "AI-Preiskontrolle",
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
    <main className="min-h-screen bg-white">
      <CityHero 
        city="Berlin"
        headline="Fahrrad Reparatur Express Berlin"
        subtext="Dein Kiez, Dein Bike, Dein Express-Termin. Ohne Wartezeit zurück auf die Straße."
      />

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Warum VeloDash in Berlin?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Die smarte Lösung für ein fahrradfreundliches Berlin.</p>
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
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Express-Check-In</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4">Berliner Termin jetzt buchen</h2>
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
          <p>© {new Date().getFullYear()} VeloDash Express. Berliner Kiez-Service.</p>
        </div>
      </footer>
    </main>
  );
}

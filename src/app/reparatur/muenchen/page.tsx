import { Metadata } from "next";
import CityHero from "@/components/CityHero";
import BookingFlow from "@/components/BookingFlow";
import WaitlistForm from "@/components/WaitlistForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, ShieldCheck, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Fahrrad Reparatur Express München | VeloDash",
  description: "Buchen Sie Ihren Münchner Fahrrad-Reparaturtermin in Rekordzeit. Express-Service für Rennräder, MTBs und E-Bikes in ganz München.",
};

const BENEFITS = [
  {
    title: "Schwabing-Speed",
    description: "Von Sendling bis Schwabing – wir finden den nächsten freien Slot in Ihrer Nachbarschaft.",
    icon: Zap,
  },
  {
    title: "Premium Partner",
    description: "Unsere Münchner Partnerwerkstätten sind zertifiziert und auf Premium-Bikes spezialisiert.",
    icon: ShieldCheck,
  },
  {
    title: "AI-Estimation",
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
    <main className="min-h-screen bg-slate-light">
      <Navbar />
      
      <CityHero 
        city="München"
        headline="Fahrrad Reparatur Express München"
        subtext="Buchen Sie jetzt Ihren nächsten Premium-Slot bei den besten Münchner Mechanikern. Schnell, digital, exzellent."
      />

      <section className="py-32 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-safety-orange font-black uppercase tracking-[0.3em] text-sm mb-4 block">Bavarian Engineering</span>
            <h2 className="text-5xl md:text-6xl font-black text-carbon-black tracking-tighter leading-none">
              Münchner Qualität trifft auf <span className="text-safety-orange">High-Speed.</span>
            </h2>
          </div>
          <p className="text-slate-medium font-medium text-lg max-w-sm">
            Die smarte Lösung für leidenschaftliche Münchner Radfahrer. Effizient, zuverlässig und absolut transparent.
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
        {/* Abstract background shape */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-safety-orange/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-safety-orange font-black uppercase tracking-[0.4em] text-xs mb-4 block">Premium Booking</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 italic uppercase">SLOT RESERVIEREN</h2>
            <div className="w-24 h-2 bg-safety-orange mx-auto" />
          </div>
          <BookingFlow />
        </div>
      </section>

      <section className="py-32 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
        <div className="lg:col-span-5">
          <span className="text-safety-orange font-black uppercase tracking-[0.3em] text-sm mb-4 block">FAQ München</span>
          <h2 className="text-5xl font-black text-carbon-black tracking-tighter mb-8 italic leading-none uppercase">FRAGEN? <br/>MÜNCHNER <br/>ANTWORTEN.</h2>
          <div className="bg-safety-orange h-px w-full mb-12 opacity-30" />
          <p className="text-slate-medium font-medium text-xl">
            Alles was du über den schnellsten Bike-Service in der bayerischen Landeshauptstadt wissen musst.
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

      <Footer city="München Edition" />
    </main>
  );
}

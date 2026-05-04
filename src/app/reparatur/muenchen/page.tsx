import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CityHero from "@/components/CityHero";
import BookingFlow from "@/components/BookingFlow";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata = {
  title: 'Fahrrad Reparatur München | Express Service | VeloDash',
  description: 'Buche deinen Fahrrad Reparatur Termin in München in Sekunden. Express Slots für E-Bikes, Rennräder und City Bikes.',
};

export default function MuenchenPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <CityHero 
        city="München"
        headline={<>Fahrrad Reparatur <span className="text-accent-coral">München Express.</span></>}
        subtext="Servus! Ob Isar-Radler oder Pendler – wir finden für dich den nächsten freien Werkstatt-Slot in München. Premium Service garantiert."
      />

      <section className="py-12 bg-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-slate-100" />
        <BookingFlow />
      </section>

      <section className="py-32 bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-4xl">
          <WaitlistForm />
        </div>
      </section>

      <Footer city="München Edition" />
    </main>
  );
}

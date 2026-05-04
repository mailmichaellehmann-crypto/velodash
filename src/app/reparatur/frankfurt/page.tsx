import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CityHero from "@/components/CityHero";
import BookingFlow from "@/components/BookingFlow";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata = {
  title: 'Fahrrad Reparatur Frankfurt | Express Service | VeloDash',
  description: 'Buche deinen Fahrrad Reparatur Termin in Frankfurt in Sekunden. Express Slots für E-Bikes, Rennräder und City Bikes.',
};

export default function FrankfurtPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <CityHero 
        city="Frankfurt"
        headline={<>Fahrrad Reparatur <span className="text-slate-900 underline decoration-blue-electric">Frankfurt Express.</span></>}
        subtext="Main-Metropole aufgepasst: Wir digitalisieren die Werkstatt-Suche. Finde deinen Reparatur-Slot in Frankfurt schneller als du 'Grie Soß' sagen kannst."
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

      <Footer city="Frankfurt Edition" />
    </main>
  );
}

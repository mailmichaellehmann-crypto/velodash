import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CityHero from "@/components/CityHero";
import BookingFlow from "@/components/BookingFlow";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata = {
  title: 'Fahrrad Reparatur Köln | Express Service | VeloDash',
  description: 'Buche deinen Fahrrad Reparatur Termin in Köln in Sekunden. Express Slots für E-Bikes, Rennräder und City Bikes.',
};

export default function KoelnPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <CityHero 
        city="Köln"
        headline={<>Fahrrad Reparatur <span className="text-indigo-vibrant">Köln Express.</span></>}
        subtext="Et hätt noch emmer joot jejange! Wir sorgen dafür, dass dein Bike in Köln ruckzuck wieder fit ist. Dein Express-Ticket zur Werkstatt."
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

      <Footer city="Köln Edition" />
    </main>
  );
}

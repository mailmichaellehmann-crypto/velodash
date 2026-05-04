import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CityHero from "@/components/CityHero";
import BookingFlow from "@/components/BookingFlow";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata = {
  title: 'Fahrrad Reparatur Hamburg | Express Service | VeloDash',
  description: 'Buche deinen Fahrrad Reparatur Termin in Hamburg in Sekunden. Express Slots für E-Bikes, Rennräder und City Bikes.',
};

export default function HamburgPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <CityHero 
        city="Hamburg"
        headline={<>Fahrrad Reparatur <span className="text-green-lime">Hamburg Express.</span></>}
        subtext="Von der Schanze bis nach Blankenese. Wir bringen dein Rad schneller zurück auf die Straße als jede andere Werkstatt in der Hansestadt."
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

      <Footer city="Hamburg Edition" />
    </main>
  );
}

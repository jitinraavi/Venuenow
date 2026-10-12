import React from 'react';
import { WeddingProvider, useWedding } from './context/WeddingContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { VenuesView } from './components/VenuesView';
import { CateringView } from './components/CateringView';
import { DecorView } from './components/DecorView';
import { PhotographyView } from './components/PhotographyView';
import { ChauffeursView } from './components/ChauffeursView';
import { HoneymoonView } from './components/HoneymoonView';
import { PlannerView } from './components/PlannerView';
import { VendorPortalView } from './components/VendorPortalView';
import { CartDrawer } from './components/CartDrawer';
import {
  Smartphone,
  Monitor,
  PhoneCall,
  Mail,
  ShieldCheck
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, isMobileAppView, setIsMobileAppView } = useWedding();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'venues':
        return <VenuesView />;
      case 'catering':
        return <CateringView />;
      case 'decor':
        return <DecorView />;
      case 'photography':
        return <PhotographyView />;
      case 'chauffeurs':
        return <ChauffeursView />;
      case 'honeymoon':
        return <HoneymoonView />;
      case 'planner':
        return <PlannerView />;
      case 'vendor-portal':
        return <VendorPortalView />;
      default:
        return <VenuesView />;
    }
  };

  if (isMobileAppView) {
    return (
      <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-2 sm:p-6">
        {/* Device Switcher Header in Mobile Simulation Mode */}
        <div className="mb-4 flex items-center justify-between w-full max-w-[420px] text-white text-xs px-2">
          <div className="flex items-center gap-1.5 text-stone-300 font-semibold">
            <Smartphone className="w-4 h-4 text-gold-400" />
            <span>VenueNow Native App Simulator</span>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileAppView(false)}
            className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-gold-300 border border-stone-700 rounded-full font-bold transition flex items-center gap-1"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Switch to Web App</span>
          </button>
        </div>

        {/* Smartphone Shell Frame */}
        <div className="w-full max-w-[420px] h-[860px] bg-white rounded-[44px] shadow-2xl border-[10px] border-stone-800 overflow-hidden flex flex-col relative">
          {/* Dynamic Island / Notch */}
          <div className="w-full bg-white pt-3 pb-1 flex justify-center items-center z-50 shrink-0">
            <div className="w-24 h-5 bg-stone-900 rounded-full flex items-center justify-end pr-2">
              <div className="w-2.5 h-2.5 rounded-full bg-stone-800 border border-stone-700" />
            </div>
          </div>

          {/* App Navbar */}
          <Navbar />

          {/* Scrollable Mobile Viewport */}
          <main className="flex-1 overflow-y-auto px-4 py-4 pb-20 bg-[#FAF7F2]">
            {renderActiveView()}
          </main>

          {/* Mobile App Bottom Tab Bar */}
          <MobileBottomNav />

          <CartDrawer />
        </div>
      </div>
    );
  }

  // Full-Width Responsive Web Application Layout
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24">
        {renderActiveView()}
      </main>

      {/* Luxury Footer */}
      <footer className="bg-stone-900 text-stone-400 text-xs border-t border-stone-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gold-600 flex items-center justify-center text-white font-bold">
                  💍
                </div>
                <span className="font-serif text-xl font-bold text-white tracking-tight">
                  Venue<span className="text-gold-500">Now</span>
                </span>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed">
                The comprehensive end-to-end wedding ecosystem. Curating royal destination palaces, haute gastronomy menus, bespoke decor, cinematic studios, luxury fleets, and Skyscanner-compared honeymoon escapes.
              </p>
            </div>

            <div>
              <h4 className="text-stone-200 font-bold uppercase tracking-wider text-[11px] mb-3">
                Wedding Services
              </h4>
              <ul className="space-y-2">
                <li><a href="#venues" className="hover:text-gold-400 transition">Heritage Palaces & Resorts</a></li>
                <li><a href="#catering" className="hover:text-gold-400 transition">Haute Gastronomy & Jain Menus</a></li>
                <li><a href="#decor" className="hover:text-gold-400 transition">Scenography & Mandap Decor</a></li>
                <li><a href="#photography" className="hover:text-gold-400 transition">4K Documentary Cinematography</a></li>
                <li><a href="#chauffeurs" className="hover:text-gold-400 transition">Vintage Rolls Royce Fleets</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-stone-200 font-bold uppercase tracking-wider text-[11px] mb-3">
                Honeymoon Comparator
              </h4>
              <ul className="space-y-2">
                <li><span className="text-stone-500">Benchmark Skyscanner Deals</span></li>
                <li><span className="text-stone-500">Booking.com Genius Tier Compare</span></li>
                <li><span className="text-stone-500">Maldives Overwater Lagoons</span></li>
                <li><span className="text-stone-500">Swiss Alps Mountain Chalets</span></li>
                <li><span className="text-stone-500">Santorini & Amalfi Sunset Suites</span></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-stone-200 font-bold uppercase tracking-wider text-[11px] mb-3">
                Concierge Assistance
              </h4>
              <div className="flex items-center gap-2 text-stone-300">
                <PhoneCall className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+91 (0294) 800-VENUE (Toll Free)</span>
              </div>
              <div className="flex items-center gap-2 text-stone-300">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>vip.concierge@venuenow.luxury</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-400 pt-1">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Price Lock Guarantee & Escrow Protection</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
            <div>
              © 2026 VenueNow Technologies Inc. All rights reserved.
            </div>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Vendor Code of Ethics</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Nav for Mobile Screens */}
      <div className="sm:hidden">
        <MobileBottomNav />
      </div>

      <CartDrawer />
    </div>
  );
};

export function App() {
  return (
    <WeddingProvider>
      <MainContent />
    </WeddingProvider>
  );
}

export default App;

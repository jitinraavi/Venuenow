import React from 'react';
import {
  Castle,
  UtensilsCrossed,
  Palette,
  Camera,
  Car,
  PlaneTakeoff,
  Calculator,
  Briefcase
} from 'lucide-react';
import { useWedding } from '../context/WeddingContext';
import type { ActiveTab } from '../context/WeddingContext';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, cartItemCount } = useWedding();

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'venues', label: 'Venues', icon: <Castle className="w-4 h-4" /> },
    { id: 'catering', label: 'Catering', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'decor', label: 'Decor', icon: <Palette className="w-4 h-4" /> },
    { id: 'photography', label: 'Photo', icon: <Camera className="w-4 h-4" /> },
    { id: 'chauffeurs', label: 'Cars', icon: <Car className="w-4 h-4" /> },
    { id: 'honeymoon', label: 'Trips', icon: <PlaneTakeoff className="w-4 h-4" /> },
    {
      id: 'planner',
      label: 'Cart',
      icon: (
        <div className="relative">
          <Calculator className="w-4 h-4" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-rosewine-500 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
              {cartItemCount}
            </span>
          )}
        </div>
      )
    },
    { id: 'vendor-portal', label: 'Portal', icon: <Briefcase className="w-4 h-4 text-emerald-600" /> }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-1 py-1.5 flex items-center justify-around shadow-lg">
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-xl transition cursor-pointer ${
              isActive ? 'text-gold-600 font-bold scale-105' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            {tab.icon}
            <span className="text-[9px] tracking-tight whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

import React from 'react';
import { User, UserRole } from '../types';
import { 
  LayoutDashboard, 
  Coins, 
  UtensilsCrossed, 
  Briefcase, 
  HeartHandshake, 
  ShieldCheck, 
  BarChart3, 
  Users, 
  Lock, 
  ChevronRight 
} from 'lucide-react';

interface SidebarProps {
  currentUser: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  isOpen
}) => {
  const isGlobalUser = currentUser.role === 'pdg' || currentUser.role === 'admin';

  const menuItems = [
    {
      id: 'global_dashboard',
      label: 'Tableau de Bord PDG',
      icon: LayoutDashboard,
      allowed: isGlobalUser,
      department: 'Global'
    },
    {
      id: 'bureau_or',
      label: 'Bureau',
      icon: Coins,
      allowed: isGlobalUser || currentUser.department === 'Bureau',
      department: 'Bureau'
    },
    {
      id: 'restaurant',
      label: 'Restaurant & Traiteur',
      icon: UtensilsCrossed,
      allowed: isGlobalUser || currentUser.department === 'Restaurant',
      department: 'Restaurant'
    },
    {
      id: 'services_divers',
      label: 'Services Divers',
      icon: Briefcase,
      allowed: isGlobalUser || currentUser.department === 'Services diverses',
      department: 'Services diverses'
    },
    {
      id: 'fondation_ilyassa',
      label: 'Fondation Ilyassa',
      icon: HeartHandshake,
      allowed: isGlobalUser || currentUser.department === 'Fondation Ilyassa',
      department: 'Fondation Ilyassa'
    },
    {
      id: 'rbac_management',
      label: 'Gestion des Rôles (RBAC)',
      icon: ShieldCheck,
      allowed: isGlobalUser,
      department: 'Administration'
    }
  ];

  return (
    <aside className={`
      fixed md:static inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-300 border-r border-slate-800 
      transform transition-transform duration-300 ease-in-out flex flex-col
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      {/* Brand / Logo */}
      <div className="h-18 px-6 flex items-center border-b border-slate-800/80 bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-md font-serif text-lg">
            BC
          </div>
          <div>
            <h1 className="text-white font-bold tracking-tight text-base font-serif">BureauCentral</h1>
            <p className="text-[11px] text-amber-400 font-medium">Direction Générale & Départements</p>
          </div>
        </div>
      </div>

      {/* Navigation list */}
      <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
          Navigation Principale
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isAllowed = item.allowed;

          if (!isAllowed && !isGlobalUser) return null;

          return (
            <button
              key={item.id}
              onClick={() => isAllowed && setActiveTab(item.id)}
              disabled={!isAllowed}
              className={`
                w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all
                ${isActive 
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-xs' 
                  : isAllowed 
                    ? 'text-slate-300 hover:bg-slate-800/60 hover:text-white' 
                    : 'text-slate-600 cursor-not-allowed opacity-50'}
              `}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              
              {!isAllowed ? (
                <Lock className="w-3.5 h-3.5 text-slate-600" />
              ) : (
                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-amber-400 translate-x-0.5' : 'text-slate-600'}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Role Notice Footer */}
      <div className="p-4 m-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
        <div className="flex items-center gap-2 mb-1.5 text-amber-400 font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>Sécurité RBAC Active</span>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          {isGlobalUser 
            ? 'Accès total PDG / Admin à tous les départements et bilans consolidés.' 
            : `Mode restreint : Accès exclusif au département ${currentUser.department}.`}
        </p>
      </div>
    </aside>
  );
};

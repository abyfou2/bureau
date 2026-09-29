import React from 'react';
import { 
  GoldTransaction, 
  RestaurantTransaction, 
  DiverseServiceRequest, 
  FoundationProject, 
  AuditLog 
} from '../types';
import { 
  Coins, 
  UtensilsCrossed, 
  Briefcase, 
  HeartHandshake, 
  TrendingUp, 
  ArrowUpRight, 
  Activity,
  Award,
  FileText
} from 'lucide-react';

interface GlobalDashboardProps {
  goldTransactions: GoldTransaction[];
  restaurantTransactions: RestaurantTransaction[];
  diverseServices: DiverseServiceRequest[];
  foundationProjects: FoundationProject[];
  auditLogs: AuditLog[];
  onNavigateTab: (tab: string) => void;
  onOpenAiModal: () => void;
  isAdmin: boolean;
}

export const GlobalDashboard: React.FC<GlobalDashboardProps> = ({
  goldTransactions,
  restaurantTransactions,
  diverseServices,
  foundationProjects,
  auditLogs,
  onNavigateTab,
  onOpenAiModal,
  isAdmin
}) => {
  const totalGoldKg = goldTransactions.reduce((acc, t) => t.type === 'achat' ? acc + t.weightKg : acc - t.weightKg, 15.5);
  const goldRevenue = goldTransactions.filter(t => t.type === 'vente').reduce((acc, t) => acc + t.totalAmount, 410000);
  
  const restaurantRecettes = restaurantTransactions.filter(t => t.type === 'recette').reduce((acc, t) => acc + t.amount, 465000);
  
  const servicesRevenue = diverseServices.filter(s => s.status === 'Traité' || s.status === 'Facturé' || s.status === 'En cours').reduce((acc, s) => acc + s.amount, 5000000);
  
  const foundationBeneficiaries = foundationProjects.reduce((acc, p) => acc + p.beneficiaries, 3500);

  return (
    <div className="space-y-8 pb-12">
      {/* Executive Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 rounded-2xl p-8 text-white shadow-lg border border-slate-700/50 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Pilotage Exécutif — Alh. Ilyassa & ABYFOU</span>
          </div>
          <h2 className="text-3xl font-serif font-bold tracking-tight mb-3">Tableau de Bord Général</h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Bienvenue sur le centre de pilotage de BureauCentral. Suivez en temps réel les performances financières du Bureau d'Or, du Restaurant (recettes/dépenses), des Services Divers et l'impact social de la Fondation Ilyassa.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenAiModal}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Générer le Bilan Stratégique IA</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Exporter le Bilan PDF</span>
            </button>
            <button
              onClick={() => onNavigateTab('bureau_or')}
              className="px-5 py-2.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium rounded-xl text-xs transition-all"
            >
              Inspecter le Bureau
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Bureau Or */}
        <div 
          onClick={() => onNavigateTab('bureau_or')}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Coins className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +14.8%
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Bureau d'Or & Lingots</p>
          <h3 className="text-2xl font-bold font-mono tabular-nums text-slate-900 mb-2">
            {totalGoldKg.toFixed(1)} <span className="text-sm font-sans font-normal text-slate-500">kg en réserve</span>
          </h3>
          <p className="text-xs text-slate-600">CA Ventes : <span className="font-semibold text-slate-900 font-mono">${goldRevenue.toLocaleString()}</span></p>
        </div>

        {/* Card 2: Restaurant */}
        <div 
          onClick={() => onNavigateTab('restaurant')}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> Exploitation
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Restaurant (Recettes)</p>
          <h3 className="text-2xl font-bold font-mono tabular-nums text-slate-900 mb-2">
            {restaurantRecettes.toLocaleString()} <span className="text-sm font-sans font-normal text-slate-500">FCFA</span>
          </h3>
          <p className="text-xs text-slate-600">Boissons, jus & charges suivis</p>
        </div>

        {/* Card 3: Services Divers */}
        <div 
          onClick={() => onNavigateTab('services_divers')}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +19.4%
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Services Divers</p>
          <h3 className="text-2xl font-bold font-mono tabular-nums text-slate-900 mb-2">
            {(servicesRevenue / 1000000).toFixed(1)}M <span className="text-sm font-sans font-normal text-slate-500">FCFA facturés</span>
          </h3>
          <p className="text-xs text-slate-600">Demandes en cours : <span className="font-semibold text-slate-900">{diverseServices.length} dossiers</span></p>
        </div>

        {/* Card 4: Fondation Ilyassa */}
        <div 
          onClick={() => onNavigateTab('fondation_ilyassa')}
          className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-rose-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
              Impact Social
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Fondation Ilyassa</p>
          <h3 className="text-2xl font-bold font-mono tabular-nums text-slate-900 mb-2">
            {foundationBeneficiaries.toLocaleString()} <span className="text-sm font-sans font-normal text-slate-500">bénéficiaires</span>
          </h3>
          <p className="text-xs text-slate-600">Projets actifs : <span className="font-semibold text-slate-900">{foundationProjects.length} programmes</span></p>
        </div>
      </div>

      {/* Detailed Department Breakdown Section */}
      <div className={`grid grid-cols-1 ${isAdmin ? 'lg:grid-cols-3' : 'lg:grid-cols-1'} gap-6`}>
        <div className={`${isAdmin ? 'lg:col-span-2' : 'col-span-1'} bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Répartition des Activités & Chiffre d'Affaires</h3>
              <p className="text-xs text-slate-500">Vue synthétique consolidée pour Alh. Ilyassa & ABYFOU</p>
            </div>
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
              Exercice 2026 (Devise : F CFA XAF)
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-slate-700 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Bureau (Or & Lingots)
                </span>
                <span className="font-mono font-semibold text-slate-900">68% du CA global</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-slate-700 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Services Divers & Logistique
                </span>
                <span className="font-mono font-semibold text-slate-900">22% du CA global</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '22%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-slate-700 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Restaurant (Recettes nettes)
                </span>
                <span className="font-mono font-semibold text-slate-900">10% du CA global</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Trésorerie Consolidée</p>
              <p className="text-lg font-bold font-mono text-slate-900 mt-1">45,200,000 F CFA</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Équipe Directrice</p>
              <p className="text-lg font-bold font-mono text-slate-900 mt-1">Alh. Ilyassa & ABYFOU</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/60">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Indice de Performance</p>
              <p className="text-lg font-bold font-mono text-emerald-600 mt-1">98.4 / 100</p>
            </div>
          </div>
        </div>

        {/* Right Col: Recent Audit Logs (Visible ONLY to Super Admin ABYFOU) */}
        {isAdmin && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900">Journal d'Audit & Sécurité</h3>
                <Activity className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-xs text-slate-500 mb-4">Réservé au Super Administrateur (ABYFOU)</p>

              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-900">{log.userName}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{log.timestamp}</span>
                    </div>
                    <p className="text-slate-600 line-clamp-2">{log.action}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[10px] px-2 py-0.5 rounded font-medium bg-amber-50 text-amber-800">
                        {log.department}
                      </span>
                      <span className="text-[10px] text-slate-600 font-medium">{log.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('rbac_management')}
              className="w-full mt-5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Gérer les Rôles et Utilisateurs (RBAC)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

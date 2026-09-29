import React, { useState } from 'react';
import { GoldTransaction } from '../types';
import { Coins, Plus, Scale, TrendingUp, ShieldCheck, FileText, CheckCircle2, Clock } from 'lucide-react';

interface BureauGoldViewProps {
  transactions: GoldTransaction[];
  onAddTransaction: (t: Omit<GoldTransaction, 'id'>) => void;
}

export const BureauGoldView: React.FC<BureauGoldViewProps> = ({
  transactions,
  onAddTransaction
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [type, setType] = useState<'achat' | 'vente'>('achat');
  const [weightKg, setWeightKg] = useState<number>(2.0);
  const [purity, setPurity] = useState<string>('24K');
  const [pricePerGram, setPricePerGram] = useState<number>(80.0);
  const [clientOrSupplier, setClientOrSupplier] = useState<string>('');

  const totalWeightKg = transactions.reduce((acc, t) => t.type === 'achat' ? acc + t.weightKg : acc - t.weightKg, 15.5);
  const totalValueUsd = totalWeightKg * 1000 * 81.5; // Estimated market value at ~$81.5/g

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientOrSupplier.trim()) return;

    const totalAmount = weightKg * 1000 * pricePerGram;
    onAddTransaction({
      type,
      weightKg,
      purity,
      pricePerGram,
      totalAmount,
      clientOrSupplier,
      date: new Date().toISOString().split('T')[0],
      status: 'Validé'
    });

    setClientOrSupplier('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Department Header */}
      <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-slate-900 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="absolute right-4 top-4 bg-slate-950/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-amber-500/40 text-right hidden sm:block">
          <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Cours Mondial Or (Spot)
          </div>
          <p className="text-lg font-mono font-bold text-white">$2,538.40 <span className="text-xs text-slate-400">/once</span></p>
          <p className="text-xs text-amber-300 font-mono">~$81.54 / gramme (+0.65%)</p>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-3">
            <Coins className="w-3.5 h-3.5" />
            <span>Département Officiel — Achat & Vente d'Or en Lingot</span>
          </div>
          <h2 className="text-3xl font-serif font-bold tracking-tight">Bureau</h2>
          <p className="text-amber-100/80 text-sm mt-1 max-w-xl">
            Gestion sécurisée des stocks physiques de lingots d'or, cotations boursières en temps réel, traçabilité et transactions certifiées.
          </p>
        </div>
        <div className="flex items-center gap-3 z-10">
          <button
            onClick={() => window.print()}
            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Exporter en PDF</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle Transaction Or</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Réserve Physique Totale</p>
          <h3 className="text-3xl font-bold font-mono tabular-nums text-slate-900 mb-1">
            {totalWeightKg.toFixed(2)} <span className="text-base font-sans font-normal text-slate-500">kg</span>
          </h3>
          <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> Certifié pureté 24K / 22K
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Valeur Estimée du Stock</p>
          <h3 className="text-3xl font-bold font-mono tabular-nums text-slate-900 mb-1">
            ${totalValueUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </h3>
          <p className="text-xs text-slate-500">Cours international : $81.50 / gramme</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Transactions Enregistrées</p>
          <h3 className="text-3xl font-bold font-mono tabular-nums text-slate-900 mb-1">
            {transactions.length} <span className="text-base font-sans font-normal text-slate-500">opérations</span>
          </h3>
          <p className="text-xs text-amber-600 font-medium">100% conformité LBMA</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Registre des Achats et Ventes de Lingots</h3>
            <p className="text-xs text-slate-500">Historique complet des flux d'or certifié</p>
          </div>
          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
            Mise à jour en direct
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Poids (kg)</th>
                <th className="py-3.5 px-6">Pureté</th>
                <th className="py-3.5 px-6">Prix / Gramme</th>
                <th className="py-3.5 px-6">Montant Total ($)</th>
                <th className="py-3.5 px-6">Fournisseur / Client</th>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-6">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-medium">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      t.type === 'achat' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
                    }`}>
                      {t.type === 'achat' ? 'Achat Or' : 'Vente Or'}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-mono font-bold text-slate-900">{t.weightKg} kg</td>
                  <td className="py-4 px-6 font-mono font-medium text-slate-700">{t.purity}</td>
                  <td className="py-4 px-6 font-mono text-slate-700">${t.pricePerGram.toFixed(2)}</td>
                  <td className="py-4 px-6 font-mono font-bold text-slate-900">${t.totalAmount.toLocaleString()}</td>
                  <td className="py-4 px-6 text-slate-800 font-medium">{t.clientOrSupplier}</td>
                  <td className="py-4 px-6 text-slate-500 text-xs font-mono">{t.date}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-serif">Enregistrer une Transaction d'Or</h3>
            <p className="text-xs text-slate-500 mb-6">Renseignez les détails du lingot et le montant de l'opération.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Type d'opération</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as 'achat' | 'vente')}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-500 font-medium"
                >
                  <option value="achat">Achat d'Or (Entrée stock)</option>
                  <option value="vente">Vente d'Or (Sortie stock)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Poids (en kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-500 font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pureté</label>
                  <select
                    value={purity}
                    onChange={(e) => setPurity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-500 font-mono"
                  >
                    <option value="24K">24K (Pur 999.9)</option>
                    <option value="22K">22K (916)</option>
                    <option value="18K">18K (750)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Prix par gramme ($)</label>
                <input
                  type="number"
                  step="0.1"
                  value={pricePerGram}
                  onChange={(e) => setPricePerGram(parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-500 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nom du Fournisseur ou Client</label>
                <input
                  type="text"
                  value={clientOrSupplier}
                  onChange={(e) => setClientOrSupplier(e.target.value)}
                  placeholder="ex: Mine Aurifère du Nord SA"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
                Montant total estimé : <span className="font-mono font-bold">${(weightKg * 1000 * pricePerGram).toLocaleString()}</span>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shadow-sm"
                >
                  Valider la Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

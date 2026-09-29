import React from 'react';
import { User, UserRole } from '../types';
import { ShieldCheck, X, UserCheck, Lock, CheckCircle2 } from 'lucide-react';

interface RoleManagementModalProps {
  users: User[];
  currentUser: User;
  onSwitchUser: (user: User) => void;
  onClose: () => void;
}

export const RoleManagementModal: React.FC<RoleManagementModalProps> = ({
  users,
  currentUser,
  onSwitchUser,
  onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Gestion des Rôles & Accès (RBAC)</h3>
              <p className="text-xs text-slate-500">Sélectionnez un profil pour tester l'interface spécifique du département ou la vue globale PDG</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {users.map((user) => {
            const isSelected = user.id === currentUser.id;

            return (
              <div
                key={user.id}
                onClick={() => {
                  onSwitchUser(user);
                  onClose();
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected 
                    ? 'border-amber-500 bg-amber-50/60 shadow-xs' 
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-xl object-cover border border-slate-300" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{user.name}</h4>
                      {isSelected && (
                        <span className="text-[10px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Actif
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{user.title}</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{user.email}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                    {user.department || 'Global'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Le contrôle d'accès restreint automatiquement les onglets selon le rôle.</span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

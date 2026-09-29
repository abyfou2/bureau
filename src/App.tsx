import React, { useState } from 'react';
import { 
  INITIAL_USERS, 
  INITIAL_GOLD_TRANSACTIONS, 
  INITIAL_RESTAURANT_TRANSACTIONS, 
  INITIAL_SERVICES_REQUESTS, 
  INITIAL_FOUNDATION_PROJECTS, 
  INITIAL_FOUNDATION_DONATIONS, 
  INITIAL_AUDIT_LOGS 
} from './mockData';
import { User, GoldTransaction, RestaurantTransaction, DiverseServiceRequest, FoundationProject, AuditLog } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { GlobalDashboard } from './components/GlobalDashboard';
import { BureauGoldView } from './components/BureauGoldView';
import { RestaurantView } from './components/RestaurantView';
import { ServicesDiversView } from './components/ServicesDiversView';
import { FondationIlyassaView } from './components/FondationIlyassaView';
import { RoleManagementModal } from './components/RoleManagementModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { Lock } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]); // Alh. Ilyassa (PDG) by default
  const [activeTab, setActiveTab] = useState<string>('global_dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // App Data State
  const [goldTransactions, setGoldTransactions] = useState<GoldTransaction[]>(INITIAL_GOLD_TRANSACTIONS);
  const [restaurantTransactions, setRestaurantTransactions] = useState<RestaurantTransaction[]>(INITIAL_RESTAURANT_TRANSACTIONS);
  const [diverseServices, setDiverseServices] = useState<DiverseServiceRequest[]>(INITIAL_SERVICES_REQUESTS);
  const [foundationProjects, setFoundationProjects] = useState<FoundationProject[]>(INITIAL_FOUNDATION_PROJECTS);
  const [foundationDonations] = useState(INITIAL_FOUNDATION_DONATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // Handlers for adding records with audit logs
  const handleAddGoldTransaction = (t: Omit<GoldTransaction, 'id'>) => {
    const newTx: GoldTransaction = { ...t, id: `gt-${Date.now()}` };
    setGoldTransactions([newTx, ...goldTransactions]);
    addAuditLog(`Ajout transaction ${t.type} (${t.weightKg} kg)`, 'Bureau');
  };

  const handleAddRestaurantTransaction = (t: Omit<RestaurantTransaction, 'id'>) => {
    const newTx: RestaurantTransaction = { ...t, id: `rt-${Date.now()}` };
    setRestaurantTransactions([newTx, ...restaurantTransactions]);
    addAuditLog(`Restaurant: Ajout ${t.type} (${t.category} - ${t.amount.toLocaleString()} FCFA)`, 'Restaurant');
  };

  const handleAddServiceRequest = (req: Omit<DiverseServiceRequest, 'id'>) => {
    const newReq: DiverseServiceRequest = { ...req, id: `dsr-${Date.now()}` };
    setDiverseServices([newReq, ...diverseServices]);
    addAuditLog(`Nouveau dossier service divers: ${req.clientName}`, 'Services diverses');
  };

  const handleAddFoundationProject = (p: Omit<FoundationProject, 'id'>) => {
    const newProj: FoundationProject = { ...p, id: `fp-${Date.now()}` };
    setFoundationProjects([newProj, ...foundationProjects]);
    addAuditLog(`Lancement projet humanitaire: ${p.title}`, 'Fondation Ilyassa');
  };

  const addAuditLog = (action: string, department: string) => {
    const newLog: AuditLog = {
      id: `al-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      userName: currentUser.name,
      role: currentUser.title,
      action,
      department
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  const handleSwitchUser = (user: User) => {
    setCurrentUser(user);
    if (user.role === 'bureau_manager') setActiveTab('bureau_or');
    else if (user.role === 'restaurant_manager') setActiveTab('restaurant');
    else if (user.role === 'services_manager') setActiveTab('services_divers');
    else if (user.role === 'fondation_manager') setActiveTab('fondation_ilyassa');
    else setActiveTab('global_dashboard');

    addAuditLog(`Changement de profil utilisateur vers ${user.name} (${user.title})`, 'Global');
  };

  const isGlobalUser = currentUser.role === 'pdg' || currentUser.role === 'admin';
  const checkAccess = (tab: string) => {
    if (isGlobalUser) return true;
    if (tab === 'bureau_or' && currentUser.department === 'Bureau') return true;
    if (tab === 'restaurant' && currentUser.department === 'Restaurant') return true;
    if (tab === 'services_divers' && currentUser.department === 'Services diverses') return true;
    if (tab === 'fondation_ilyassa' && currentUser.department === 'Fondation Ilyassa') return true;
    return false;
  };

  const getActiveDepartmentLabel = () => {
    switch (activeTab) {
      case 'global_dashboard': return 'Vue Globale PDG';
      case 'bureau_or': return 'Bureau d\'Or';
      case 'restaurant': return 'Restaurant (Comptabilité)';
      case 'services_divers': return 'Services Divers';
      case 'fondation_ilyassa': return 'Fondation Ilyassa';
      case 'rbac_management': return 'Administration RBAC';
      default: return 'Tableau de bord';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 antialiased selection:bg-amber-500 selection:text-white">
      <Header
        currentUser={currentUser}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        activeDepartmentLabel={getActiveDepartmentLabel()}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          currentUser={currentUser}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setIsSidebarOpen(false);
          }}
          isOpen={isSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {!checkAccess(activeTab) ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs my-12 space-y-4 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-900">Accès Restreint (RBAC)</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Votre profil actuel (<span className="font-semibold text-slate-900">{currentUser.title}</span>) ne dispose pas des droits nécessaires pour accéder à cette section.
                </p>
                <button
                  onClick={() => setIsRoleModalOpen(true)}
                  className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-xl text-xs hover:bg-slate-800 transition-colors"
                >
                  Changer de rôle pour y accéder
                </button>
              </div>
            ) : (
              <>
                {activeTab === 'global_dashboard' && (
                  <GlobalDashboard
                    goldTransactions={goldTransactions}
                    restaurantTransactions={restaurantTransactions}
                    diverseServices={diverseServices}
                    foundationProjects={foundationProjects}
                    auditLogs={auditLogs}
                    onNavigateTab={setActiveTab}
                    onOpenAiModal={() => setIsAiModalOpen(true)}
                    isAdmin={currentUser.role === 'admin'}
                  />
                )}

                {activeTab === 'bureau_or' && (
                  <BureauGoldView
                    transactions={goldTransactions}
                    onAddTransaction={handleAddGoldTransaction}
                  />
                )}

                {activeTab === 'restaurant' && (
                  <RestaurantView
                    transactions={restaurantTransactions}
                    onAddTransaction={handleAddRestaurantTransaction}
                  />
                )}

                {activeTab === 'services_divers' && (
                  <ServicesDiversView
                    requests={diverseServices}
                    onAddRequest={handleAddServiceRequest}
                  />
                )}

                {activeTab === 'fondation_ilyassa' && (
                  <FondationIlyassaView
                    projects={foundationProjects}
                    donations={foundationDonations}
                    onAddProject={handleAddFoundationProject}
                  />
                )}

                {activeTab === 'rbac_management' && (
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 font-serif">Matrice des Droits d'Accès (RBAC)</h3>
                        <p className="text-xs text-slate-500">Supervision des privilèges par rôle et département</p>
                      </div>
                      <button
                        onClick={() => setIsRoleModalOpen(true)}
                        className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors"
                      >
                        Changer de profil actif
                      </button>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                            <th className="py-3.5 px-6">Utilisateur</th>
                            <th className="py-3.5 px-6">Rôle Principal</th>
                            <th className="py-3.5 px-6">Département Attitré</th>
                            <th className="py-3.5 px-6">Niveau d'Accès</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                          {INITIAL_USERS.map((u) => (
                            <tr key={u.id} className="hover:bg-slate-50">
                              <td className="py-4 px-6 flex items-center gap-3">
                                <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-lg object-cover" />
                                <div>
                                  <p className="font-bold text-slate-900">{u.name}</p>
                                  <p className="text-xs text-slate-500">{u.email}</p>
                                </div>
                              </td>
                              <td className="py-4 px-6 font-medium text-slate-800">{u.title}</td>
                              <td className="py-4 px-6">
                                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800">
                                  {u.department || 'Global'}
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                  u.role === 'pdg' || u.role === 'admin' ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'
                                }`}>
                                  {u.role === 'pdg' || u.role === 'admin' ? 'Accès Global Total' : 'Accès Restreint Département'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {isRoleModalOpen && (
        <RoleManagementModal
          users={INITIAL_USERS}
          currentUser={currentUser}
          onSwitchUser={handleSwitchUser}
          onClose={() => setIsRoleModalOpen(false)}
        />
      )}

      {isAiModalOpen && (
        <AiAssistantModal
          onClose={() => setIsAiModalOpen(false)}
          departmentData={{
            goldTransactions,
            restaurantTransactions,
            diverseServices,
            foundationProjects
          }}
        />
      )}
    </div>
  );
}

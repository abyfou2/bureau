import { User, GoldTransaction, RestaurantTransaction, DiverseServiceRequest, FoundationProject, FoundationDonation, AuditLog } from './types';

export const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    name: 'Alh. Ilyassa',
    role: 'pdg',
    department: 'Global',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'h.ilyassa@bureaucentral.com',
    title: 'Président Directeur Général (PDG)'
  },
  {
    id: 'u2',
    name: 'ABYFOU',
    role: 'admin',
    department: 'Global',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'nasmacharity@gmail.com',
    title: 'Super Administrateur & RH'
  },
  {
    id: 'u3',
    name: 'Marc Kouassi',
    role: 'bureau_manager',
    department: 'Bureau',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'm.kouassi@bureaucentral.com',
    title: 'Responsable Bureau Or & Lingots'
  },
  {
    id: 'u4',
    name: 'Chef Fatou Ndiaye',
    role: 'restaurant_manager',
    department: 'Restaurant',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    email: 'f.ndiaye@bureaucentral.com',
    title: 'Gérante Restaurant & Trésorerie Resto'
  },
  {
    id: 'u5',
    name: 'Koffi Mensah',
    role: 'services_manager',
    department: 'Services diverses',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    email: 'k.mensah@bureaucentral.com',
    title: 'Responsable Services Divers & Facturation'
  },
  {
    id: 'u6',
    name: 'Dr. Mariam Cissé',
    role: 'fondation_manager',
    department: 'Fondation Ilyassa',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'm.cisse@fondationilyassa.org',
    title: 'Directrice de la Fondation Ilyassa'
  }
];

export const INITIAL_GOLD_TRANSACTIONS: GoldTransaction[] = [
  {
    id: 'gt-1',
    type: 'achat',
    weightKg: 12.5,
    purity: '24K',
    pricePerGram: 78.5,
    totalAmount: 981250,
    clientOrSupplier: 'Mine Aurifère du Sud SA',
    date: '2026-09-28',
    status: 'Validé'
  },
  {
    id: 'gt-2',
    type: 'vente',
    weightKg: 5.0,
    purity: '24K',
    pricePerGram: 82.0,
    totalAmount: 410000,
    clientOrSupplier: 'Swiss Bullion Trading AG',
    date: '2026-09-27',
    status: 'Validé'
  },
  {
    id: 'gt-3',
    type: 'achat',
    weightKg: 8.2,
    purity: '22K',
    pricePerGram: 72.0,
    totalAmount: 590400,
    clientOrSupplier: 'Coopérative Minière Kankan',
    date: '2026-09-25',
    status: 'Validé'
  }
];

export const INITIAL_RESTAURANT_TRANSACTIONS: RestaurantTransaction[] = [
  {
    id: 'rt-1',
    type: 'recette',
    category: 'Vente Boissons/Jus',
    description: 'Vente journalière jus frais & boissons salle',
    amount: 145000,
    date: '2026-09-29'
  },
  {
    id: 'rt-2',
    type: 'recette',
    category: 'Autre Recette',
    description: 'Recettes diverses traiteur & formules',
    amount: 320000,
    date: '2026-09-28'
  },
  {
    id: 'rt-3',
    type: 'depense',
    category: 'Salaires',
    description: 'Paiement personnel cuisine & service (Hebdo)',
    amount: 250000,
    date: '2026-09-28'
  },
  {
    id: 'rt-4',
    type: 'depense',
    category: 'Stock Cuisine',
    description: 'Achat denrées fraîches, viandes & épices',
    amount: 180000,
    date: '2026-09-27'
  },
  {
    id: 'rt-5',
    type: 'depense',
    category: 'Fonctionnement',
    description: 'Électricité, gaz et entretien matériel',
    amount: 75000,
    date: '2026-09-26'
  }
];

export const INITIAL_SERVICES_REQUESTS: DiverseServiceRequest[] = [
  {
    id: 'dsr-1',
    clientName: 'Société Minière de l\'Ouest',
    serviceType: 'Logistique & Transport',
    description: 'Affrètement de 4 véhicules blindés sécurisés pour transfert de lingots',
    amount: 1500000,
    status: 'En cours',
    date: '2026-09-28'
  },
  {
    id: 'dsr-2',
    clientName: 'Cabinet d\'Avocats Associés',
    serviceType: 'Consulting & Audit',
    description: 'Audit de conformité fiscale et réglementaire des actifs',
    amount: 3500000,
    status: 'Traité',
    date: '2026-09-26'
  }
];

export const INITIAL_FOUNDATION_PROJECTS: FoundationProject[] = [
  {
    id: 'fp-1',
    title: 'Construction Forage d\'Eau Potable - Village Kourou',
    description: 'Installation d\'un système de pompage solaire et château d\'eau pour 2500 villageois.',
    budget: 12000000,
    disbursed: 10500000,
    beneficiaries: 2500,
    status: 'En cours',
    category: 'Eau potable'
  },
  {
    id: 'fp-2',
    title: 'Campagne Rentrée Scolaire 2026',
    description: 'Distribution de 1000 kits complets de fournitures scolaires aux enfants orphelins.',
    budget: 5000000,
    disbursed: 5000000,
    beneficiaries: 1000,
    status: 'Terminé',
    category: 'Éducation'
  }
];

export const INITIAL_FOUNDATION_DONATIONS: FoundationDonation[] = [
  {
    id: 'fd-1',
    donorName: 'BureauCentral (Contribution Institutionnelle)',
    amount: 10000000,
    projectId: 'fp-1',
    date: '2026-09-01',
    note: 'Soutien annuel au développement communautaire'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'al-1',
    timestamp: '2026-09-29 11:02',
    userName: 'Alh. Ilyassa',
    role: 'PDG',
    action: 'Validation du plan budgétaire consolidé Q3',
    department: 'Global'
  },
  {
    id: 'al-2',
    timestamp: '2026-09-29 10:15',
    userName: 'ABYFOU',
    role: 'Super Administrateur',
    action: 'Mise à jour des rôles et paramètres de sécurité RBAC',
    department: 'Administration'
  }
];

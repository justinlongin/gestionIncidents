export interface Auth {
    user: User;
}

export interface Users {
    users: User[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

interface chartData {
    date: Date
    desktop: number
     
  }

  export interface Role {
    id: number,
    nom: string
}
export interface User {
    id: number;
    matricule: string;
    name: string;
    email: string;
    telephone: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    agence_id: number;
    agence:Agence
    service:Service
    service_id: number;
    region: string;
    role: Role;
    role_id: number
    [key: string]: unknown; // This allows for additional properties..
    
}


export interface Data {
    incident_id: number;
    incident_titre: string;
    incident_priority: Priorite;
    created_by: string;
    message: string;
}
export interface Notification{
    id: number
    type: string
    notifiable_type: string
    notifiable_id: number
    data: Data
    read_at: string
    created_at: string
    updated_at: string
}

export interface Incident {
    [key: string]: unknown; // This allows for additional properties..
    id: number;
    titre: string;
    slug: string | null
    description: string
    statut: string
    priorite: Priorite
    priorite_id: number
    image: string
    user_id: number
    technicien_id: number
    categorie: Categorie
    categorie_id: number
    piece_id?: number
    created_at: string
    updated_at: string
    ended_at: string
    technicien?: User
    user : User
    conseil: string
    solution: string
}

export interface Incidents {
    incidents: Incident[]
}

export interface Categorie {
    id: number,
    nom: string
}

export interface Priorite {
    id: number,
    nom: string
}

export interface Categories {
    categories: Categorie[]
}

export interface Agence{
    id: number,
    nom:string
}
export interface Service{
    id: number,
    nom:string
}


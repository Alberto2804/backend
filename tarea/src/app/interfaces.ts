export interface Ninja {
  id: string;
  username: string;
  rank: 'Academy' | 'Genin' | 'Chunin' | 'Jonin' | 'Kage';
  avatarUrl: string;
  experiencePoints: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  rankRequirement: 'D' | 'C' | 'B' | 'A' | 'S';
  reward: number;
  status: 'DISPONIBLE' | 'EN_CURSO' | 'COMPLETADA';
  acceptedByNinjaName?: string;
 
}

export interface AuthResponse {
  token: string;
  ninja: Ninja;
}

export interface NinjaStats {
  profile: {
    username: string;
    rank: string;
    experience: number;
    avatar: string;
  };
  stats: {
    totalAssignments: number;
    completedMissions: number;
  };
}
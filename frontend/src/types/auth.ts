export interface RegisterUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string | null;
  refreshToken: string | null;
  expiresAt: string;
}

export interface UserProfile {
  id?: string;
  userName: string;
  email: string;
  avatarUrl?: string;
  role?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
  error?: string | null;
}

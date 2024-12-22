export interface UserProfile {
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthError {
  code: string;
  message: string;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';
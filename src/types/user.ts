export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  country: string;
  role: UserRole;
  status: UserStatus;
  createdAt: number;
  updatedAt: number;
  preferences: UserPreferences;
  security: SecuritySettings;
}

export type UserRole = 'user' | 'admin' | 'moderator';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  currency: string;
  notifications: NotificationPreferences;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  transfers: boolean;
  payments: boolean;
  security: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: number;
  loginHistory: LoginRecord[];
  securityQuestions: SecurityQuestion[];
}

export interface LoginRecord {
  timestamp: number;
  ip: string;
  device: string;
  location: string;
}

export interface SecurityQuestion {
  id: string;
  question: string;
  answer: string;
}
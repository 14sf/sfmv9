export const AUTH_CONFIG = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_AGE: 18,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_REGEX: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
} as const;

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator'
} as const;

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended'
} as const;
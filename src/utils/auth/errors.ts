export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export const AUTH_ERRORS = {
  EMAIL_EXISTS: new AuthError(
    'This email is already registered. Please sign in instead.',
    'auth/email-already-in-use'
  ),
  INVALID_EMAIL: new AuthError(
    'Please enter a valid email address.',
    'auth/invalid-email'
  ),
  WEAK_PASSWORD: new AuthError(
    'Password must be at least 6 characters and contain at least one letter and one number.',
    'auth/weak-password'
  ),
  INVALID_PHONE: new AuthError(
    'Please enter a valid phone number.',
    'auth/invalid-phone'
  ),
  INVALID_AGE: new AuthError(
    'You must be at least 18 years old.',
    'auth/invalid-age'
  ),
  POPUP_BLOCKED: new AuthError(
    'Pop-up was blocked. Please enable pop-ups to sign in.',
    'auth/popup-blocked'
  ),
  NETWORK_ERROR: new AuthError(
    'Network error. Please check your connection.',
    'auth/network-request-failed'
  )
} as const;
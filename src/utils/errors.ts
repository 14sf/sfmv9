export class AuthError extends Error {
  constructor(
    message: string,
    public code?: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

export const AUTH_ERRORS = {
  IFRAME_BLOCKED: new AuthError(
    'Authentication is not available in iframes. Please open in a new window.',
    'auth/iframe-blocked'
  ),
  POPUP_BLOCKED: new AuthError(
    'Popup was blocked. Please enable popups and try again.',
    'auth/popup-blocked'
  ),
  NETWORK_ERROR: new AuthError(
    'Network error. Please check your connection.',
    'auth/network-error'
  )
} as const;
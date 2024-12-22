export const AUTH_ERROR_MESSAGES = {
  'auth/email-already-in-use': 'This email is already registered. Please sign in instead.',
  'auth/permission-denied': 'You do not have permission to perform this action.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please check your connection.',
  'auth/popup-closed-by-user': 'Sign in was cancelled.',
  'auth/cancelled-popup-request': 'Sign in was cancelled.',
  'auth/popup-blocked': 'Pop-up was blocked. Please enable pop-ups to sign in.',
  default: 'An error occurred. Please try again.'
} as const;
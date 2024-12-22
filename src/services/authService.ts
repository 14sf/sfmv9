import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { canUsePopups } from '../utils/iframe';
import { AUTH_ERRORS } from '../utils/errors';

export const signInWithGooglePopup = async () => {
  if (!canUsePopups()) {
    throw AUTH_ERRORS.IFRAME_BLOCKED;
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error('Google sign in error:', error);
    throw error;
  }
};
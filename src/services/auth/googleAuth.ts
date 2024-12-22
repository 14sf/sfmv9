import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import { createUserProfile } from '../database';
import { canUsePopups } from '../../utils/iframe';
import { AUTH_ERRORS } from '../../utils/auth/errors';

export const signInWithGoogle = async () => {
  if (!canUsePopups()) {
    throw AUTH_ERRORS.POPUP_BLOCKED;
  }

  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Create user profile if it doesn't exist
    await createUserProfile(result.user.uid, {
      email: result.user.email,
      name: result.user.displayName,
      photoURL: result.user.photoURL
    });

    return result.user;
  } catch (error: any) {
    console.error('Google sign in error:', error);
    throw error;
  }
};
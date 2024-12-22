import { createUserWithEmailAndPassword, signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { createUserProfile } from '../database';
import { AUTH_ERRORS } from '../../utils/auth/errors';
import { validateSignUpData } from '../../utils/auth/validation';

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0;
  } catch (error) {
    console.error('Error checking email:', error);
    throw error;
  }
};

export const signUpWithEmail = async (data: {
  email: string;
  password: string;
  phone: string;
  birthDate: string;
  address: string;
}) => {
  // Validate all data first
  validateSignUpData(data);

  // Check if email exists
  const exists = await checkEmailExists(data.email);
  if (exists) {
    throw AUTH_ERRORS.EMAIL_EXISTS;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    
    // Create user profile
    await createUserProfile(userCredential.user.uid, {
      email: data.email,
      phone: data.phone,
      birthDate: data.birthDate,
      address: data.address
    });

    return userCredential.user;
  } catch (error: any) {
    console.error('Sign up error:', error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  }
};
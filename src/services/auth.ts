import {
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail, 
  updateProfile,
  User,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { UserProfile } from '../types/auth';
import { AUTH_ERRORS } from '../utils/auth/errors';
import { validateSignUpData } from '../utils/auth/validation';

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);
    return methods.length > 0;
  } catch (error) {
    console.error('Error checking email:', error);
    throw error;
  }
};

export const signUp = async (
  email: string,
  password: string,
  phone: string,
  birthDate: string,
  address: string
) => {
  try {
    // Validate signup data
    validateSignUpData({ email, password, phone, birthDate, address });

    // Check if email exists first
    const exists = await checkEmailExists(email);
    if (exists) {
      throw AUTH_ERRORS.EMAIL_EXISTS;
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user profile in Firestore
    const userProfile = {
      email,
      phone,
      birthDate,
      address,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: 'user',
      status: 'active'
    };

    // Create user document with merge option
    await setDoc(doc(db, 'users', user.uid), userProfile, { merge: true });

    return user;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    return userDoc.exists() ? userDoc.data() as UserProfile : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
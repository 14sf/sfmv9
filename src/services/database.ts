import { 
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '../config/firebase';

// User Profile Operations
export const createUserProfile = async (userId: string, data: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: 'user',
      status: 'active'
    }, { merge: true });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, data: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Subscription Operations
export const updateSubscription = async (userId: string, subscriptionData: any) => {
  try {
    const subscriptionRef = doc(db, 'subscriptions', userId);
    await setDoc(subscriptionRef, {
      ...subscriptionData,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};

export const getSubscription = async (userId: string) => {
  try {
    const docRef = doc(db, 'subscriptions', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error('Error getting subscription:', error);
    throw error;
  }
};
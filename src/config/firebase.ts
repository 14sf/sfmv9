import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA6I8t5pVvGKOMNXQqfr_yyWmqyPwcqur8",
  authDomain: "sfmm-9f129.firebaseapp.com",
  projectId: "sfmm-9f129",
  storageBucket: "sfmm-9f129.firebasestorage.app",
  messagingSenderId: "418941918889",
  appId: "1:418941918889:web:5d1220c4079e08797f93b8",
  measurementId: "G-0DGWEZ3EXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Firestore
const db = getFirestore(app);

export { auth, db, googleProvider };
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Firebase configuration object
export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

// Initialize with default empty config
let firebaseConfig: FirebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};

// Function to initialize Firebase config
export function initializeFirebaseConfig(config: FirebaseConfig) {
  firebaseConfig = config;
}

let app: ReturnType<typeof initializeApp>;
let auth: ReturnType<typeof getAuth>;
const googleProvider = new GoogleAuthProvider();

// Initialize Firebase app and auth
function initializeFirebase() {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}

// Initialize on first import if config is set
if (firebaseConfig.apiKey) {
  initializeFirebase();
}

export function getFirebaseAuth() {
  if (!auth) {
    initializeFirebase();
  }
  return auth;
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(getFirebaseAuth(), googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

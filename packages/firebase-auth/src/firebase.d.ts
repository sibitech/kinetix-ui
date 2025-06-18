/// <reference types="vite/client" />
import type { User, Auth } from 'firebase/auth';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

export function initializeFirebaseConfig(config: FirebaseConfig): void;
export function getFirebaseAuth(): Auth;
export function signInWithGoogle(): Promise<void>;

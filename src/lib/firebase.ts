import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY?.trim(),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN?.trim(),
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID?.trim(),
  appId: import.meta.env.VITE_FIREBASE_APP_ID?.trim(),
};

const configured = Object.values(firebaseConfig).every(Boolean);
const app = configured ? (getApps().length ? getApp() : initializeApp(firebaseConfig)) : null;

// Estas configuracoes identificam o projeto Firebase; nao sao senhas do banco.
// A protecao real depende do Firebase Auth e das Security Rules do Firestore.
export const firebaseAuth = app ? getAuth(app) : null;
export const firebaseDb = app ? getFirestore(app) : null;

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5584gPLEivEf0QOKf83NEqx6vKwtV_Bs",
  authDomain: "crudfirebase-f173a.firebaseapp.com",
  databaseURL: "https://crudfirebase-f173a.firebaseio.com",
  projectId: "crudfirebase-f173a",
  storageBucket: "crudfirebase-f173a.firebasestorage.app",
  messagingSenderId: "636471916358",
  appId: "1:636471916358:web:54677e993bb8b040475747",
};

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  if (process.env.NODE_ENV === "development") {
    const auth = getAuth();
    connectAuthEmulator(auth, "https://");
  }
}

export const auth = getAuth(app!);

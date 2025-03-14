import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = require("../../../config-firebase.json");

const app = initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore(app);

import { storage } from "../lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJqm8PfsmQiYxBuCV-1kQq4L37N-N3Oyc",
  authDomain: "sjd-form-system.firebaseapp.com",
  projectId: "sjd-form-system",
  storageBucket: "sjd-form-system.firebasestorage.app",
  messagingSenderId: "972687757512",
  appId: "1:972687757512:web:77d31c0683ed4f69d555fd",
  measurementId: "G-GX99PZDR2G"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
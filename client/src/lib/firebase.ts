import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCKsVbMjrfPt3Yi8b8qPDAtRlTU_Ph9rMA",
  authDomain: "sdnnnn-eb068.firebaseapp.com",
  projectId: "sdnnnn-eb068",
  storageBucket: "sdnnnn-eb068.firebasestorage.app",
  messagingSenderId: "664128929167",
  appId: "1:664128929167:web:7db94c78bd5ce14fbf1ffa",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<string> => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user.getIdToken();
};

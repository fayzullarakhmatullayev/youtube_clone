import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbfQvbJAlZe1n8M83pnoEP6_u3YIT7cvE",
  authDomain: "video-6fc6a.firebaseapp.com",
  projectId: "video-6fc6a",
  storageBucket: "video-6fc6a.appspot.com",
  messagingSenderId: "115458599897",
  appId: "1:115458599897:web:4f2d4265fd24e0d7ef47c8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;

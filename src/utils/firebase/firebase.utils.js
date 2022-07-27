import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBa3jKE3zETrOR2T8gnsRCeRdpPUGqhs5I",
  authDomain: "crwn-clothing-db-32189.firebaseapp.com",
  projectId: "crwn-clothing-db-32189",
  storageBucket: "crwn-clothing-db-32189.appspot.com",
  messagingSenderId: "599462691186",
  appId: "1:599462691186:web:7d91b59890cac88fd71deb"
};

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

const auth = getAuth();
const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export { auth, signInWithGooglePopup };
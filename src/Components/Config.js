
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAmyk69jOROF9Wu036LUFWbQ98WRP4zZ4Y",
  authDomain: "newsapp-9ed87.firebaseapp.com",
  projectId: "newsapp-9ed87",
  storageBucket: "newsapp-9ed87.appspot.com",
  messagingSenderId: "578410077951",
  appId: "1:578410077951:web:557790051a0d3c78c8b6ca"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider}
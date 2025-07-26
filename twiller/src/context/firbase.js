
import { initializeApp } from "firebase/app";
import { getAuth,sendPasswordResetEmail} from "firebase/auth";
const firebaseConfig = {
   apiKey: "AIzaSyCFhMV_6q4BCwjSpT1Z32AzWuUFvr47L7Y",
  authDomain: "twiller-13870.firebaseapp.com",
  projectId: "twiller-13870",
  storageBucket: "twiller-13870.firebasestorage.app",
  messagingSenderId: "641763233484",
  appId: "1:641763233484:web:a97b2bea02ba8096bb3c69",
  measurementId: "G-EMWT54VM20"
};

const app = initializeApp(firebaseConfig);
 const auth=getAuth(app)
export { auth, getAuth, sendPasswordResetEmail };
// const analytics = getAnalytics(app);

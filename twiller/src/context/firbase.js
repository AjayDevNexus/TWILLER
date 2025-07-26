
import { initializeApp } from "firebase/app";
import { getAuth,sendPasswordResetEmail} from "firebase/auth";
const firebaseConfig = {
   apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
 const auth=getAuth(app)
export { auth, getAuth, sendPasswordResetEmail };
// const analytics = getAnalytics(app);

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDK0PBcaSUWzGkmo-MNDVepHukXkszRbcg",
  authDomain: "ug-smart.firebaseapp.com",
  projectId: "ug-smart",
  storageBucket: "ug-smart.appspot.com",
  messagingSenderId: "667403384080",
  appId: "1:667403384080:web:18b46770b21c3bf9fa2195",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const db = app.firestore();
const auth = app.auth();
export { db, auth };

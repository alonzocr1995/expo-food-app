import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDm9lAkuVz_hqeziTmhRqzisR3XaL13yl8",
  authDomain: "food-app-893fe.firebaseapp.com",
  projectId: "food-app-893fe",
  storageBucket: "food-app-893fe.appspot.com",
  messagingSenderId: "850477050712",
  appId: "1:850477050712:web:18cf5819f0c7c73b1d932d",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (error) {
  console.warn(error);
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVp3GaZWx8v1CvudtyFhx9CyZl_z1A29I",
  authDomain: "ichat-233f9.firebaseapp.com",
  projectId: "ichat-233f9",
  storageBucket: "ichat-233f9.appspot.com",
  messagingSenderId: "9098492690",
  appId: "1:9098492690:web:5aa274c69ac1b3f65391cb"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const now = firebase.firestore.Timestamp.now()

export { auth, db, now };

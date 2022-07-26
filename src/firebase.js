import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
        apiKey: "AIzaSyBYLwVu7F68JLbazG6ojTDkDjzPWqI9jEI",
        authDomain: "fipugram-c9370.firebaseapp.com",
        projectId: "fipugram-c9370",
        storageBucket: "fipugram-c9370.appspot.com",
        messagingSenderId: "138033411846",
        appId: "1:138033411846:web:96dcdb28d836e05cdd9087"
      };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export { initializeApp, db, getFirestore, getStorage, ref, uploadBytes,  getDownloadURL};
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
        apiKey: "AIzaSyBYLwVu7F68JLbazG6ojTDkDjzPWqI9jEI",
        authDomain: "fipugram-c9370.firebaseapp.com",
        projectId: "fipugram-c9370",
        storageBucket: "fipugram-c9370.appspot.com",
        messagingSenderId: "138033411846",
        appId: "1:138033411846:web:96dcdb28d836e05cdd9087"
      };

const app = initializeApp(firebaseConfig);

export { initializeApp };
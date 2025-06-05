import { initializeApp } from "firebase/app";
import { getFirestore , addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKjg5iRL-5xs2LcoRf-KiGg0avlqKBdKw",
  authDomain: "debuild-c745e.firebaseapp.com",
  projectId: "debuild-c745e",
  storageBucket: "debuild-c745e.firebasestorage.app",
  messagingSenderId: "1042044600830",
  appId: "1:1042044600830:web:b2c79a700dca8e14d280af",
  measurementId: "G-3Z52GF1K2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const SendMailToDatabase = async (user_mail) => {
    try {
        await addDoc(collection(db, "subscribers"), {
            email: user_mail,
            timestamp: serverTimestamp()
        });
        console.log("Email added to Firestore");
    } catch (error) {
        console.error("Error adding email to Firestore:", error);
    }
}
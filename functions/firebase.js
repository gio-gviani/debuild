import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKjg5iRL-5xs2LcoRf-KiGg0avlqKBdKw",
  authDomain: "debuild-c745e.firebaseapp.com",
  projectId: "debuild-c745e",
  storageBucket: "debuild-c745e.firebasestorage.app",
  messagingSenderId: "1042044600830",
  appId: "1:1042044600830:web:b2c79a700dca8e14d280af",
  measurementId: "G-3Z52GF1K2Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const SendMailToDatabase = async (user_mail) => {
  try {
    const user = (
      await createUserWithEmailAndPassword(auth, user_mail, "SUPER_STRONG_PASSWORD_123")
    ).user;
    console.log("User created:", user.uid);
    await sendEmailVerification(user);
    console.log("Verification email sent to:", user_mail);

    await addDoc(collection(db, "subscribers"), {
      email: user_mail,
      timestamp: serverTimestamp(),
      userId: user.uid,
      message: "Thank you for subscribing!",
    });
    console.log("Email added to Firestore");
  } catch (error) {
    console.error("Error adding email to Firestore:", error);
  }
};

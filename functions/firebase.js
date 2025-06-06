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

// Firebase config (make sure values are correct and domain is authorized)
const firebaseConfig = {
  apiKey: "AIzaSyBKjg5iRL-5xs2LcoRf-KiGg0avlqKBdKw",
  authDomain: "debuild-c745e.firebaseapp.com",
  projectId: "debuild-c745e",
  storageBucket: "debuild-c745e.appspot.com", // corrected typo (.app → .com)
  messagingSenderId: "1042044600830",
  appId: "1:1042044600830:web:b2c79a700dca8e14d280af",
  measurementId: "G-3Z52GF1K2Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Register user and send verification email
export const SendMailToDatabase = async (userEmail) => {
  try {
    // Register user with dummy password (or change logic to suit your app)
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      "SUPER_STRONG_PASSWORD_123"
    );
    const user = userCredential.user;
    console.log("User created:", user.uid);

    // Send email verification with redirect back to your domain
    const actionCodeSettings = {
      url: "https://debuild.works/verify",
      handleCodeInApp: false,
    };
    await sendEmailVerification(user, actionCodeSettings);
    console.log("Verification email sent to:", userEmail);

    // Add user info to Firestore
    await addDoc(collection(db, "subscribers"), {
      email: userEmail,
      timestamp: serverTimestamp(),
      userId: user.uid,
      message: "Thank you for subscribing!",
    });
    console.log("Email added to Firestore");
  } catch (error) {
    console.error("Error during registration:", error.message);
  }
};

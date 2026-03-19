import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authKeyDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// It prevents re-initialization Firebase on every hot reload
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
/*
1) getApps().length === 0 --> Next.js hot-reloads your code during development.
   Without this check, Firebase would try to initialize itself 10 times and throw an error. 
   This is called a singleton pattern --> only create the thing once.
2) getApps()[0] --> If Firebase is already initialized, get the existing instance.
export const auth and export const db — instead of importing Firebase everywhere and calling getAuth() every time, we initialize once here and export the ready-to-use instances. 
Any file in your project just does import { auth, db } from '@/lib/firebase'.
3) process.env.NEXT_PUBLIC_* — this is how you read environment variables in JavaScript.process.env is an object that Node.js populates from your .env.local file.
*/
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

/*
FIREBASE DATABASE CREATION AND STRUCTURE:
Back in your Firebase Console, do two things:
Enable Authentication:

Left sidebar → Build → Authentication
Click "Get started"
Under Sign-in providers → click Email/Password → toggle Enable → Save

Enable Firestore:

Left sidebar → Build → Firestore Database
Click "Create database"
Choose "Start in test mode" (we'll add security rules later)
Pick any region close to India — asia-south1 (Mumbai) is perfect
Click Done


Once both are enabled, tell me and we'll move to the most exciting part — gutting the default Next.js homepage and building the Air Vimanam landing page from scratch. 🛫 Sonnet 4.6
*/

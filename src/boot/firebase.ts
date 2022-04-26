// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  collection,
  Firestore,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// TODO: Change the way configs are read
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ?? '',
  authDomain: process.env.AUTH_DOMAIN ?? '',
  projectId: process.env.PROJECT_ID ?? '',
  storageBucket: process.env.STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.MESSAGING_SENDER_ID ?? '',
  appId: process.env.APP_ID ?? '',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// // Get a list of cities from your database
export async function getTweets(db: Firestore) {
  const tweetsCol = collection(db, 'tweets');
  const tweetsSnapshot = await getDocs(tweetsCol);
  const tweetsList = tweetsSnapshot.docs.map((doc) => doc.data());
  return tweetsList;
}

// export const unSubTweets = onSnapshot(doc(db, 'tweets', 'SF'), (doc) => {
//   console.log('Current data: ', doc.data());
// });

export const TweetsCollection = collection(db, 'tweets');

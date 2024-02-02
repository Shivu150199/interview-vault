// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'jobster-c7f43.firebaseapp.com',
  projectId: 'jobster-c7f43',
  storageBucket: 'jobster-c7f43.appspot.com',
  messagingSenderId: '534116073630',
  appId: '1:534116073630:web:6cb5f91d7e7eabb263fb8f',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

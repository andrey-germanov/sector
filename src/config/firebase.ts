import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCqS7Pw9h4XrwScglvBO9Lg5YCND_B-0jI",
  authDomain: "sector-a1f60.firebaseapp.com",
  projectId: "sector-a1f60",
  storageBucket: "sector-a1f60.firebasestorage.app",
  messagingSenderId: "285045204479",
  appId: "1:285045204479:web:09ef3581ddba7e840e33ca",
  measurementId: "G-L34HH831F0"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

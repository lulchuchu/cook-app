// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzSrGrx3DxZo6sJ1mvR3cmOs12DH-4feQ",
  authDomain: "cookapp-94789.firebaseapp.com",
  projectId: "cookapp-94789",
  storageBucket: "cookapp-94789.appspot.com",
  messagingSenderId: "335697623949",
  appId: "1:335697623949:web:347f4571756bc32adf9bc4",
  measurementId: "G-2PXXC4DY0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export default app;
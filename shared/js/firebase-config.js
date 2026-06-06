// Configura Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDPTPOHGBSVTjlL81twY71rLW1VMPvBGjU",
  authDomain: "construccionessamsarauth.firebaseapp.com",
  projectId: "construccionessamsarauth",
  storageBucket: "construccionessamsarauth.firebasestorage.app",
  messagingSenderId: "606913758741",
  appId: "1:606913758741:web:0a46b22e8f9527c762b01c"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
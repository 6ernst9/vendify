import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCRFE2zEIBh0pj3xMNHe8sjRHb7gp1F9ag",
    authDomain: "isproject-6332b.firebaseapp.com",
    projectId: "isproject-6332b",
    storageBucket: "isproject-6332b.appspot.com",
    messagingSenderId: "73506275953",
    appId: "1:73506275953:web:0735ef4908d647fc9b91d0",
    measurementId: "G-WY6K46HTS3"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage();
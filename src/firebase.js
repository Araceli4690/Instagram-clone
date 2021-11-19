import firebase from 'firebase/compat';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBFb1mahx7BreJmFQmszSRIrn0WBXf10UM",
    authDomain: "insta-clone-7318b.firebaseapp.com",
    projectId: "insta-clone-7318b",
    storageBucket: "insta-clone-7318b.appspot.com",
    messagingSenderId: "773069461517",
    appId: "1:773069461517:web:7269117374cb1303139d44"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
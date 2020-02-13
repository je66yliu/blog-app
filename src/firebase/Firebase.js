import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBrPgbxv1stBqx1zRgN2ADj1z-gEHzcC20",
    authDomain: "blog-app-31a3a.firebaseapp.com",
    databaseURL: "https://blog-app-31a3a.firebaseio.com",
    projectId: "blog-app-31a3a",
    storageBucket: "blog-app-31a3a.appspot.com",
    messagingSenderId: "272701057774",
    appId: "1:272701057774:web:906d1fb811b9c9982a61ff",
    measurementId: "G-WJWQC7ZDJY"
};


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});


export const createNewUser = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (err) {
            console.log('Error creating user.', err.message);
        }
    }

    return userRef;
};

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
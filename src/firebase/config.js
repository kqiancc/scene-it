import { initializeApp } from "firebase/app";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJhiyhBdgmCoeRmvoY-oBCDBzc8BOGarw",
  authDomain: "raje-773ec.firebaseapp.com",
  projectId: "raje-773ec",
  storageBucket: "raje-773ec.appspot.com",
  messagingSenderId: "737930556953",
  appId: "1:737930556953:web:c90e5ea10c1a5ee2cedc88",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
///
const FIELDS = {
  started: 0,
  completed: 0,
  max_chars: 0,
  total_chars: 0,
  total_correct_chars: 0,
  total_time: 0,
  all_games: [],
};

const INITIAL_DOC = {
  time_game: FIELDS,
  words_game: FIELDS,
  quote_game: FIELDS,
  gibberish_game: FIELDS,
  last_ten: [],
};

///////////////////////// AUTH /////////////////////////////////////
export const SignInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const docSnap = await getDoc(doc(db, "users", user.uid));

    // TODO: add firebase rule where users can only access their own document

    //if document doesnt exist (ie new user), create a document
    if (!docSnap.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        practice: INITIAL_DOC,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const logout = () => {
  signOut(auth);
};

export default {
  SignInWithGoogle,
  logout,
  db,
  firebaseAuth: auth,
};

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// //your app's Firebase project configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBJhiyhBdgmCoeRmvoY-oBCDBzc8BOGarw",
//   authDomain: "raje-773ec.firebaseapp.com",
//   projectId: "raje-773ec",
//   storageBucket: "raje-773ec.appspot.com",
//   messagingSenderId: "737930556953",
//   appId: "1:737930556953:web:c90e5ea10c1a5ee2cedc88",
// };

// //init firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Cloud Firestore and get a reference to the service
// const projectFirestore = getFirestore(app);

// export default projectFirestore;

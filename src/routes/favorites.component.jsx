// // import { collection, addDoc } from "firebase/firestore"; 

// // try {
// //   const docRef = await addDoc(collection(db, "users"), {
// //     first: "Ada",
// //     last: "Lovelace",
// //     born: 1815
// //   });
// //   console.log("Document written with ID: ", docRef.id);
// // } catch (e) {
// //   console.error("Error adding document: ", e);
// // }


// import projectFirestore from '../firebase/config.js';
// import {useState, useEffect} from 'react';

// const Favorites = () => {
//   //firebase stuff i guess
//   const [data, setData] = useState(null)
//   const [isPending, setIsPending] = useState(false)
//   const [error, setError] = useState(false)

// useEffect(()=> {
//   setIsPending(true)
//   projectFirestore.collection('recipes').get().then((snapshot) => {
//     console.log(snapshot)
//   })
// })
  
  
//   return (
//     <div >
//       {error && <p className = "error"> {error} </p>} 
//       {isPending && <p className = "loading"> loading... </p>}
//       <h1> coming soon as well </h1>
//     </div>
//     );
//   };
  
//   export default Favorites;




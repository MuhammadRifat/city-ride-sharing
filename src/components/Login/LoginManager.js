import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const firebaseConfigFrameWork = () => {
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }
    else{
        firebase.app();
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
  .signInWithPopup(googleProvider)
  .then((result) => {
    const user = result.user;
    return user;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  });
}

export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase
  .auth()
  .signInWithPopup(fbProvider)
  .then((result) => {
    var user = result.user;
    return user;
  })
  .catch((error) => {
    var errorMessage = error.message;
    return errorMessage;
  });
}

export const handleLogIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    return user;
  })
  .catch((error) => {
    const errorMessage = error.message;
    return errorMessage;
  });
}

export const handleSignUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => { 
    const user = userCredential.user;
    return user;
  })
  .catch((error) => {
    const errorMessage = error.message;
    return errorMessage;
  });
}
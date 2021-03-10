const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = {
  apiKey: "AIzaSyB5PU2fG0JwIoGe6uaolANAl3elhmji_0Q",
  authDomain: "kiei-final-4aaa6.firebaseapp.com",
  projectId: "kiei-final-4aaa6",
  storageBucket: "kiei-final-4aaa6.appspot.com",
  messagingSenderId: "687734579914",
  appId: "1:687734579914:web:ace74c6c9344a5cfe90a33"
  }; 

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase
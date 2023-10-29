import { auth } from "./main.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { addUser, getUserById } from "./firestore.js";

const logInButton = document.getElementById("log-in-button");
const avatar = document.getElementById("avatar");

function signInWithGoogle() {
  const googleProvider = new GoogleAuthProvider();
  signInWithPopup(auth, googleProvider).then((result) => {
    const authUser = result.user;
    getUserById(authUser.uid).then((user) => {
      if (user) {
        return;
      }
      addUser({
        userName: authUser.displayName,
        photoURL: authUser.photoURL,
        id: authUser.uid,
      }).then(() => {});
    });
  });
}

export function getUser() {
  return auth.currentUser;
}

auth.onAuthStateChanged((user) => {
  if (user) {
    logInButton.style.display = "none";
    avatar.style.display = "block";
    // avatar.style.display = "flex";

    avatar.attributes.src.value = user.photoURL;
  } else {
    avatar.style.display = "none";
    logInButton.style.display = "block";
  }
});

logInButton.addEventListener("click", signInWithGoogle);

avatar.addEventListener("click", () => {
  signOut(auth);
});

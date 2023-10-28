import { auth } from "./main.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const logInButton = document.getElementById("log-in-button");
const avatar = document.getElementById("avatar");

function signInWithGoogle() {
  const googleProvider = new GoogleAuthProvider();
  signInWithPopup(auth, googleProvider).then((result) => {
    const user = result.user;
  });
}

export function getUserName() {
  const user = auth.currentUser;
  return user.displayName;
}

auth.onAuthStateChanged((user) => {
  if (user) {
    logInButton.style.display = "none";
    avatar.style.display = "block";

    avatar.attributes.src.value = user.photoURL;
  } else {
    avatar.style.display = "none";
    logInButton.style.display = "block";
  }
});

logInButton.addEventListener("click", signInWithGoogle);

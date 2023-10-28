import { auth } from "./main.js";
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

const logInButton = document.getElementById("log-in-button");

function signInWithGoogle() {
  const googleProvider = new auth.GoogleAuthProvider();
  signInWithPopup(auth, googleProvider).then((result) => {
    const user = result.user;
    console.log(user);
  });
}

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
  } else {
    console.log("not logged in");
  }
});

logInButton.addEventListener("click", signInWithGoogle);

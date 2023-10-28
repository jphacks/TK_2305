import {
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { db } from "./main.js";

export async function getPins() {
  const querySnapshot = await getDocs(collection(db, "pins"));
  return querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      data: doc.data(),
    };
  });
}

export async function getPinById(id) {
  const querySnapshot = await getDocs(collection(db, "pins"));
  try {
    return querySnapshot.docs
      .filter((doc) => doc.id === id)
      .map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      })[0];
  } catch {
    return null;
  }
}

export async function addPin({
  forgottenItem,
  userName,
  reward,
  deadline,
  location,
  detail,
}) {
  await addDoc(collection(db, "pins"), {
    forgotten_item: forgottenItem,
    user_name: userName,
    reward: reward,
    deadline: deadline,
    location: location,
    detail: detail,
  });
}

export async function getUserById(id) {
  const querySnapshot = await getDocs(collection(db, "users"));
  try {
    return querySnapshot.docs
      .filter((doc) => doc.id === id)
      .map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      })[0];
  } catch {
    return null;
  }
}

export async function addUser({ userName, photoURL, id }) {
  await addDoc(collection(db, "users"), {
    user_name: userName,
    photoURL,
    id,
  });
}

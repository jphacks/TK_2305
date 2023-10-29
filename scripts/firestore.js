import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
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
  userId,
  reward,
  deadline,
  location,
  detail,
}) {
  await addDoc(collection(db, "pins"), {
    forgotten_item: forgottenItem,
    user_id: userId,
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
  } catch (e) {
    return null;
  }
}

export async function addUser({ userName, photoURL, id }) {
  await setDoc(doc(db, "users", id), {
    user_name: userName,
    photo_url: photoURL,
  });
}

export async function increaseReward({ id, reward }) {
  console.log(id);
  console.log(reward);
  const pinRef = doc(db, "pins", id);
  await setDoc(
    pinRef,
    {
      reward: Number(reward) + 1,
    },
    { merge: true },
  );
}

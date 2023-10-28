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
      id:doc.id,
      data:doc.data()
    }
  });
}

export async function getPin(id) {
    const querySnapshot = await getDocs(collection(db, "pins"));
    return querySnapshot.docs.map((doc) => {
        return {
        id:doc.id,
        data:doc.data()
        }
    });
}

export async function addPin({
  forgottenItem,
  userName,
  reward,
  deadline,
  location,
}) {
  const docRef = await addDoc(collection(db, "pins"));
  await docRef.set({
    forgotten_item: forgottenItem,
    user_name: userName,
    reward: reward,
    start_time: new Date(),
    end_time: deadline,
    location: location,
  });
}

import {
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { db } from "./main.js";

export async function getPins() {
  const querySnapshot = await getDocs(collection(db, "pins"));
  return querySnapshot.docs.map((doc) => doc.data());
}

export async function addPin() {
  const docRef = await addDoc(collection(db, "pins"));
}

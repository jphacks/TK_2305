import { collection, getDocs } from "firebase/firestore";
import {db} from "./main";

async function getPins() {
  const querySnapshot = await getDocs(collection(db, "pins"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}

getPins()
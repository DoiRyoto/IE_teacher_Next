import firebaseApp from "./client";
import { getStorage } from "firebase/storage";

const storage = getStorage(firebaseApp);

export default storage;
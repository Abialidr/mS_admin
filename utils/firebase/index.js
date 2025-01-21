// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGUA4fAcKzJd-OfQQ3XbucVqDGWGN9o7U",
  authDomain: "galaxycargo-fa6ae.firebaseapp.com",
  projectId: "galaxycargo-fa6ae",
  storageBucket: "galaxycargo-fa6ae.firebasestorage.app",
  messagingSenderId: "683081668712",
  appId: "1:683081668712:web:d0318a6e380b29051ec3dd",
  measurementId: "G-Q5JTGHV7ZP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const addDocument = async (collectionName, data) => {
  return await addDoc(collection(db, collectionName), data);
};
export const updateDocument = async (collectionName, id, data) => {
  return await updateDoc(doc(db, collectionName, id), data);
};
export const deleteDocument = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};
export const deleteDocumentByCondition = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};
export const getDocumentById = async (collectionName, id) => {
  const docSnap = await getDoc(doc(db, collectionName, id));
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    return undefined;
  }
};
export const getDocumentsByCondition = async (
  collectionName,
  conditions = [],
  orderBys = [],
  lim,
  sa
) => {
  // < less than
  // <= less than or equal to
  // == equal to
  // > greater than
  // >= greater than or equal to
  // != not equal to
  // array-contains
  // array-contains-any
  // in
  // not-in
  const docSnap = await getDocs(
    query(
      collection(db, collectionName),
      ...(conditions.length
        ? conditions.map((data) => {
            return where(...data);
          })
        : []),
      ...(orderBys.length
        ? orderBys.map((data) => {
            return orderBy(...data);
          })
        : []),
      lim && limit(lim),
      lim && sa && startAfter(lim * sa)
    )
  );
  docSnap.forEach((element) => {
    d.push(element.data());
  });
  return d;
};
export const getAllDocuments = async (collectionName) => {
  const docSnap = await getDocs(query(collection(db, collectionName)));
  const d = [];
  docSnap.forEach((element) => {
    const a = element.data();
    a._id = element.id;
    d.push(a);
  });
  return d;
};
export const handleUpload = async (file, fileName) => {
  if (!file) {
    alert("Please select a file first.");
    return;
  }
  try {
    const storageRef = ref(storage, `images/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    console.log(
      "🚀 ~ file: index.js:119 ~ handleUpload ~ storageRef:",
      storageRef
    );
    console.log("Uploaded a file!", snapshot);
    // Get the file's download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File available at", downloadURL);
    return downloadURL; // Set the image URL to display the uploaded image
  } catch (error) {
    console.error("Upload failed: please try again", error);
    alert("Upload failed");
    return undefined;
  }
};

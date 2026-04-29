import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, orderBy, query } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCuPRRtuMcf-sNuLdGyGU2Yheje_k2D4YI",
  authDomain: "lost-and-found-7203c.firebaseapp.com",
  projectId: "lost-and-found-7203c",
  storageBucket: "lost-and-found-7203c.firebasestorage.app",
  messagingSenderId: "300041676634",
  appId: "1:300041676634:web:505fbb7b5991ff2358b563"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Authentication Exports
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Cloudinary Constants
export const CLOUDINARY_CLOUD_NAME = "dltwp5ioc";
export const CLOUDINARY_UPLOAD_PRESET = "finditbymoin";

/**
 * Upload an image file to Cloudinary unsignedly
 * @param {File} file 
 * @returns {Promise<string>} The secure URL of the uploaded image
 */
export async function uploadImageUnsigned(file) {
  if (!file) return "";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!response.ok) {
    throw new Error('Failed to upload image to Cloudinary');
  }

  const data = await response.json();
  return data.secure_url;
}

// ----------------- Lost & Found API -----------------
const itemsCol = collection(db, "items");

export async function fetchLostItems() {
  const q = query(itemsCol, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    if (data.createdAt && typeof data.createdAt.toDate === 'function') {
      data.createdAt = data.createdAt.toDate().toISOString();
    }
    return { id: doc.id, ...data };
  }).filter(item => item.appType !== 'hostel');
}

export async function addLostItem(itemData, file) {
  let imageUrl = "";
  if (file) {
    imageUrl = await uploadImageUnsigned(file);
  }

  const docRef = await addDoc(itemsCol, {
    ...itemData,
    imageUrl,
    createdAt: serverTimestamp()
  });

  return { id: docRef.id, ...itemData, imageUrl };
}

// ----------------- Hostel Mart API -----------------
const hostelCol = collection(db, "items");

export async function fetchHostelItems() {
  const q = query(hostelCol, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    if (data.createdAt && typeof data.createdAt.toDate === 'function') {
      data.createdAt = data.createdAt.toDate().toISOString();
    }
    return { id: doc.id, ...data };
  }).filter(item => item.appType === 'hostel');
}

export async function addHostelItem(itemData, file) {
  let imageUrl = "";
  if (file) {
    imageUrl = await uploadImageUnsigned(file);
  }

  const docRef = await addDoc(hostelCol, {
    ...itemData,
    appType: 'hostel',
    image: imageUrl,
    createdAt: serverTimestamp()
  });

  return { id: docRef.id, ...itemData, image: imageUrl };
}

'use server';

import { db } from '@/lib/firebase';
import type { UserProfile } from '@/lib/types';
import { doc, setDoc, getDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

// Helper to convert Firestore doc to UserProfile
const fromFirestoreToUser = (docSnap: any): UserProfile => {
    const data = docSnap.data() || {};
    const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toDate().toISOString() : new Date().toISOString();
    
    return {
        uid: docSnap.id,
        email: data.email || null,
        displayName: data.displayName || null,
        photoURL: data.photoURL || null,
        createdAt: createdAt,
    };
};

// Add or update a user in Firestore
export async function addUser(user: { uid: string; email: string | null; displayName: string | null; photoURL: string | null; }): Promise<UserProfile> {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // New user, create the document
    await setDoc(userRef, {
      ...user,
      createdAt: serverTimestamp(),
    });
  } else {
    // Existing user, update their profile info in case it changed (e.g. new photo)
    await setDoc(userRef, {
        ...user,
        createdAt: userSnap.data().createdAt // preserve original creation date
    }, { merge: true });
  }

  const newSnap = await getDoc(userRef);
  return fromFirestoreToUser(newSnap);
}

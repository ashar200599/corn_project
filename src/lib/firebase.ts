import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();

export async function syncUserProfile(user: User) {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      displayName: user.displayName || 'Anonymous Explorer',
      photoURL: user.photoURL || '',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      vitals: {
        health: 100,
        shield: 50,
        energy: 100
      }
    });
  } else {
    const data = userSnap.data();
    const updateData: any = { lastLogin: serverTimestamp() };
    
    // Ensure vitals exist for legacy users or patch missing energy
    if (!data.vitals || data.vitals.energy === undefined) {
      updateData.vitals = {
        health: data.vitals?.health ?? 100,
        shield: data.vitals?.shield ?? 50,
        energy: 100
      };
    }
    
    await setDoc(userRef, updateData, { merge: true });
  }
}

export async function updateUserVitals(uid: string, vitals: { health: number, shield: number, energy?: number }) {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, {
    vitals,
    lastLogin: serverTimestamp()
  }, { merge: true });
}

export { signInWithPopup, signOut, onAuthStateChanged };
export type { User };

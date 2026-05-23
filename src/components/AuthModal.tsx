import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { syncUserProfile } from '../lib/firebase';

export function AuthModal({ onClose }: { onClose: () => void }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleProviderAuth = async (provider: any) => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        await syncUserProfile(result.user);
        onClose();
      }
    } catch (err: any) {
      if (
        err?.code !== 'auth/popup-closed-by-user' && 
        err?.code !== 'auth/cancelled-popup-request'
      ) {
        console.error("Provider auth failed:", err);
        let errMsg = err.message || 'Authentication failed.';
        if (err.code === 'auth/operation-not-allowed') {
          errMsg = 'This sign-in provider is not enabled in Firebase Console.';
        }
        setError(errMsg);
      }
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isRegistering) {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
        await syncUserProfile(result.user);
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
         await syncUserProfile(result.user);
      }
      onClose();
    } catch (err: any) {
      let errMsg = err.message || 'Authentication failed.';
      if (err.code === 'auth/email-already-in-use') {
        errMsg = 'Email is already taken. Please login instead.';
      } else if (err.code === 'auth/invalid-credential') {
        errMsg = 'Invalid email or password.';
      } else if (err.code === 'auth/weak-password') {
        errMsg = 'Password is too weak.';
      } else if (err.code === 'auth/operation-not-allowed') {
        errMsg = 'Email/Password authentication is not enabled in Firebase. Please enable it in the Firebase Console.';
      }
      setError(errMsg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-300">
      <div className="bg-app-surface border-4 border-app-border p-6 sm:p-8 w-full max-w-md relative text-left shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-app-text-muted hover:text-game-magenta transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-black uppercase text-app-text-main mb-6 text-center tracking-widest">
          {isRegistering ? 'Register Identity' : 'System Login'}
        </h2>

        {error && (
          <div className="mb-4 p-3 border-2 border-game-magenta bg-game-magenta/10 text-game-magenta text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
          {isRegistering && (
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-muted" size={18} />
              <input 
                type="text" 
                placeholder="Display Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-app-bg border-2 border-app-border text-app-text-main p-3 pl-10 focus:border-game-accent outline-none focus:outline-none transition-colors"
                required={isRegistering}
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-muted" size={18} />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-app-bg border-2 border-app-border text-app-text-main p-3 pl-10 focus:border-game-accent outline-none transition-colors"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-app-text-muted" size={18} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-app-bg border-2 border-app-border text-app-text-main p-3 pl-10 focus:border-game-accent outline-none transition-colors"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full game-btn game-btn-primary block py-3 mt-4 text-center font-bold tracking-widest"
          >
            {isRegistering ? 'INITIALIZE ACCOUNT' : 'LOGIN'}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="h-0.5 flex-1 bg-app-border"></div>
          <span className="text-xs font-bold uppercase tracking-widest text-app-text-muted">OR</span>
          <div className="h-0.5 flex-1 bg-app-border"></div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={() => handleProviderAuth(googleProvider)}
            className="w-full game-btn game-btn-outline flex items-center justify-center gap-3 py-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-bold">GOOGLE</span>
          </button>
        </div>

        <div className="mt-6 pt-4 border-t-2 border-app-border text-center text-sm font-bold text-app-text-muted">
          {isRegistering ? (
            <p>
              Already tracked?{' '}
              <button onClick={() => setIsRegistering(false)} className="text-game-accent hover:underline uppercase">Login</button>
            </p>
          ) : (
            <p>
              No records found?{' '}
              <button onClick={() => setIsRegistering(true)} className="text-game-accent hover:underline uppercase">Register</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

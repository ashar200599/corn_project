import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, setDoc, deleteDoc, doc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Star, Trash2, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { generateDishReview } from '../services/geminiService';

interface DishReview {
  id: string;
  dishId: string;
  userId: string;
  displayName: string;
  rating: number;
  text: string;
  createdAt: any;
}

export function DishReviews({ dishId, dishName }: { dishId: string, dishName: string }) {
  const [reviews, setReviews] = useState<DishReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [generatingAI, setGeneratingAI] = useState(false);

  const fetchReviews = async () => {
    try {
      const q = query(
        collection(db, 'dish_reviews'),
        where('dishId', '==', dishId)
      );
      const querySnapshot = await getDocs(q);
      const loadedReviews: DishReview[] = [];
      querySnapshot.forEach((doc) => {
        loadedReviews.push({ id: doc.id, ...doc.data() } as DishReview);
      });
      // Sort in memory as complex index not available.
      loadedReviews.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });
      setReviews(loadedReviews);
    } catch (e: any) {
      console.error(e);
      setError('Failed to load reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [dishId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    if (!text.trim()) return;

    setSubmitting(true);
    setError('');
    
    try {
      const reviewId = uuidv4();
      const newReview = {
        dishId,
        userId: auth.currentUser.uid,
        displayName: auth.currentUser.displayName || 'Anonymous Explorer',
        rating,
        text: text.trim(),
        createdAt: serverTimestamp(),
      };
      
      await setDoc(doc(db, 'dish_reviews', reviewId), newReview);
      
      setText('');
      setRating(5);
      fetchReviews();
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Failed to submit review.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!auth.currentUser) return;
    if (!window.confirm('Delete this review?')) return;
    try {
      await deleteDoc(doc(db, 'dish_reviews', reviewId));
      fetchReviews();
    } catch(e: any) {
      console.error(e);
      setError(e.message || 'Failed to delete review.');
    }
  };

  const handleGenerateAIReview = async () => {
    setGeneratingAI(true);
    setError('');
    try {
      const { rating: aiRating, text: aiText } = await generateDishReview(dishName);
      setRating(Math.max(1, Math.min(5, aiRating)));
      setText(aiText);
    } catch (e: any) {
      setError(e.message || 'Failed to generate UI log.');
    } finally {
      setGeneratingAI(false);
    }
  };

  const averageRating = reviews.length ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : 'No';

  return (
    <div className="bg-app-surface border-4 border-app-border p-4 sm:p-8 mt-8">
      <h3 className="text-xl font-black border-b-4 border-app-border pb-4 mb-6 flex items-center gap-3 text-app-text-main uppercase tracking-widest">
        <Star className="text-game-accent" size={24} /> Reviews ({averageRating} {reviews.length > 0 ? '/ 5' : 'ratings'})
      </h3>

      {error && <div className="text-red-400 mb-4 font-bold">{error}</div>}

      {/* Write a review */}
      {auth.currentUser ? (
        <form onSubmit={handleSubmit} className="mb-8 border-2 border-app-border p-4 bg-app-bg/40">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-game-accent uppercase tracking-widest">Share Your Discoveries</h4>
            <button
              type="button"
              onClick={handleGenerateAIReview}
              disabled={generatingAI || submitting}
              className="game-btn flex items-center gap-2 text-sm !py-1 !px-3 disabled:opacity-50"
            >
              <Sparkles size={16} />
              {generatingAI ? 'Simulating...' : 'Auto-Generate Log'}
            </button>
          </div>
          <div className="flex items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  size={24}
                  className={star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                />
              </button>
            ))}
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            disabled={submitting}
            className="w-full bg-app-bg text-app-text-main border-2 border-app-border p-3 mb-4 focus:border-game-accent focus:outline-none h-24"
            placeholder="Tell us about the taste, side effects, or any mutations..."
            required
          />
          <button
            type="submit"
            disabled={submitting || !text.trim()}
            className="game-btn w-full"
          >
            {submitting ? 'Transmitting...' : 'Submit Log'}
          </button>
        </form>
      ) : (
        <div className="mb-8 border-2 border-app-border p-4 bg-app-bg/40 text-center text-app-text-muted">
          <p>You must authenticate to the OS to submit structural logs.</p>
        </div>
      )}

      {/* Review List */}
      {loading ? (
        <div className="text-center font-mono text-game-accent animate-pulse">Loading logs...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center font-mono text-app-text-muted">No logs recorded yet. Be the first to try this synthesis.</div>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="border-2 border-app-border p-4 bg-app-bg/40 relative">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-bold text-app-text-main">{review.displayName}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-xs text-app-text-muted text-right font-mono flex flex-col items-end gap-2">
                  <span>{review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString() : 'Just now'}</span>
                  {auth.currentUser?.uid === review.userId && (
                    <button onClick={() => handleDelete(review.id)} className="text-red-400 hover:text-red-300" aria-label="Delete review">
                       <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-app-text-main/90 mt-3 whitespace-pre-wrap">{review.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

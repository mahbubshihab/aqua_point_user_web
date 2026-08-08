'use client';

import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, X, User, ThumbsUp, ShieldCheck } from 'lucide-react';
import { 
  ReviewItem, 
  submitReviewToFirestore, 
  subscribeToApprovedReviewsForProductFromFirestore 
} from '@/core/services/firebase';

interface ProductReviewsSectionProps {
  productId: string;
  productName?: string;
  initialRating?: number;
}

const getOrGenerateUserId = (): string => {
  if (typeof window === 'undefined') return 'user_guest';
  try {
    let uid = localStorage.getItem('aqua_point_user_id');
    if (!uid) {
      uid = `user_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      localStorage.setItem('aqua_point_user_id', uid);
    }
    return uid;
  } catch (e) {
    console.warn('LocalStorage not available:', e);
    return `user_${Date.now()}`;
  }
};

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  productId,
  productName,
  initialRating = 5.0
}) => {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Review Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToApprovedReviewsForProductFromFirestore(productId, (fetchedReviews) => {
      setReviews(fetchedReviews);
      setLoading(false);
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [productId]);

  const ratingLabels: Record<number, string> = {
    1: '1.0 - Poor',
    2: '2.0 - Fair',
    3: '3.0 - Good',
    4: '4.0 - Very Good',
    5: '5.0 - Excellent'
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSubmitSuccess(false);
    setErrorMessage('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUserName('');
    setRating(5);
    setHoverRating(0);
    setComment('');
    setSubmitSuccess(false);
    setErrorMessage('');
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) {
      setErrorMessage('Please provide both your name and review comment.');
      return;
    }
    setSubmitting(true);
    setErrorMessage('');

    try {
      const userId = getOrGenerateUserId();
      await submitReviewToFirestore({
        userId,
        userName: userName.trim(),
        productId,
        rating,
        comment: comment.trim()
      });

      setSubmitSuccess(true);
    } catch (err) {
      console.error('Error submitting product review:', err);
      setErrorMessage('Failed to submit review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate average rating from approved reviews or fallback to product rating
  const averageRating = React.useMemo(() => {
    if (reviews.length === 0) return initialRating;
    const sum = reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0);
    return Number((sum / reviews.length).toFixed(1));
  }, [reviews, initialRating]);

  return (
    <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-8">
      {/* Header & Rating Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E2E8F0] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#00BCE1] uppercase tracking-wider mb-1">
            <ThumbsUp className="w-4 h-4" /> Verified Customer Feedback
          </div>
          <h3 className="text-2xl font-extrabold text-[#0F172A]">
            Product Reviews & Ratings
          </h3>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-2.5 rounded-2xl">
            <div className="text-center">
              <span className="text-2xl font-extrabold text-[#0F172A]">{averageRating}</span>
              <span className="text-xs text-[#64748B] font-bold"> / 5.0</span>
            </div>
            <div className="border-l border-[#E2E8F0] pl-3 flex flex-col justify-center">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(averageRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-[#CBD5E1]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] text-[#64748B] font-semibold">
                {reviews.length} {reviews.length === 1 ? 'Approved Review' : 'Approved Reviews'}
              </span>
            </div>
          </div>

          <button
            onClick={handleOpenModal}
            className="px-5 py-3 rounded-xl bg-[#00BCE1] hover:bg-[#00A3C7] text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* Reviews List / Content */}
      {loading ? (
        <div className="py-12 text-center text-[#475569] text-xs font-semibold">
          <div className="w-8 h-8 border-3 border-[#00BCE1] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading approved reviews...
        </div>
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00BCE1]/10 text-[#00BCE1] font-bold text-sm flex items-center justify-center border border-[#00BCE1]/20">
                    {rev.userName ? rev.userName.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">
                      {rev.userName || rev.customerName || 'Aqua Point Customer'}
                    </h4>
                    <div className="flex items-center gap-1 text-[11px] text-[#10B981] font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Buyer</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-[#E2E8F0]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-[#CBD5E1]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#334155] leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 px-6 rounded-2xl bg-[#F8FAFC] border border-dashed border-[#CBD5E1] text-center space-y-3">
          <MessageSquarePlus className="w-10 h-10 text-[#94A3B8] mx-auto" />
          <h4 className="text-base font-bold text-[#0F172A]">No Approved Reviews Yet</h4>
          <p className="text-xs text-[#64748B] max-w-md mx-auto">
            Be the first customer to review {productName || 'this product'}! Share your experience with our water purification performance and service.
          </p>
          <button
            onClick={handleOpenModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#00BCE1] text-[#00BCE1] font-bold text-xs hover:bg-[#F0F9FF] transition-colors"
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Submit the First Review</span>
          </button>
        </div>
      )}

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95">
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 text-[#94A3B8] hover:text-[#0F172A] p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#00BCE1] uppercase tracking-wider">
                Aqua Point Review
              </span>
              <h3 className="text-xl font-extrabold text-[#0F172A]">Write a Product Review</h3>
              <p className="text-xs text-[#64748B]">
                Reviewing: <span className="font-semibold text-[#0F172A]">{productName || 'RO Purifier'}</span>
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-6 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto" />
                <h4 className="text-lg font-extrabold text-[#0F172A]">Review Submitted!</h4>
                <p className="text-xs text-[#334155] leading-relaxed">
                  Thank you for your feedback! Your review has been successfully submitted and saved. It will be published on this page once approved by our moderation team.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-xs shadow-md transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-5">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-600">
                    {errorMessage}
                  </div>
                )}

                {/* Star Rating 1-5 */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#475569]">
                    Star Rating (1 - 5) *
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = star <= (hoverRating || rating);
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 hover:scale-115 transition-transform"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                active ? 'fill-amber-400 text-amber-400' : 'text-[#CBD5E1]'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-xs font-bold text-[#0F172A]">
                      {ratingLabels[hoverRating || rating]}
                    </span>
                  </div>
                </div>

                {/* User Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#475569]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Ahmed"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 px-3.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1] transition-colors"
                  />
                </div>

                {/* Comment */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#475569]">
                    Review Comment *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Share details of your experience with the water quality, installation, or product durability..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl py-2.5 px-3.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#00BCE1] transition-colors"
                  />
                </div>

                {/* Submit button */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2.5 rounded-xl border border-[#CBD5E1] font-bold text-xs text-[#475569] hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl bg-[#00BCE1] hover:bg-[#00A3C7] text-white font-bold text-xs shadow-md hover:scale-[1.02] transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

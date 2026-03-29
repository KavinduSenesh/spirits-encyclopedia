'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import StarRating from './StarRating';

interface Review {
  id: number;
  bottle_id: string;
  author_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewSectionProps {
  bottleId: string;
}

export default function ReviewSection({ bottleId }: ReviewSectionProps) {
  const t = useTranslations('reviews');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?bottleId=${encodeURIComponent(bottleId)}`);
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [bottleId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!authorName.trim() || !comment.trim() || rating === 0) {
      setError(t('allFieldsRequired'));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bottleId,
          authorName: authorName.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || t('submitError'));
        return;
      }

      // Reset form and refresh
      setAuthorName('');
      setRating(0);
      setComment('');
      setShowForm(false);
      await fetchReviews();
    } catch {
      setError(t('submitError'));
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <section className="mt-16 pt-10 border-t border-amber/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-text-primary text-[16px] font-light tracking-wide">
            {t('heading')}
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-1.5">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-text-muted text-xs">
                {avgRating.toFixed(1)} ({reviews.length})
              </span>
            </div>
          )}
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="rounded-full bg-gradient-to-r from-amber to-amber-dark
              px-4 py-2 text-xs font-medium text-bg-primary
              hover:scale-[1.03] active:scale-95 transition-all"
          >
            {t('writeReview')}
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-xl bg-bg-card/60 border border-border-amber p-5">
          <div className="mb-4">
            <label className="block text-text-muted text-xs mb-1.5">{t('yourName')}</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              maxLength={50}
              className="w-full rounded-lg bg-bg-primary border border-border-default/40 px-3 py-2
                text-sm text-text-primary placeholder:text-text-faint
                focus:outline-none focus:border-border-amber transition-colors"
              placeholder={t('namePlaceholder')}
            />
          </div>

          <div className="mb-4">
            <label className="block text-text-muted text-xs mb-1.5">{t('yourRating')}</label>
            <StarRating rating={rating} onRate={setRating} size="md" />
          </div>

          <div className="mb-4">
            <label className="block text-text-muted text-xs mb-1.5">{t('yourReview')}</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={1000}
              rows={3}
              className="w-full rounded-lg bg-bg-primary border border-border-default/40 px-3 py-2
                text-sm text-text-primary placeholder:text-text-faint
                focus:outline-none focus:border-border-amber transition-colors resize-none"
              placeholder={t('reviewPlaceholder')}
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs mb-3">{error}</p>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-gradient-to-r from-amber to-amber-dark
                px-5 py-2 text-xs font-medium text-bg-primary
                disabled:opacity-60 disabled:cursor-wait transition-all"
            >
              {submitting ? t('submitting') : t('submit')}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setError(''); }}
              className="rounded-full px-5 py-2 text-xs text-text-muted
                border border-border-default/40 hover:border-border-amber transition-colors"
            >
              {t('cancel')}
            </button>
          </div>
        </form>
      )}

      {/* Reviews list */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-xl bg-bg-card/40 p-5 animate-pulse">
              <div className="h-3 w-24 bg-bg-elevated rounded mb-3" />
              <div className="h-3 w-full bg-bg-elevated rounded mb-2" />
              <div className="h-3 w-2/3 bg-bg-elevated rounded" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-text-muted/60 text-sm italic">{t('noReviews')}</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-xl bg-bg-card/60 border border-border-amber/50 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-amber/10 flex items-center justify-center text-amber text-xs font-medium">
                    {review.author_name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-text-primary text-sm font-medium">{review.author_name}</span>
                </div>
                <span className="text-text-faint text-[11px]">
                  {new Date(review.created_at + 'Z').toLocaleDateString()}
                </span>
              </div>
              <StarRating rating={review.rating} />
              <p className="text-text-secondary text-sm leading-relaxed mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

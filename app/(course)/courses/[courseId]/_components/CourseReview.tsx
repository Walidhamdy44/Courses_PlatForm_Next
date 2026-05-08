"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Star, Loader2 } from "lucide-react";

interface CourseReviewProps {
  courseId: string;
  existingReview: { rating: number; comment: string | null } | null;
}

const CourseReview = ({ courseId, existingReview }: CourseReviewProps) => {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(!!existingReview);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(`/api/courses/${courseId}/review`, {
        rating,
        comment: comment.trim() || null,
      });
      toast.success(submitted ? "Review updated!" : "Review submitted!");
      setSubmitted(true);
    } catch (error: any) {
      toast.error(error?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Star className="w-5 h-5 text-[#2F288B]" />
        {submitted ? "Your Review" : "Rate This Course"}
      </h3>

      {/* Star Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            disabled={isLoading}
            className="p-0.5 transition-transform hover:scale-110 disabled:opacity-50"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            <Star
              className={`w-8 h-8 transition-colors ${
                star <= (hoveredRating || rating)
                  ? "text-amber-400 fill-amber-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
        {rating > 0 && (
          <span className="ml-2 text-sm text-gray-500">
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent"}
          </span>
        )}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience with this course (optional)"
        rows={3}
        disabled={isLoading}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:border-[#2F288B] focus:ring-1 focus:ring-[#2F288B]/20 transition-colors resize-none disabled:opacity-50"
      />

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || rating === 0}
        className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 bg-[#2F288B] text-white rounded-xl text-sm font-medium hover:bg-[#3E399A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {submitted ? "Update Review" : "Submit Review"}
      </button>
    </div>
  );
};

export default CourseReview;

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  totalReviews?: number;
  size?: "sm" | "md";
}

const StarRating = ({ rating, totalReviews, size = "sm" }: StarRatingProps) => {
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${
            star <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : star - 0.5 <= rating
              ? "text-amber-400 fill-amber-400/50"
              : "text-gray-300"
          }`}
        />
      ))}
      {rating > 0 && (
        <span className={`${textSize} font-semibold text-gray-700 ml-0.5`}>
          {rating.toFixed(1)}
        </span>
      )}
      {totalReviews !== undefined && totalReviews > 0 && (
        <span className={`${textSize} text-gray-500`}>
          ({totalReviews})
        </span>
      )}
    </div>
  );
};

export default StarRating;

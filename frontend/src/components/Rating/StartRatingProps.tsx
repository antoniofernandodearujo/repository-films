import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number | null;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const handleClick = (index: number) => {
    onRatingChange(index);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = hoveredRating ? i <= hoveredRating : i <= (rating || 0);
      stars.push(
        <div
          key={i}
          className="star"
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
        >
          {isFilled ? <FaStar size={30} className="text-yellow-500" /> : <FaRegStar size={30} className="text-gray-900" />}
        </div>
      );
    }
    return stars;
  };

  return <div className="flex cursor-pointer">{renderStars()}</div>;
};

export default StarRating;

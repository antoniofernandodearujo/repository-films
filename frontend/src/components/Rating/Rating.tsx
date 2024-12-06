// Rating.tsx
import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import ScoreAPI from "@/api/Score";

interface RatingProps {
  filmId: string;
}

const Rating: React.FC<RatingProps> = ({ filmId }) => {
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await ScoreAPI.scoreFilmMedia(filmId);
        setRating(response.mediaScore);
      } catch (error) {
        console.error("Erro ao buscar a média de avaliação:", error);
      }
    };
    fetchRating();
  }, [filmId]);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-500 text-xl" /> // Aumentado para `text-xl`
        ) : (
          <FaRegStar key={i} className="text-gray-400 text-xl" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col items-center justify-center"> {/* Alinhado ao centro */}
      <div className="flex">
        {renderStars()}
      </div>
      <span className="mt-1 text-lg font-semibold">{rating} / 5</span> {/* Tamanho ajustado */}
    </div>
  );
};

export default Rating;

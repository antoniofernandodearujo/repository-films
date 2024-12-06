import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import StarRating from "../Rating/StartRatingProps";
import TextInput from "@/components/TextInput";
import ScoreAPI from "@/api/Score";
import { useForm } from "react-hook-form";

// Define the props for the ModalRateFilm component
interface ModalRateFilmProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: string;
  userId: string;
  onRatingSubmitted: () => void;
}

const ModalRateFilm: React.FC<ModalRateFilmProps> = ({
  isOpen,
  onClose,
  movieId,
  userId,
  onRatingSubmitted,
}) => {
  // State for the score and comment
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");

  // Handle rating change
  const handleRatingChange = (newRating: number) => {
    setScore(newRating);
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  // Handle form submission
  const handleSubmitScore = async () => {
    if (score !== null) {
      try {
        await ScoreAPI.createScore({
          score,
          filmeId: movieId,
          usuarioId: userId,
          comentario: comment,
        });
        setComment("");
        onRatingSubmitted();
        onClose();
      } catch (error) {
        console.error("Erro ao submeter avaliação:", error);
      }
    }
  };

  // Render the modal if isOpen is true
  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[var(--color-light)] rounded-lg p-6 w-96 text-center shadow-2xl">
        <div className="flex justify-end items-end">
          <IoClose
            className="text-gray-700 ml-4 cursor-pointer"
            size={24}
            onClick={onClose}
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">Avalie o Filme</h3>

        <div className="flex justify-center items-center mt-4">
          <StarRating rating={score} onRatingChange={handleRatingChange} />
        </div>

        <div className="mt-4">
          <TextInput
            label="Comentário (opcional)"
            id="comment"
            type="text"
            register={register("comment")}
            multiline={true}
            error={errors.comment?.message?.toString()}
          />
        </div>

        <div className="mt-4 flex justify-center">
          <button
            className="w-full py-2 mt-4 bg-gray-900 text-white rounded hover:bg-gray-800 transition"
            onClick={handleSubmit(handleSubmitScore)}
          >
            Enviar Avaliação
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalRateFilm;

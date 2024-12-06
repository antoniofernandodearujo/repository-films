import React, { useState } from "react";
import { MovieCardProps } from "@/types/movieTypes";
import ModalRateFilm from "@/components/Modals/ModalRateFilm";
import ModalEditFilm from "@/components/Modals/ModalEditFilm"; // Importar Modal de Edição
import ModalDelete from "@/components/Modals/ModalDelete"; // Importar Modal de Exclusão
import Button from "../Button";
import { useAuth } from "@/shared/context/AuthContext";
import { IoWarning } from "react-icons/io5";
import Rating from "../Rating/Rating";
import FilmeAPI from "@/api/Filme";

export default function MovieCard({
  filmId,
  title,
  description,
  genre,
  releaseYear,
  duration,
  isOnPainel,
  loadMovies,
}: MovieCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);  // Controle do Modal de Edição
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);  // Controle do Modal de Exclusão
  const [message, setMessage] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const userId = localStorage.getItem("userId");

  const handleOpenModal = () => {
    if (isAuthenticated) {
      setIsModalOpen(true);
      setMessage(null);
    } else {
      setMessage("Você precisa estar autenticado para avaliar este filme.");
    }
  };

  const handleDeleteFilm = async (movieId: string) => {
    try {
      const api = new FilmeAPI();
      await api.delete(movieId);  // Função de exclusão na API
      loadMovies();  // Atualiza a lista de filmes
    } catch (error) {
      console.error("Erro ao excluir filme:", error);
    }
  };
  

  const handleCloseModal = () => setIsModalOpen(false);

  const handleFilmUpdated = () => {
    loadMovies();
  };

  const handleOpenModalEdit = () => setIsModalOpenEdit(true);  // Abrir o modal de edição
  const handleCloseModalEdit = () => setIsModalOpenEdit(false);  // Fechar o modal de edição

  const handleOpenModalDelete = () => setIsModalOpenDelete(true);  // Abrir o modal de exclusão
  const handleCloseModalDelete = () => setIsModalOpenDelete(false);  // Fechar o modal de exclusão

  return (
    <div className="w-80 min-h-[320px] p-4 bg-[#8C8C8C] rounded-lg text-white text-center shadow-lg flex flex-col justify-between">
      <h2 className="text-lg font-bold mb-1">{title}</h2>
      <div className="text-sm text-white font-medium mb-2">
        <span>{genre}</span> • <span>{releaseYear}</span> • <span>{duration} min</span>
      </div>
      <p className="text-sm text-justify text-white mb-3 font-medium flex-grow">{description}</p>

      <div className="flex justify-center items-center mt-2">
        <Rating filmId={filmId} />
      </div>

      {isAuthenticated && (
        <Button type="button" onClick={handleOpenModal} className="hover:bg-[#3a3a3a] transition-all duration-200 w-full mt-3">
          Avaliar
        </Button>
      )}

      {isOnPainel && (
        <>
          {/* Botão de Editar */}
          <Button
            type="button"
            onClick={handleOpenModalEdit}  // Chama o estado do modal de edição
            className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 transition-all duration-200"
          >
            Editar
          </Button>

          {/* Botão de Excluir */}
          <Button
            type="button"
            onClick={handleOpenModalDelete}  // Chama o estado do modal de exclusão
            className="w-full mt-2 bg-red-500 hover:bg-red-600 transition-all duration-200"
          >
            Excluir
          </Button>
        </>
      )}

      {message && (
        <div className="mt-2 text-center text-sm text-red-300 font-bold">
          <IoWarning size={22} />
          <p>{message}</p>
        </div>
      )}

      {/* Modal de Avaliação */}
      {isModalOpen && (
        <ModalRateFilm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          movieId={filmId}
          userId={userId || ""}
          onRatingSubmitted={handleFilmUpdated}
        />
      )}

      {/* Modal de Edição */}
      {isModalOpenEdit && (
        <ModalEditFilm
          isOpen={isModalOpenEdit}
          onClose={handleCloseModalEdit}
          movieId={filmId}
          onFilmUpdated={handleFilmUpdated}
          initialData={{
            title,
            description,
            gender: genre,
            duration,
            year_lance: releaseYear,
          }}
        />
      )}

      {/* Modal de Exclusão */}
      {isModalOpenDelete && (
        <ModalDelete
          isOpen={isModalOpenDelete}
          onClose={handleCloseModalDelete}
          movieName={title}
          movieId={filmId}
          onDelete={handleDeleteFilm}  // Passa a função de exclusão correta
        />
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/shared/context/AuthContext";
import useMovies from "@/shared/hook/useMovies";
import MovieCard from "./MovieCard";
import ModalCreateFilm from "@/components/Modals/ModalCreateFilm";
import SearchBar from "@/components/Search/SearchBar";
import Filters from "@/components/Search/Filters";
import UserAPI from "@/api/User"; // Importando sua classe UserAPI

export default function ListFilms() {
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [filters, setFilters] = useState<{ genre?: string; year?: string | number }>({});
  const [showRecommended, setShowRecommended] = useState(false);
  const [userName, setUserName] = useState<string | null>(null); // Estado para armazenar o nome
  const { isAuthenticated } = useAuth();
  const [isOnPainel, setIsOnPainel] = useState(false);

  useEffect(() => {
    setIsOnPainel(window.location.pathname === "/painel");

    // Buscar o nome do usuário quando o componente for montado
    const userId = localStorage.getItem("userId");
    if (userId) {
      UserAPI.findNameById(userId) // Usando a classe UserAPI
        .then((name) => {
          setUserName(name); // Definir o nome do usuário
        })
        .catch((error) => {
          console.error('Erro ao buscar nome do usuário:', error);
        });
    }
  }, []);

  const { loading, filteredMovies, noResults, loadMovies } = useMovies(isAuthenticated, isOnPainel, showRecommended, filters, searchTitle);

  const handleSearch = (search: string) => {
    setSearchTitle(search);
  };

  const handleFilter = (searchFilters: { genre: string; year: string | number }) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...searchFilters }));
  };

  return (
    <div>
      {/* Exibir saudação ao usuário se estiver autenticado */}
      {userName && isAuthenticated && (
        <div className="text-center mt-4 text-xl font-bold">
          <h2>Seja bem-vindo, {userName}!</h2>
        </div>
      )}

      <SearchBar onSearch={handleSearch} allFilms={filteredMovies} />
      <Filters onFilter={handleFilter} />

      <div className="flex mt-5 justify-center items-center w-full">
        <hr className="w-full" />
      </div>

      {isAuthenticated && isOnPainel && (
        <div className="flex mt-5 justify-center items-center mb-4">
          <ModalCreateFilm onFilmCreated={() => loadMovies()} />
        </div>
      )}

      {!isOnPainel && isAuthenticated && (
        <div className="flex justify-center mb-4">
          <button
            type="button"
            className="bg-none mt-5 mb-4 hover:bg-transparent text-white transition-all duration-300 hover:underline font-bold"
            onClick={() => setShowRecommended(!showRecommended)}
          >
            {showRecommended ? "Mostrar Todos os Filmes" : "Mostrar Recomendações"}
          </button>
        </div>
      )}

      {/* Exibir lista de filmes */}
      <div className="w-full mb-4 mt-8 flex flex-row justify-around items-center flex-wrap gap-4">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
          </div>
        ) : noResults ? (
          <div className="text-red-500 mt-5 text-center w-full">Nenhum filme encontrado para os filtros aplicados.</div>
        ) : (
          filteredMovies.map((movie, index) => (
            <MovieCard
              key={movie.filmId || index}
              filmId={movie.filmId}
              title={movie.title}
              description={movie.description}
              genre={movie.genre}
              duration={movie.duration}
              releaseYear={movie.year_lance}
              rating={movie.rating ?? 0}
              isOnPainel={isOnPainel}
              loadMovies={loadMovies}
            />
          ))
        )}
      </div>
    </div>
  );
}

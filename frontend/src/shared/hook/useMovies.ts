import { useState, useEffect } from "react";
import FilmeAPI from "@/api/Filme";
import { Movie } from "@/types/movieTypes";

/**
 * Custom hook to fetch and filter movies based on various criteria.
 *
 * @param {boolean} isAuthenticated - Indicates if the user is authenticated.
 * @param {boolean} isOnPainel - Indicates if the user is on the panel.
 * @param {boolean} showRecommended - Indicates if recommended movies should be shown.
 * @param {Object} filters - Filters to apply to the movie list.
 * @param {string} [filters.genre] - Genre to filter movies by.
 * @param {string | number} [filters.year] - Year to filter movies by.
 * @param {string} searchTitle - Title to search movies by.
 *
 * @returns {Object} - The hook returns an object containing:
 * @returns {boolean} loading - Indicates if the movies are currently being loaded.
 * @returns {Array} filteredMovies - The list of movies after applying filters.
 * @returns {boolean} noResults - Indicates if no movies were found after applying filters.
 * @returns {Function} loadMovies - Function to manually trigger loading of movies.
 */

interface FilteredMovie extends Movie {
  filmId: string;
  isOnPainel: boolean;
  loadMovies: () => void;
}

const useMovies = (isAuthenticated: boolean, isOnPainel: boolean, showRecommended: boolean, filters: { genre?: string; year?: string | number }, searchTitle: string) => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<FilteredMovie[]>([]);
  
  const [noResults, setNoResults] = useState(false);

  const loadMovies = async () => {
    setLoading(true);
    const filmeAPI = new FilmeAPI();
    try {
      const fetchMovies = showRecommended
        ? filmeAPI.listRecommended() // Carregar filmes recomendados
        : isAuthenticated
        ? isOnPainel
          ? filmeAPI.listById() // Filmes do usuário
          : filmeAPI.list() // Filmes gerais
        : filmeAPI.list(); // Filmes gerais
  
      const data = await fetchMovies;
      const mappedMovies = data.map((movie: Movie) => ({
        id: movie.id ?? "",
        title: movie.title,
        description: movie.description,
        genre: movie.genre,
        releaseYear: movie.year_lance,
        duration: movie.duration,
        rating: movie.rating, // Altere aqui para usar mediaScore
      }));
      setMovies(mappedMovies);
      setFilteredMovies(mappedMovies);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [isAuthenticated, isOnPainel, showRecommended]);

  const applyFilters = () => {
    let filtered = movies;

    if (filters.genre) {
      filtered = filtered.filter((movie) => movie.genre === filters.genre);
    }
    if (filters.year) {
      filtered = filtered.filter((movie) => movie.year_lance === Number(filters.year));
    }
    if (searchTitle) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    if (showRecommended) {
      filtered = filtered.filter((movie) => (movie.rating ?? 0) >= 4);
    }

    const mappedFilteredMovies = filtered.map((movie) => ({
      ...movie,
      filmId: movie.id ?? "",
      isOnPainel,
      loadMovies,
    }));
    setFilteredMovies(mappedFilteredMovies);
    setNoResults(filtered.length === 0);
  };

  useEffect(() => {
    applyFilters();
  }, [movies, filters, searchTitle, showRecommended]);

  return { loading, filteredMovies, noResults, loadMovies };
};

export default useMovies;

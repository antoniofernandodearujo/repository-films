import { Movie } from "@/types/movieTypes";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (searchTitle: string) => void; // Espera uma string de título
  allFilms: Movie[];
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const search = searchQuery.trim().toLowerCase();

    // Quando a pesquisa for mais de 2 caracteres, passa o título para o componente pai
    if (search.length > 2) {
      onSearch(search); // Passa o título da pesquisa
    } else if (!search) {
      onSearch(""); // Se não houver pesquisa, passa uma string vazia
    }
  }, [searchQuery, onSearch]);

  return (
    <div className="w-full p-4 flex justify-center content-center">
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Pesquisar filmes..."
          className="w-full p-2 pr-10 rounded bg-[var(--color-tertiary)] text-white placeholder-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Atualiza a query de pesquisa
        />
        <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white cursor-pointer" />
      </div>
    </div>
  );
}

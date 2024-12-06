import React, { useState } from "react";
import Button from "@/components/Button";

export default function Filters({ onFilter }: { onFilter: (searchFilters: { genre: string; year: string | number }) => void }) {
    const [genre, setGenre] = useState<string>("");
    const [year, setYear] = useState<string | number>("");

    const handleFilter = async () => {
        onFilter({ genre, year }); // Passa os filtros aplicados para o componente pai
    };

    return (
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
            <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="p-2 border rounded"
            >
                <option value="">Selecione o gênero</option>
                <option value="Ação">Ação</option>
                <option value="Drama">Drama</option>
                <option value="Comédia">Comédia</option>
                <option value="Terror">Terror</option>
                <option value="Ficção">Ficção</option>
                <option value="Fantasia">Fantasia</option>
                <option value="Suspense">Suspense</option>
                <option value="Animação">Animação</option>  
            </select>

            <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="p-2 border rounded"
            >
                <option value="">Selecione o ano</option>
                {Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>

            <Button
                type="button"
                className="hover:bg-[#3a3a3a] transition-all duration-200"
                onClick={handleFilter}
            >
                Filtrar
            </Button>
        </div>
    );
}

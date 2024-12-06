// Define a estrutura de um objeto Movie
export interface Movie {
    id?: string;
    title: string;
    description: string;
    year_lance: number;
    genre: string;  // Alterado de 'gender' para 'genre'
    duration: number;
    rating?: number;
}

// Define as propriedades para um componente MovieCard
export interface MovieCardProps {
    rating: number;
    filmId: string;
    title: string;
    description: string;
    genre: string;  // Alterado de 'gender' para 'genre'
    releaseYear: number;
    duration: number;
    currentRating?: number;
    isOnPainel: boolean;  
    loadMovies: () => void;  
}

// Define a estrutura para os dados do formulário de avaliação
export interface RateFormData {
    rating: number;
    comment: string; 
}

// Define as propriedades para um componente Modal genérico
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

// Define as propriedades para um componente Modal usado para criar um filme
export interface ModalCreateFilmProps {
    onFilmCreated: () => void;
}

// Define as propriedades para um componente Modal usado para editar um filme
export interface ModalEditFilmProps {
    isOpen: boolean;
    onClose: () => void;
    movieId: string;
    onFilmUpdated: () => void;
    initialData: {
        gender: string;
        year_lance: number;
        title: string;
        description: string;
        duration: number;
    };
}

// Define as propriedades para um componente Modal usado para avaliar um filme
export interface ModalRateFilmProps {
    isOpen: boolean;
    onClose: () => void;
    movieId: string;
    onRatingSubmitted: () => void;
}

// Define as propriedades para um componente Modal usado para deletar um filme
export interface ModalDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: (id: string) => void;
    movieName: string;
    movieId: string;  
}

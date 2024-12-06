// route protected
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import Title from "@/components/Title";
import ListFilms from "@/components/Movie/ListFilms";

export default function Painel() {
    return (
        <ProtectedRoute>
            <Header />
            <Title title="Meus Filmes" />
            <ListFilms />
        </ProtectedRoute>
    );
}
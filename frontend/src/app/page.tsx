// components
import Header from "@/components/Header";
import Title from "@/components/Title";
import ListAllFilms from "@/components/Movie/ListFilms";

export default function Home() {
  return (
    <div>
      <Header />
      <Title title="Lista de Filmes" />
      <ListAllFilms />
    </div>
  );
}

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button';
import Modal from '@/components/Modals/Modal';
import TextInput from '@/components/TextInput';
import { movieSchema } from '@/utils/validation';
import { Movie, ModalEditFilmProps } from '@/types/movieTypes';
import FilmeAPI from '@/api/Filme';

export default function ModalEditFilm({
  isOpen,
  onClose,
  movieId,
  onFilmUpdated,
  initialData,
}: ModalEditFilmProps) {
  // Estado para gerenciar os dados do filme
  const [movie, setMovie] = useState<Movie | null>(
    initialData
      ? { ...initialData, year_lance: initialData.year_lance || 0, genre: initialData.gender || '' }
      : null
  );

  // Inicializa o formulário com react-hook-form e validação zod
  const { register, handleSubmit, formState: { errors } } = useForm<Movie>({
    resolver: zodResolver(movieSchema),
    defaultValues: initialData,
  });

  // Função para lidar com a submissão do formulário
  const onSubmit: SubmitHandler<Movie> = async (data) => {
    const updatedData: Movie = {
      ...movie,
      ...data,
    };

    try {
      const api = new FilmeAPI();
      await api.update(movieId, updatedData);
      onFilmUpdated();
      setMovie(null);
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar filme:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Filme">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-[var(--color-light)] rounded-lg p-6">
        {/* Título */}
        <TextInput
          type="text"
          label="Título"
          id="title"
          register={register("title")}
          error={errors.title?.message}
        />

        {/* Descrição */}
        <TextInput
          type="text"
          label="Descrição"
          id="description"
          register={register("description")}
          error={errors.description?.message}
          multiline={true}  // Passando para ser um textarea
        />

        {/* Ano de Lançamento */}
        <TextInput
          type="number"
          label="Ano de Lançamento"
          id="year_lance"
          register={register("year_lance", { valueAsNumber: true })}
          error={errors.year_lance?.message}
        />

        {/* Gênero */}
        <TextInput
          type="text"
          label="Gênero"
          id="gender"
          register={register("genre")}
          error={errors.genre?.message}
        />

        {/* Duração (minutos) */}
        <TextInput
          type="number"
          label="Duração (minutos)"
          id="duration"
          register={register("duration", { valueAsNumber: true })}
          error={errors.duration?.message}
        />

        {/* Botão de Atualizar */}
        <Button className="w-full py-2 mt-4 bg-gray-900 text-white rounded hover:bg-gray-800 transition" type="submit">
          Atualizar Filme
        </Button>
      </form>
    </Modal>
  );
}

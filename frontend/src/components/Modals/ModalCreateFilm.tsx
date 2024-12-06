import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FilmeAPI from '@/api/Filme';
import Button from '../Button';
import Modal from '@/components/Modals/Modal';
import TextInput from '@/components/TextInput';
import { movieSchema } from '@/utils/validation';
import { Movie, ModalCreateFilmProps } from '@/types/movieTypes';

export default function ModalCreateFilm({ onFilmCreated }: ModalCreateFilmProps) {
  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility
  const [message, setMessage] = useState<string | null>(null); // State to manage success/error messages

  // Initialize form with validation schema
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Movie>({
    resolver: zodResolver(movieSchema),
  });

  // Form submission handler
  const onSubmit: SubmitHandler<Movie> = async (data) => {
    const api = new FilmeAPI();
    try {
      const result = await api.create(data); // Create movie via API

      if (!result) {
        throw new Error('Erro ao criar filme.');
      }
      
      setMessage('Filme criado com sucesso!');
      reset(); // Reset form fields
      setIsOpen(false); // Close modal
      if (onFilmCreated) {
        onFilmCreated(); // Notify parent component about the new movie
      }
    } catch (error) {
      console.error('Erro ao criar filme:', error);
      setMessage('Erro ao criar filme.');
    }
  };

  return (
    <>
      {/* Button to open modal */}
      <Button
        className="bg-green-500 hover:bg-green-600 duration-200 min-w-60 font-bold text-xl"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        + Criar Filme
      </Button>

      {/* Modal for creating a new movie */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Adicionar Novo Filme">
        {message && <p className="mb-4 text-center text-sm text-green-500">{message}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-[var(--color-light)] rounded-lg p-8 space-y-4">
          {/* Title input */}
          <TextInput
            type="text"
            label="Título"
            id="title"
            register={register("title")}
            error={errors.title?.message}
          />

          {/* Description input */}
          <TextInput
            type="text"
            label="Descrição"
            id="description"
            register={register("description")}
            error={errors.description?.message}
            multiline={true} // Render as textarea
          />

          {/* Release year input */}
          <TextInput
            type='number'
            label="Ano de Lançamento"
            id="year_lance"
            register={register("year_lance", { valueAsNumber: true })}
            error={errors.year_lance?.message}
          />

          {/* Genre input */}
          <TextInput
            type='text'
            label="Gênero"
            id="genre"
            register={register("genre")}
            error={errors.genre?.message}
          />

          {/* Duration input */}
          <TextInput
            type='number'
            label="Duração (minutos)"
            id="duration"
            register={register("duration", { valueAsNumber: true })}
            error={errors.duration?.message}
          />

          {/* Submit button */}
          <Button className="w-full py-2 mt-4 bg-gray-900 text-white rounded hover:bg-gray-800 transition" type="submit">
            Confirmar
          </Button>
        </form>
      </Modal>
    </>
  );
}

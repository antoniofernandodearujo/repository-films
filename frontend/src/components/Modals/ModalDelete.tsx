import React from 'react';
import Modal from '@/components/Modals/Modal';
import Button from '@/components/Button';
import { ModalDeleteProps } from '@/types/movieTypes';

export default function ModalDelete({
  isOpen,
  onClose,
  onDelete,
  movieName,
  movieId,
}: ModalDeleteProps) {
  const handleDelete = async () => {
    try {
      await onDelete(movieId);
      onClose();
    } catch (error) {
      console.error("Erro ao excluir filme:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Excluir Filme`}>
      <div className="bg-[var(--color-light)] rounded-lg p-6 shadow-2xl">
        <p className="text-gray-900 mb-4">Você tem certeza que deseja excluir o filme &ldquo;{movieName}&rdquo;?</p>
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white rounded hover:bg-red-600 mr-2 transition"
          >
            Sim, excluir
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-900 text-white rounded hover:bg-gray-800 transition"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
}

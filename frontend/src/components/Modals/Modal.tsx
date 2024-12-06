import React from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '@/components/Button';
import { ModalProps } from '@/types/movieTypes';

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // Se o modal não estiver aberto, retorna null para não renderizar nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex z-10 items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[var(--color-light)] p-6 sm:p-8 rounded-lg shadow-2xl w-full sm:w-[90%] md:w-[600px] max-w-full h-auto sm:h-[80%] overflow-auto">
        <div className="flex items-end justify-end mb-5">
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-900 hover:bg-gray-800 transition-all duration-200 p-1 rounded-full"
          >
            <IoMdClose color="#fff" size={22} />
          </Button>
        </div>
        <h2 className="text-xl sm:text-2xl text-[#515151] font-bold mb-6 text-center">{title}</h2>
        {children} {/* Renderiza o conteúdo específico do modal */}
      </div>
    </div>
  );
}

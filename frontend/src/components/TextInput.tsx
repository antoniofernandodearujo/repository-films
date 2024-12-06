import { UseFormRegisterReturn } from 'react-hook-form';

interface TextInputProps {
  label: string;
  id: string;
  register: UseFormRegisterReturn;
  error?: string;
  type: "text" | "number";
  multiline?: boolean;  // Adicionando a possibilidade de ser um textarea
}

/**
 * Componente de entrada de texto que pode ser um input ou textarea.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string} props.label - Rótulo do campo.
 * @param {string} props.id - Identificador do campo.
 * @param {Object} props.register - Função de registro do React Hook Form.
 * @param {string} [props.error] - Mensagem de erro a ser exibida.
 * @param {string} props.type - Tipo do input (ex: "text", "email", "password").
 * @param {boolean} [props.multiline=false] - Se verdadeiro, renderiza um textarea em vez de um input.
 *
 * @returns {JSX.Element} O componente de entrada de texto.
 */
export default function TextInput({
  label,
  id,
  register,
  error,
  type,
  multiline = false,  // Se multiline for true, será um textarea
}: TextInputProps) {
  return (
    <div>
      {/* Rótulo do campo */}
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      {/* Se multiline for verdadeiro, será um textarea, caso contrário um input */}
      {multiline ? (
        <textarea
          id={id}
          {...register}
          className="block text-black w-[100%] mt-1 p-2 border border-gray-300 rounded"
          rows={4}  // Definindo a altura do textarea
        />
      ) : (
        <input
          type={type}
          id={id}
          {...register}
          className="block text-black w-[100%] mt-1 p-2 border border-gray-300 rounded"
        />
      )}

      {/* Exibe mensagem de erro, se houver */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

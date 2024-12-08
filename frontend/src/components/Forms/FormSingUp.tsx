import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/utils/validation';
import TextInput from '../TextInput';
import PasswordInput from './PasswordInput';
import Button from '../Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import User from '@/api/User';

type SignupFormValues = z.infer<typeof signupSchema>;

export default function FormSignUp() {
  // Estado para mensagens de sucesso ou erro
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });
  
  const router = useRouter();

  // Função de envio do formulário de cadastro
  const onSubmit = async (data: SignupFormValues) => {
    try {
      const register = new User();
      const response = await register.register(data);

      if(response.status !== 201) {
        throw new Error('Erro ao cadastrar. Tente novamente.');
      }

      setMessage('Cadastro bem-sucedido!');
      setIsSuccess(true);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage('Erro ao cadastrar. Tente novamente. ' + (error.response?.data?.message || error.message));
      } else {
        setMessage('Erro ao cadastrar. Tente novamente. ' + (error as Error).message);
      }
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 px-4 sm:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md sm:max-w-lg p-6 bg-[var(--color-light)] rounded-lg shadow-2xl space-y-4"
      >
        <h2 className="text-2xl font-semibold mb-4 text-left text-gray-900">Cadastro</h2>

        {/* Campo de Nome */}
        <TextInput
          type='text'
          label="Nome"
          id="name"
          register={register("name")}
          error={errors.name?.message}
        />

        {/* Campo de E-mail */}
        <TextInput
          type='text'
          label="E-mail"
          id="email"
          register={register("email")}
          error={errors.email?.message}
        />

        {/* Campo de Senha */}
        <PasswordInput
          label="Senha"
          name="password"
          register={register}
          error={errors.password?.message}
        />

        {/* Campo de Confirmação de Senha */}
        <PasswordInput
          label="Confirmar Senha"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword?.message}
        />

        {/* Botão de Cadastro */}
        <Button type="submit" className="w-full py-2 mt-4 bg-gray-900 text-white rounded hover:bg-gray-800 transition">
          Cadastrar
        </Button>

        {/* Mensagem de feedback */}
        {message && (
          <p
            className={`text-center mt-4 font-bold ${isSuccess ? 'text-green-500' : 'text-red-500'}`}
          >
            {message}
          </p>
        )}

        {/* Botões para navegar */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="text-gray-800 font-bold hover:text-blue-700 transition-all duration-200"
          >
            Voltar para a Home
          </button>

          <button
            type="button"
            onClick={() => router.push('/login')}
            className="text-gray-800 font-bold hover:text-blue-700 transition-all duration-200"
          >
            Já tem uma conta? Faça login
          </button>
        </div>
      </form>
    </div>
  );
}

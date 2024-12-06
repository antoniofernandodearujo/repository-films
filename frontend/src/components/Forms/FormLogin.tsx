import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/utils/validation';
import TextInput from '../TextInput';
import PasswordInput from './PasswordInput';
import Button from '../Button';
import { useAuth } from '@/shared/context/AuthContext';
import { useRouter } from 'next/navigation';

type LoginFormValues = z.infer<typeof loginSchema>;

export default function FormLogin() {
  // Estado para mensagens de sucesso ou erro
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  // Configuração do formulário com validação usando zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // Função de envio do formulário de login
  const onSubmit = async (data: LoginFormValues) => {
    const success = await login(data.email, data.password);
    if (success) {
      setMessage('Login bem-sucedido!');
      setIsSuccess(true);
      setTimeout(() => router.push('/'), 2000); // Redireciona após sucesso
    } else {
      setMessage('Falha no login. Verifique suas credenciais.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-600 px-4 sm:px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md sm:max-w-lg p-6 bg-[var(--color-light)] rounded-lg shadow-2xl space-y-4"
      >
        <h2 className="text-2xl font-semibold mb-4 text-left text-gray-900">Login</h2>

        {/* Campo de E-mail */}
        <TextInput
          type="text"
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

        {/* Botão de Login */}
        <Button type="submit" className="w-full py-2 mt-4 bg-gray-900 text-white rounded hover:bg-gray-800 transition">
          Entrar
        </Button>

        {/* Link para página de Cadastro */}
        <button
          type="button"
          onClick={() => router.push('/signup')}
          className="w-full font-bold py-2 mt-4 text-gray-900 text-center hover:text-gray-700 transition"
        >
          Não tem uma conta? Cadastre-se
        </button>

        <button
            type="button"
            onClick={() => router.push('/')}
            className="text-gray-800 w-full text-center font-bold hover:text-blue-700 transition-all duration-200"
          >
            Voltar para a Home
        </button>

        {/* Mensagem de feedback */}
        {message && (
          <p
            className={`text-center mt-4 font-bold ${isSuccess ? 'text-green-500' : 'text-red-500'}`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}


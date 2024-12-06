import { z } from 'zod';

// Esquema para validação de login
export const loginSchema = z.object({
  email: z.string().email("O e-mail deve ser válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

// Esquema para validação de cadastro
export const signupSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("O e-mail deve ser válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "A confirmação da senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], // indica onde o erro aparecerá
});

// Esquema para validação de filme
export const movieSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório." }),
  description: z.string().min(1, { message: "A descrição é obrigatória." }),
  year_lance: z.number().min(1888, { message: "Ano inválido." }).max(new Date().getFullYear(), { message: "Ano deve ser atual ou anterior." }),
  genre: z.string().min(1, { message: "O gênero é obrigatório." }),
  duration: z.number().min(1, { message: "A duração deve ser maior que 0." }),
});
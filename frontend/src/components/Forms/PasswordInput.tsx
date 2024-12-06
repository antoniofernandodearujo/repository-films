import { useState } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

import { FieldValues } from 'react-hook-form';

interface PasswordInputProps<T extends FieldValues> {
  label: string;
  name: keyof T;
  register: UseFormRegister<T>;
  error?: string;
}

export default function PasswordInput<T extends FieldValues>({
  label,
  name,
  register,
  error,
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <label htmlFor={String(name)} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          type={showPassword ? 'text' : 'password'}
          id={String(name)}
          {...register(name as unknown as Path<T>)}
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
        >
          {showPassword ? '👁️' : '🚫'}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

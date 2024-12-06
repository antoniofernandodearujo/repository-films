import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type:"button" | "submit" | "reset" | undefined;
}

export default function Button({ children, onClick, className, type }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 rounded bg-[var(--color-secondary)] text-white ${className}`}
    >
      {children}
    </button>
  );
};
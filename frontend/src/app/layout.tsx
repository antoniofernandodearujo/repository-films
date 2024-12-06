import type { Metadata } from "next";
import { AuthProvider } from "@/shared/context/AuthContext";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import "./globals.css";

export const metadata: Metadata = {
  title: "CineMate",
  description: "O melhor site de avaliação de filmes do Brasil!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Suspense fallback={<Loading />}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}

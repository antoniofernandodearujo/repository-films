'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps){
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            const timeoutId = setTimeout(() => {
                router.push('/access-denied'); // Redireciona para a página de acesso negado
            }, 3000);
            
            router.push('/'); // Redireciona para a página de login

            return () => clearTimeout(timeoutId);

        }
    }, [isAuthenticated, router]);

    // Se estiver autenticado, renderiza os filhos
    return isAuthenticated ? <>{children}</> : null;
};

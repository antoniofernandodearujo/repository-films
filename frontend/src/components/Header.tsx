"use client";

import Button from "./Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/context/AuthContext";
import { IoExit } from "react-icons/io5";

export default function Header() {
    const router = useRouter();
    const { isAuthenticated, logout } = useAuth();

    const handleLoginClick = () => {
        router.push("/login");
    };

    const handleLogoutClick = () => {
        logout();
        router.push("/");
    };

    const handleBackToHomeClick = () => {
        router.push("/");
    };

    return (
        <header className="flex justify-between items-center p-4 bg-[var(--color-tertiary)] text-white">
            <Button
                type="button"
                className="text-2xl font-bold bg-transparent"
                onClick={handleBackToHomeClick}
            >
                CineMate
            </Button>
            {isAuthenticated ? (
                <>
                    <div className="flex gap-5 flex-row justify-around">
                        
                        <Button
                            type="button"
                            className="hover:bg-[var(--color-secondary)] hover:opacity-80 transition-all duration-200"
                            onClick={() => router.push("/painel")}
                        >
                            Painel
                        </Button>

                        <Button
                            type="button"
                            className="hover:bg-[var(--color-primary)] hover:opacity-80 transition-all duration-200"
                            onClick={handleLogoutClick}
                        >
                            <IoExit size={22} />
                        </Button>
                    </div>
                </>
            ) : (
                <Button
                    type="button"
                    className="hover:bg-[var(--color-primary)] hover:opacity-80 transition-all duration-200"
                    onClick={handleLoginClick}
                >
                    Login
                </Button>
            )}
        </header>
    );
}

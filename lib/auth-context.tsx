"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

type AuthContextType = {
  user: DemoUser | null;
  signIn: (user: DemoUser) => void;
  signOut: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if there's a user in URL params (for demo purposes)
    const userId = searchParams.get("user");
    const userRole = searchParams.get("role");
    
    if (userId && userRole) {
      // In a real app, this would validate the session with the backend
      const storedUser = localStorage.getItem("vesita_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } else {
      // Try to restore from localStorage
      const storedUser = localStorage.getItem("vesita_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    
    setIsLoading(false);
  }, [searchParams]);

  const signIn = (userData: DemoUser) => {
    setUser(userData);
    localStorage.setItem("vesita_user", JSON.stringify(userData));
    
    // Redirect based on role
    const query = `?user=${encodeURIComponent(userData.id)}&role=${encodeURIComponent(userData.role.toLowerCase())}`;
    switch (userData.role) {
      case "ADMIN":
        router.push(`/admin/dashboard${query}`);
        break;
      case "ORGANIZER":
        router.push(`/organizer/dashboard${query}`);
        break;
      case "ATTENDEE":
        router.push(`/events${query}`);
        break;
      default:
        router.push(`/events${query}`);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("vesita_user");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}


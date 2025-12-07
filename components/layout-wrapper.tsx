"use client";

import { usePathname } from "next/navigation";
import { NavigationBar } from "@/components/navigation";
import { AuthenticatedNav } from "@/components/authenticated-nav";
import { SiteFooter } from "@/components/footer";
import { useAuth } from "@/lib/auth-context";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isLoading } = useAuth();
  
  // Routes where we show the landing page navigation (no auth)
  const landingRoutes = ["/", "/get-started", "/sign-in"];
  const isLandingPage = landingRoutes.includes(pathname);
  
  // Check if user is authenticated
  const isAuthenticated = !!user;
  
  return (
    <>
      {/* Show different navigation based on auth state and route */}
      {!isLandingPage && isAuthenticated ? (
        <AuthenticatedNav />
      ) : isLandingPage ? (
        <NavigationBar />
      ) : null}
      
      <main>{children}</main>
      
      {/* Only show footer on landing pages */}
      {isLandingPage && <SiteFooter />}
    </>
  );
}


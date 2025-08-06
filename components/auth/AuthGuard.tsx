 'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores';
import { useTranslations } from 'next-intl';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const t = useTranslations();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, checkAuthStatus } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuthStatus();
      } catch (error) {
        console.error('Auth verification failed:', error);
      } finally {
        setIsChecking(false);
      }
    };

    verifyAuth();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (!isChecking && !isLoading && !isAuthenticated) {
      // Get current locale from URL
      const pathname = window.location.pathname;
      const locale = pathname.split('/')[1] || 'en';
      router.push(`/${locale}/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`);
    }
  }, [isChecking, isLoading, isAuthenticated, router]);

  // Show loading while checking authentication
  if (isChecking || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="text-muted-foreground">{t('jobSearch.jobList.loading')}</div>
      </div>
    );
  }

  // Show children only if authenticated
  if (isAuthenticated && user) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
}
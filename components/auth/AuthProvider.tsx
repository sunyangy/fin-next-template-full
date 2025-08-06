"use client";

import { useEffect } from 'react';
import { useAuthStore } from '@/stores';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { checkAuthStatus } = useAuthStore();

  useEffect(() => {
    // 应用启动时检查认证状态
    checkAuthStatus();
  }, [checkAuthStatus]);

  return <>{children}</>;
} 
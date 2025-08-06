'use client';

import { useEffect } from 'react';
import { usePreferencesStore } from '@/stores';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = usePreferencesStore();

  useEffect(() => {
    const html = document.documentElement;
    
    // 应用主题到 HTML 元素
    if (theme === 'system') {
      // 跟随系统主题
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      html.classList.toggle('dark', systemTheme === 'dark');
    } else {
      // 手动设置主题
      html.classList.toggle('dark', theme === 'dark');
    }

    // 监听系统主题变化
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        html.classList.toggle('dark', mediaQuery.matches);
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  return <>{children}</>;
} 
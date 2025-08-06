import { create } from 'zustand';

// 用户类型定义
interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  bio?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  skills?: string[];
  experience?: string;
  education?: string;
  createdAt?: string;
  updatedAt?: string;
}

// 认证状态接口
interface AuthState {
  // 状态
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // 操作
  login: (email: string, password: string) => Promise<void>;
  loginWithOAuth: (provider: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  clearError: () => void;
  updateUser: (userData: Partial<User>) => void;
}

// 创建认证 store
export const useAuthStore = create<AuthState>((set, get) => ({
  // 初始状态
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // 登录方法
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // 使用NextAuth的signIn方法
      const { signIn } = await import('next-auth/react');
      
      console.log('Login request - email:', email);
      
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      
      console.log('SignIn result:', result);
      
      if (result?.ok) {
        // 登录成功，获取用户信息
        await get().checkAuthStatus();
      } else {
        console.log('SignIn error:', result?.error);
        set({ error: result?.error || '登录失败' });
      }
    } catch (error) {
      console.error('Login error:', error);
      set({ error: '网络错误，请稍后重试' });
    } finally {
      set({ isLoading: false });
    }
  },

  // OAuth 登录
  loginWithOAuth: async (provider: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // 使用NextAuth的signIn方法进行OAuth登录
      const { signIn } = await import('next-auth/react');
      await signIn(provider, { 
        callbackUrl: '/dashboard',
        redirect: true 
      });
    } catch (error) {
      console.error('OAuth login error:', error);
      set({ error: 'OAuth 登录失败', isLoading: false });
    }
  },

  // 登出方法 - 现在直接使用NextAuth的signOut
  logout: async () => {
    // 这个方法现在只是清除localStorage，实际的signout由组件处理
    localStorage.removeItem('user-settings');
  },

  // 检查认证状态
  checkAuthStatus: async () => {
    set({ isLoading: true });
    
    try {
      const response = await fetch('/api/auth/session', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Auth status check response:', data);
        console.log('Auth status check - user exists:', !!data.user);
        console.log('Auth status check - user has id:', !!data.user?.id);
        console.log('Auth status check - user has email:', !!data.user?.email);
        
        if (data.user && (data.user.id || data.user.email)) {
          // 如果用户没有ID但有邮箱，我们仍然认为用户是有效的
          const userWithId = {
            ...data.user,
            id: data.user.id || data.user.email // 使用邮箱作为备用ID
          };
          set({ 
            user: userWithId, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          });
        } else {
          console.log('No valid user found in session');
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        }
      } else {
        console.log('Session API returned error status:', response.status);
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: '检查认证状态失败' 
      });
    }
  },

  // 清除错误
  clearError: () => {
    set({ error: null });
  },

  // 更新用户信息
  updateUser: (userData: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null
    }));
  },
})); 
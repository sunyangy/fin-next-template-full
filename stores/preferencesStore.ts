import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 通知设置
interface NotificationSettings {
  email: boolean;
  push: boolean;
  jobAlerts: boolean;
  applicationUpdates: boolean;
}

// 职位提醒设置
interface JobAlert {
  id: string;
  name: string;
  keywords: string[];
  location: string;
  salaryMin: number;
  salaryMax: number;
  isActive: boolean;
}

// 用户偏好接口
interface PreferencesState {
  // 主题设置
  theme: 'light' | 'dark' | 'system';
  
  // 语言设置
  language: string;
  
  // 通知设置
  notifications: NotificationSettings;
  
  // 职位提醒
  jobAlerts: JobAlert[];
  
  // 界面设置
  sidebarCollapsed: boolean;
  compactMode: boolean;
  
  // 操作
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
  updateNotifications: (settings: Partial<NotificationSettings>) => void;
  addJobAlert: (alert: Omit<JobAlert, 'id'>) => void;
  updateJobAlert: (id: string, updates: Partial<JobAlert>) => void;
  removeJobAlert: (id: string) => void;
  toggleSidebar: () => void;
  setCompactMode: (compact: boolean) => void;
}

// 默认通知设置
const defaultNotifications: NotificationSettings = {
  email: true,
  push: false,
  jobAlerts: true,
  applicationUpdates: true,
};

// 创建偏好设置 store
export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      // 初始状态
      theme: 'system',
      language: 'en',
      notifications: defaultNotifications,
      jobAlerts: [],
      sidebarCollapsed: false,
      compactMode: false,

      // 设置主题
      setTheme: (theme: 'light' | 'dark' | 'system') => {
        set({ theme });
      },

      // 设置语言
      setLanguage: (language: string) => {
        set({ language });
      },

      // 更新通知设置
      updateNotifications: (settings: Partial<NotificationSettings>) => {
        set((state) => ({
          notifications: { ...state.notifications, ...settings }
        }));
      },

      // 添加职位提醒
      addJobAlert: (alert: Omit<JobAlert, 'id'>) => {
        const newAlert: JobAlert = {
          ...alert,
          id: Date.now().toString(), // 简单的 ID 生成
        };
        
        set((state) => ({
          jobAlerts: [...state.jobAlerts, newAlert]
        }));
      },

      // 更新职位提醒
      updateJobAlert: (id: string, updates: Partial<JobAlert>) => {
        set((state) => ({
          jobAlerts: state.jobAlerts.map(alert =>
            alert.id === id ? { ...alert, ...updates } : alert
          )
        }));
      },

      // 删除职位提醒
      removeJobAlert: (id: string) => {
        set((state) => ({
          jobAlerts: state.jobAlerts.filter(alert => alert.id !== id)
        }));
      },

      // 切换侧边栏
      toggleSidebar: () => {
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed
        }));
      },

      // 设置紧凑模式
      setCompactMode: (compact: boolean) => {
        set({ compactMode: compact });
      },
    }),
    {
      name: 'user-preferences',
      // 持久化所有偏好设置
    }
  )
); 
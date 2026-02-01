import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'alumni' | 'admin';
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password,
          });

          const { token, user } = response.data;

          set({
            user,
            token,
            isAuthenticated: true,
          });

          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Login failed');
        }
      },

      register: async (userData: any) => {
        try {
          const response = await axios.post(`${API_URL}/auth/register`, userData);

          const { token, user } = response.data;

          set({
            user,
            token,
            isAuthenticated: true,
          });

          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error: any) {
          throw new Error(error.response?.data?.message || 'Registration failed');
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        delete axios.defaults.headers.common['Authorization'];
      },

      setUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

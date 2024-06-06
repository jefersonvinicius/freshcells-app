import { create } from "zustand";

type UserAuthData = { jwt: string; userID: string };

type AuthStore = {
  authData: UserAuthData | null;
  login: (data: UserAuthData) => void;
  logout: () => void;
};

export const AUTH_STORAGE_KEY = "AUTH";

function initAuthData() {
  const initialValue = localStorage.getItem(AUTH_STORAGE_KEY);
  return initialValue ? JSON.parse(initialValue) : null;
}

const useAuthStore = create<AuthStore>((set) => ({
  authData: initAuthData(),
  login: (data: UserAuthData) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    set({ authData: data });
  },
  logout: () => {
    set({ authData: null });
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
}));

export function useAuth() {
  return useAuthStore();
}

export function getUserAuthImperative() {
  return useAuthStore.getState().authData;
}

export function getStore() {
  return useAuthStore;
}

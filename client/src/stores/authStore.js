import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = res.json();

      set({ user: res.ok && data.success ? data.data : null });
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ user: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  register: async ({ name, email, password }) => {
    if (!name?.trim() || !email?.trim() || !password) {
      return { success: false, message: "Please fill in all fields." };
    }
    try {
      const ras = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await ras.json();

      if (!ras.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Registration failed.",
        };
      }

      set({ user: data.data });
      return { success: true, message: "Registration successful." };
    } catch (error) {
      console.error("Error registering user:", error);
      return {
        success: false,
        message: "An error occurred while registering.",
      };
    }
  },

  login: async ({ email, password }) => {
    if (!email?.trim() || !password) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return {
          success: false,
          message: data.message || "Login failed.",
        };
      }

      set({ user: data.data });
      return { success: true, message: "Login successful." };
    } catch (error) {
      console.error("Error logging in:", error);
      return {
        success: false,
        message: "An error occurred while logging in.",
      };
    }
  },

  logout: async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({ user: null });
    }
  },
}));

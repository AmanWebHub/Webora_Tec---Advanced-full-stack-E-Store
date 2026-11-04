import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const useLogin = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const result = await login(formData);

      if (!result?.success) {
        setError(result?.message || "Login failed.");

        return;
      }

      const { user } = useAuthStore.getState();
      navigate(user?.role === "admin" ? "/admin" : "/");
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred during login.");
    } finally {
      setLoading(false);
    }

    return {
      formData,
      loading,
      error,
      handleChange,
      handleSubmit,
    };
  };
};

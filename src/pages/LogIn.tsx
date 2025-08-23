import { useEffect, useState } from "react";
import AuthForm from "../components/AuthForm/AuthForm";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import type { LogInData } from "../interface";

const LogIn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (location.search.includes("logout success")) {
      toast.success("You have been logged out successfully");
    }

    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://vica.website/api/user", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        })
        .then(() => navigate("/dashboard", { replace: true }))
        .catch(() => localStorage.removeItem("token"));
    }
  }, [location, navigate]);

  const handleSubmit = async (formData: LogInData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://vica.website/api/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const { token, user } = response.data;

      if (user.image_url) {
        user.image_url = `user.image_url = https://vica.website/storage/images/${user.image_url};`;
      }

      console.log(token)

      if (!response.data?.token) {
        throw new Error("Invalid response structure");
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          toast.error("Validation error: Please check your email and password");
        } else {
          toast.error("Login failed. Please try again.");
        }
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputs = [
    {
      label: "Email address:",
      placeholder: "example@gmail.com",
      type: "email",
      name: "email",
      required: true,
    },
    {
      label: "Password:",
      placeholder: "",
      type: "password",
      name: "password",
      required: true,
    },
  ];

  return (
    <AuthForm<LogInData>
      title="Login to Account"
      description="Please enter your email and password to continue"
      inputs={inputs}
      btn="Sign In"
      footer={{
        description: "Don't have an account?",
        link: { content: "Create Account", url: "/signup" },
      }}
      setData={handleSubmit} 
      isLoading={isLoading} 
    />
  );
};

export default LogIn;
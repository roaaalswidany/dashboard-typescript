import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import type {FormEvent, ChangeEvent} from "react"

const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, profile_image: file });

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.user_name) newErrors.user_name = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("first_name", formData.first_name);
      formDataToSend.append("last_name", formData.last_name);
      formDataToSend.append("user_name", formData.user_name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append(
        "password_confirmation",
        formData.password_confirmation
      );

      if (formData.profile_image) {
        formDataToSend.append("profile_image", formData.profile_image);
      }

      const response = await axios.post(
        "https://vica.website/api/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const userData = response.data.data.user;
      if (!userData.image && imagePreview) {
        userData.image = imagePreview;
      }

      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("userInfo", JSON.stringify(userData));

      toast.success("Registration successful!");
      navigate("/dashboard");
    } catch (error : any) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-2">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className=" grid grid-cols-3 gap-2">
            <div>
              <label className="  text-xs font-medium text-gray-700 mb-1 flex items-center">
                <FiUser className="mr-1" /> First Name
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${
                  errors.first_name ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${
                  errors.last_name ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${
                  errors.user_name ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.user_name}
                onChange={(e) =>
                  setFormData({ ...formData, user_name: e.target.value })
                }
              />
              {errors.user_name && (
                <p className="text-red-500 text-xs mt-1">{errors.user_name}</p>
              )}
            </div>
          </div>

          <div>
            <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FiMail className="mr-1" /> Email address
            </label>
            <input
              type="email"
              className={`w-full p-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiLock className="mr-1" /> Password
              </label>
              <input
                type="password"
                className={`w-full p-2 border rounded-md ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className={`w-full p-2 border rounded-md ${
                  errors.password_confirmation
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                value={formData.password_confirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password_confirmation: e.target.value,
                  })
                }
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password_confirmation}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col ">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <div
              className="relative w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed border-gray-300"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <FiCamera className="text-2xl mb-1" />
                  <span className="text-xs">Add Photo</span>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className=" cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition mt-4"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

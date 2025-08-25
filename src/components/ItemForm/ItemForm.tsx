import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import { MdOutlineUpload } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import type { CardProps, Product } from "../../interface";

interface ItemFormProps {
  setData?: (product: Product) => void;
  oldData?: CardProps;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

interface FormProduct extends Omit<Product, "id"> {
  id?: number;
  name?: string;
  price?: string;
}

const ItemForm = ({ setData, oldData, loading, setLoading }: ItemFormProps) => {
  const [imageUrl, setImageUrl] = useState<string>(oldData?.image_url || "");
  const [formState, setFormState] = useState<FormProduct>({
    name: oldData?.name || "",
    price: oldData?.price || "",
    image: null,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const submitProduct = async (productData: FormProduct) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token missing");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", productData.name || "");
      formDataToSend.append("price", productData.price || "");

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      if (oldData?.id) {
        formDataToSend.append("_method", "PUT");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const endpoint = oldData?.id
        ? `https://vica.website/api/items/${oldData.id}`
        : "https://vica.website/api/items";

      const response = await axios.post(endpoint, formDataToSend, config);

      toast.success(
        oldData?.id
          ? "Product updated successfully!"
          : "Product created successfully!"
      );

      if (setData) {
        setData({
          ...productData,
          id: response.data.id || oldData?.id || 0,
          image: imageFile,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.errors) {
          const errors = error.response.data.errors;
          Object.keys(errors).forEach((key) => {
            toast.error(`${key}: ${errors[key].join(", ")}`);
          });
        } else {
          toast.error(error.response?.data?.message || "Request failed");
        }
      } else {
        toast.error("Network error");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation(); 
    
    if (loading) return; 
    
    submitProduct(formState);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (field: keyof FormProduct, value: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col md:flex-row justify-between gap-6 pt-6">
        <div className="w-full md:w-[48%] space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Product Name:
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              id="name"
              className="block w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => handleInputChange('name', e.target.value)}
              value={formState.name}
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block mb-2 font-medium">
              Product Price:
            </label>
            <input
              type="number"
              placeholder="Enter product price"
              id="price"
              className="block w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => handleInputChange('price', e.target.value)}
              value={formState.price}
              required
            />
          </div>
        </div>

        <div className="w-full md:w-[48%]">
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Product preview"
                className="w-full h-full object-contain"
              />
            ) : oldData?.image_url ? (
              <img
                src={oldData.image_url}
                alt="Current product"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center text-center">
                <MdOutlineUpload className="text-5xl text-gray-400 mb-2" />
                <span className="text-gray-500">Upload Product Image</span>
                <span className="text-sm text-gray-400 mt-1">
                  (Required for new products)
                </span>
              </div>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
            required={!oldData && !imageFile}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`mt-8 w-full md:w-44 h-12 rounded-md flex items-center justify-center transition-colors ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white font-medium`}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : oldData ? (
          "Update Product"
        ) : (
          "Create Product"
        )}
      </button>
    </form>
  );
};

export default ItemForm;
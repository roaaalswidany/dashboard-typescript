import {
  useRef,
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

const ItemForm = ({ setData, oldData, loading, setLoading }: ItemFormProps) => {
  const [imageUrl, setImageUrl] = useState<string>(oldData?.image_url || "");
  const formData = useRef<Product>({ ...oldData, image: null });

  const submitProduct = async (productData: Product) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Authentication token missing");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", productData.name || oldData?.name || "");
      formDataToSend.append("price", productData.price || oldData?.price || "");

      if (productData.image) {
        formDataToSend.append("image", productData.image);
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
          id: response.data.id || oldData?.id,
          image_url: response.data.image_url || imageUrl || oldData?.image_url,
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
    submitProduct(formData.current);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      formData.current = {
        ...formData.current,
        image: event.target.files[0],
      };
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
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
              onChange={(e) => (formData.current.name = e.target.value)}
              defaultValue={oldData?.name}
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
              onChange={(e) => (formData.current.price = e.target.value)}
              defaultValue={oldData?.price}
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
            required={!oldData}
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

import { useEffect, useState } from "react";
import ItemForm from "../components/ItemForm/ItemForm";
import type { CardProps, Product } from "../interface";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditItems = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<CardProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<Product>({
    image: null,
    price: "",
    name: "",
    id: 0,
  });
console.log(formData)
  useEffect(() => {
    if (!id) {
      navigate("/dashboard/items");
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://vica.website/api/items/${id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              Accept: "application/json",
            },
          }
        );
        setProduct(response.data.data || response.data);
        setFormData({
          image: null,
          price: response.data.data?.price || response.data?.price || "",
          name: response.data.data?.name || response.data?.name || "",
          id:0,
        });
      } catch (error: unknown) {
        console.log(error)
        toast.error("Failed to load product");
        navigate("/dashboard/items");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleProductUpdate = async (updatedProduct: Product) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("name", updatedProduct.name || "");
      formData.append("price", updatedProduct.price || "");

      if (updatedProduct.image) {
        formData.append("image", updatedProduct.image);
      }

      const response = await axios.post(
        `https://vica.website/api/items/${id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response)
      toast.success("Product updated successfully!");
      navigate("/dashboard/items");
    } catch (error) {
      console.error("Update error:", error);

      toast.error(
        axios.isAxiosError(error)
          ? error.response?.data?.message || "Failed to update product"
          : "Network error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !product) {
    return <div>Loading product data...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className=" text-black dark:text-white">
      <h1 className=" cursor-pointer">Edit Product</h1>
      <ItemForm
        setData={handleProductUpdate}
        oldData={product}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default EditItems;

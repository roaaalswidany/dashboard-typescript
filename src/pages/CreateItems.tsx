import { useState } from "react";
import ItemForm from "../components/ItemForm/ItemForm";
import type { Product } from "../interface";
import { useNavigate } from "react-router-dom";

const CreateItems = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleProductCreate = async (newProduct: Product) => {
console.log(newProduct)
      navigate("/dashboard/items");
  };

  return (
    <div className="text-black dark:text-white">
      <h1>Create Product</h1>
      <ItemForm
        setData={handleProductCreate}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default CreateItems;
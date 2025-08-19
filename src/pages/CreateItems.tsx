import { useEffect, useState } from "react";
import ItemForm from "../components/ItemForm/ItemForm";
import type { Product } from "../interface";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateItems = () => {
  const [data, setData] = useState<Product>({
    image: null,
    price: "",
    name: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const handelProductCreate = (newProduct: Product) => {
    setData(newProduct);
  };

  useEffect(() => {
    if (data.image != null && data.name != "" && data.price != "") {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      if (data.image) {
        formData.append("image", data.image);
      }

      axios
        .post("https://vica.website/api/items", formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          navigate("/dashboard/items");
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [data, navigate]);

  return (
    <div className="text-black dark:text-white">
      <h1>Create Product</h1>
      <ItemForm
        setData={handelProductCreate}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default CreateItems;

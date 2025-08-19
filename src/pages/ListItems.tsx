import { useState, useEffect, useMemo } from "react";
import { useContext } from "react";
import { SearchContext } from "./Dashboard";
import axios from "axios";
import Cards from "../components/Cards/Cards";
import { Link } from "react-router-dom";
import type { Product } from "../interface";

const ListItems = () => {
  const search = useContext(SearchContext);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://vica.website/api/items", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setAllProducts(res.data.data || res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [allProducts, search]);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className=" text-black dark:text-white container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">
          All Products ({filteredProducts.length})
        </h1>
        <Link
          to="/dashboard/items/create"
          className="bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          + Create Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product : Product) => (
          <Cards
            key={product.id}
            id={product.id}
            name={product.name}
            image_url={product.image_url}
            price={product.price}
            setItemDelet={() =>
              setAllProducts((prev) => prev.filter((p) => p.id !== product.id))
            }
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="cursor-pointer px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`cursor-pointer px-4 py-2 border rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className=" cursor-pointer px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ListItems;

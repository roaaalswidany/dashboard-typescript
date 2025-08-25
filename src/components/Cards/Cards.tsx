import { FaRegTrashAlt } from "react-icons/fa";
import type { CardProps } from "../../interface";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FiHeart as FiHeartOutline,
  FiHeart as FiHeartFill,
} from "react-icons/fi";
import Confirmation from "../Confirmation/Confirmation";

const Cards = ({ id, image_url, name, price, setItemDelet }: CardProps) => {
  const [showDeleteCon, setDeleteCon] = useState(false);

  const deleteProduct = async () => {
    try {
      await axios.delete(`https://vica.website/api/items/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      });
      toast.success("Product deleted successfully");
      if (setItemDelet) setItemDelet(id);
    } catch (error) {
      toast.error("Failed to delete product");
        console.log(error)
    }
  };


  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favs.some((item: any) => item.id === id));
  }, [id]);

  const toggleFavorite = () => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (isFavorite) {
      const updated = favs.filter((item: any) => item.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
      toast.info("Removed from favorites");
    } else {
      favs.push({ id, name, image_url, price });
      localStorage.setItem("favorites", JSON.stringify(favs));
      setIsFavorite(true);
      toast.success("Added to favorites");
    }
  };

  return (
    <div
      className="
        w-full sm:w-[200px] md:w-[220px] lg:w-[250px]
        h-auto min-h-[300px]
        rounded-2xl
        dark:bg-dark
        p-4
        dark:text-white
        shadow-md hover:shadow-lg
        transition-all duration-200
        flex flex-col
      "
      key={id}
    >
      
      <div className="flex-grow flex items-center justify-center mb-3">
        <img
          className="
            max-w-full
            max-h-[120px] sm:max-h-[100px] md:max-h-[120px]
            object-contain
            mx-auto
          "
          src={image_url}
          alt={name || "Product image"}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-product.png";
          }}
        />
      </div>

      <div className="flex-grow-[2] flex flex-col justify-between">
        <div>
          <h2
            className="
            text-sm sm:text-base
            font-semibold
            line-clamp-2
            mb-1
          "
          >
            {name}
          </h2>
          <p className="text-blue-600 dark:text-blue-400 text-sm sm:text-base">
            {price}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 gap-3">
          <Link
            to={`/dashboard/items/edit/${id}`}
            className="
              text-xs sm:text-sm
              text-blue-600 dark:text-blue-400
              hover:underline
              cursor-pointer
            "
          >
            Edit Product
          </Link>

          <button
            onClick={toggleFavorite}
            className="text-xl focus:outline-none"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <FiHeartFill className="text-red-600" />
            ) : (
              <FiHeartOutline className="text-gray-400 hover:text-red-600 transition" />
            )}
          </button>

                    <button
            className="
              text-red-500 hover:text-red-700
              transition-colors
              p-1
            "
            onClick={() => setDeleteCon(true)}
            aria-label="Delete product"
          >
            <FaRegTrashAlt className="text-sm sm:text-base" />
          </button>

        </div>
      </div>

      {showDeleteCon && (
        <Confirmation
          message="Are you sure you want to delete this product?"
          onConfirm={deleteProduct}
          onCancel={() => setDeleteCon(false)}
          actionType="delete"
        />
      )}
    </div>
  );
};

export default Cards;
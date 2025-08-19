import { useEffect, useState } from "react";
import Cards from "../components/Cards/Cards";

const Favorits = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, []);

  const removeFromFavorites = (id: number) => {
    const updated = favorites.filter((item) => item.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  if (favorites.length === 0) {
    return <p className="text-center text-gray-500 dark:text-gray-400">No favorites added yet.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-6">My Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <Cards
            key={product.id}
            id={product.id}
            name={product.name}
            image_url={product.image_url}
            price={product.price}
            setItemDelet={() => removeFromFavorites(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorits;
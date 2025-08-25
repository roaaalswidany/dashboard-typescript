import { useContext } from "react";
import { ModeContext } from "../../pages/Dashboard";
import { CiDark, CiLight } from "react-icons/ci";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  setSearch: Dispatch<SetStateAction<string>>;
  setMode: Dispatch<SetStateAction<boolean>>;
}

const NavBar = ({ setSearch, setMode }: Props) => {
  const mode = useContext(ModeContext);
  const userInfoStr = localStorage.getItem("userInfo");

  const userInfo = userInfoStr
    ? JSON.parse(userInfoStr)
    : {
        image: "",
        first_name: "",
        last_name: "",
        user_name: "",
      };

  const getImageUrl = () => {
    if (!userInfo.image) return null;

    if (userInfo.image.startsWith("data:image")) {
      return userInfo.image;
    }

    if (userInfo.image.startsWith("/")) {
      return `https://vica.website${userInfo.image}`;
    }

    return userInfo.image;
  };

  const imageUrl = getImageUrl();

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 px-4 sm:px-6 py-3 bg-white dark:bg-gray-800 shadow-sm">
      <div className="w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 md:w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 transition-colors"
        />
      </div>

      <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-start">
        <div className="flex items-center gap-2 sm:gap-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
              {userInfo.first_name?.[0]?.toUpperCase()}
              {userInfo.last_name?.[0]?.toUpperCase()}
            </div>
          )}

          <div className="sm:block text-right">
            <p className="font-medium dark:text-white text-sm sm:text-base">
              {userInfo.first_name} {userInfo.last_name}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              @{userInfo.user_name}
            </p>
          </div>
        </div>
        <button
          onClick={() => setMode(!mode)}
          className="cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hidden md:flex"
          aria-label={mode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {mode ? (
            <CiDark size={22} className="text-gray-700 dark:text-gray-300" />
          ) : (
            <CiLight size={22} className="text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;

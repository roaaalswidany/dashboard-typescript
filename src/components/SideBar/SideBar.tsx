import { Link, useNavigate } from "react-router-dom";
import { iconComponents, type IconName } from "../Icons/icon";
import Confirmation from "../Confirmation/Confirmation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiMenu, FiX } from "react-icons/fi";

interface Items {
  content: string;
  link: string;
  icon: IconName;
}

interface Props {
  logo: string;
  items: Array<Items>;
}

const SideBar = ({ logo, items }: Props) => {
  const [showLogoutCon, setShowLogoutCon] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      const response = await axios.post(
        "https://vica.website/api/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    console.log(response)

      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed. Please try again.");
    } finally {
      setShowLogoutCon(false);
    }
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 sm:hidden p-2 rounded-md bg-gray-200 dark:bg-gray-700"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div
        className={`fixed sm:relative
          w-[220px] sm:w-[220px]
          h-screen
          py-6
          text-center
          flex flex-col gap-8
          dark:bg-dark
          bg-white
          shadow-lg sm:shadow-none
          z-40
          transition-transform duration-300 ease-in-out
          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full sm:translate-x-0"
          }
        `}
      >
        <h1 className="dark:text-white px-4">{logo}</h1>

        <div className="items flex flex-col justify-between grow items-center">
          <ul className="grow gap-6 flex-col w-full px-4 ">
            {items.map((item, index) => {
              const Icon = iconComponents[item.icon];
              return (
                <li className="dark:text-white" key={index}>
                  <Link
                    to={item.link}
                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="mr-2" />
                    {item.content}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            className="cursor-pointer w-[180px] h-10 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors mt-4"
            onClick={() => setShowLogoutCon(true)}
          >
            Log Out
          </button>
        </div>

        {showLogoutCon && (
          <Confirmation
            message="Are you sure you want to log out?"
            onConfirm={logOut}
            onCancel={() => setShowLogoutCon(false)}
            actionType="logout"
          />
        )}
      </div>
    </>
  );
};

export default SideBar;

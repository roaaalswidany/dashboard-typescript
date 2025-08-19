import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import SideBar from "../components/SideBar/SideBar";
import { createContext, useEffect, useState } from "react";

export const SearchContext = createContext<string>("");
export const ModeContext = createContext<boolean>(false);

const Dashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [mode, setMode] = useState(() => {
    const saveMode = localStorage.getItem("darkMode");
    return saveMode ? JSON.parse(saveMode) : false;
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(mode));
    document.documentElement.classList.toggle("dark", mode);
  }, [mode]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });
  return (
    <div className={` bg-white dark:bg-gray-800 flex ${mode ? "dark" : ""} `}>
      <ModeContext.Provider value={mode}>
        <SearchContext.Provider value={search}>
          <SideBar
            logo="DashStack"
            items={[
              {
                content: "Products",
                link: "/dashboard/products",
                icon: "AiOutlineProduct",
              },
              {
                content: "Favorits",
                link: "/dashboard/favorits",
                icon: "CiHeart",
              },
              {
                content: "Order Lists",
                link: "/dashboard/orders",
                icon: "FaListCheck",
              },
              {
                content: "Chat Support",
                link: "/dashboard/chat",
                icon: "FiMessageCircle", 
},
{
                content: "QR Code",
                link: "/dashboard/qr",
                icon: "QrIcon",
              },
            ]}
          />
          <div className=" grow">
            <NavBar setSearch={setSearch} setMode={setMode} />
            <div className=" p-6">
              <Outlet />
            </div>
          </div>
        </SearchContext.Provider>
      </ModeContext.Provider>
    </div>
  );
};

export default Dashboard;

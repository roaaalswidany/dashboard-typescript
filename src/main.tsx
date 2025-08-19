import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Auth from "./pages/Auth";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Itmes from "./pages/Itmes";
import EditItmes from "./pages/EditItmes";
import Favorits from "./pages/Favorits";
import Orders from "./pages/Orders";
import ListItems from "./pages/ListItems";
import CreateItems from "./pages/CreateItems";
import Products from "./pages/Products";
import { ToastContainer } from "react-toastify";
import Chat from "./components/Chat/Chat";
import QRPage from "./components/QRCode/QRCode";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Navigate to="signup" replace />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <ListItems />,
      },
      {
        path: "items",
        element: <Itmes />,
        children: [
          {
            path: "",
            element: <ListItems />,
          },
          {
            path: "create",
            element: <CreateItems />,
          },
          {
            path: "edit/:id",
            element: <EditItmes />,
          },
        ],
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "favorits",
        element: <Favorits />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "/dashboard/chat",
        element: <Chat />,
      },
        {
        path: "/dashboard/qr",
        element: <QRPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer position="top-right" autoClose={3000} />
    <RouterProvider router={routes} />
  </StrictMode>
);

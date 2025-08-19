import { Navigate, Outlet} from "react-router-dom";

const Auth = () => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="relative flex justify-center items-center h-screen">
      <img
        src="/assets/img/auth-bg.png"
        alt=""
        className="absolute top-[0] left-[0] z-[-1] h-screen w-screen"
      />
      <Outlet />
    </div>
  );
};

export default Auth;

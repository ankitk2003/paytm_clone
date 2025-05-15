import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const Appbar = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("firstname");
    if (name) {
      setFirstname(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstname");
    navigate("/signin");
  };

  return (
    <div className="shadow h-14 flex justify-between items-center px-4">
      <div className="text-lg font-semibold">PayTM App</div>
      <div className="flex items-center gap-4">
        <div>Hello, {firstname || "User"}</div>
        <div className="rounded-full h-10 w-10 bg-slate-200 flex items-center justify-center text-xl">
          {firstname ? firstname[0].toUpperCase() : "U"}
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

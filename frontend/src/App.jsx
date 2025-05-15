import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import ProtectedRoutes from "./components/ProtectedRoutes";
function App() {
  return (
    <>
      {/* <div className="bg-yellow-300">hi there</div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route index element={<Signin />} />
          <Route path="/signin" element={<Signin />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/send"
            element={
              <ProtectedRoutes>
                <SendMoney />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;


import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import  Signin  from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
function App() {
  return (
    <>
      {/* <div className="bg-yellow-300">hi there</div> */}
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// this is a app component
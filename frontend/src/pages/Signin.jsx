import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSignin() {

    const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


    console.log({ username, password });
    if (!username || !password) {
      console.error("All fields are required!");
      return;
    }

    try {
      const res = await axios.post(
        `${baseUrl}/api/v1/user/signin`,
        {
          username,
          password,
        }
      );

      console.log("Response:", res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("firstname",res.data.user.firstname)
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid username or password. Please try again.");
      } else {
        alert(error.message);
        console.error("Signin Error:", error.message);
      }
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />   
         <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button label={"Sign in"} onClick={handleSignin} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
export default Signin;

import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!firstname || !lastname || !username || !password) {
            console.error("All fields are required!");
            return;
        }

        try {
            console.log("Sending Data:", { firstname, lastname, username, password });

            const response = await axios.post("http://paytm-backend.collabsphere.store/api/v1/user/signup", {
                firstname,
                lastname,
                username,
                password
            });

            console.log("Response:", response.data);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error("Signup Error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                this is signup page
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputBox onChange={(e) => setFirstName(e.target.value) } placeholder="John" label={"First Name"} />
                    <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
                    <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="harkirat@gmail.com" label={"Email"} />
                    <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="******" label={"Password"} type="password" />
                    <div className="pt-4">
                        <Button onClick={handleSignup} label={"Sign up"} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    );
};

export default Signup;

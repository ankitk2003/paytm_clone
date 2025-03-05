import React, { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import axios from "axios";

function Dashboard() {
  const [balance, setBalance] = useState(0);
  
  
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Debug token
  
        if (!token) {
          throw new Error("No token found! User may not be logged in.");
        }
  
        const res = await axios.get(
          "http://paytm-backend.collabsphere.store/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        setBalance(res.data.balance);
      } catch (error) {
        console.log("Error fetching balance:", error);
      }
    };
  
    fetchBalance();
  }, []);
  return (
    <>
      <Appbar />
      <div className="m-8">
        <Balance value={balance} />
        <Users />
      </div>
    </>
  );
}

export default Dashboard;

import CreateAccess from "@/components/Admin/CreateAccess";
import Dashboard from "@/components/Admin/Dashboard";
import Data from "@/components/Admin/Data";
import Employee from "@/components/Admin/Employee";
import React, { useState,useEffect } from "react";
import { FaHome, FaDatabase, FaUserTie, FaSignOutAlt, FaKey } from "react-icons/fa";
import { firebase } from "../../Firebase/config";
import { useRouter } from "next/router";
import Certificates from "@/components/Admin/Certificates";
const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userRef = firebase.firestore().collection("users").doc(user.uid);
          const docSnap = await userRef.get();

          if (docSnap.exists) {
            setUserData(docSnap.data());
          } else {
            console.log("No such user!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        router.push("/"); // Redirect to login if no user
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      router.push("/"); // Redirect to home after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full border-t-blue-500 border-gray-200"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className=" ">
        {activeTab === "home" && <div><Dashboard userData={userData} /></div>}
        {activeTab === "Certificates" && <div><Certificates/></div>}
        {activeTab === "data" && <div><Data/></div>}
        {activeTab === "employee" && <div><Employee/></div>}
        {activeTab === "createAccess" && <div><CreateAccess/></div>}
        {activeTab === "logout" && <div>Logging Out...</div>}
      </div>
      
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t flex justify-around py-3">
        <button 
          className={`flex flex-col items-center text-sm ${activeTab === "home" ? "text-blue-500" : "text-gray-600"}`}
          onClick={() => setActiveTab("home")}
        >
          <FaHome size={24} />
          Home
        </button>
        <button 
          className={`flex flex-col items-center text-sm ${activeTab === "Certificates" ? "text-blue-500" : "text-gray-600"}`}
          onClick={() => setActiveTab("Certificates")}
        >
          <FaDatabase size={24} />
         Certificates
        </button>
        <button 
          className={`flex flex-col items-center text-sm ${activeTab === "employee" ? "text-blue-500" : "text-gray-600"}`}
          onClick={() => setActiveTab("employee")}
        >
          <FaUserTie size={24} />
       Users
        </button>
        <button 
          className={`flex flex-col items-center text-sm ${activeTab === "createAccess" ? "text-blue-500" : "text-gray-600"}`}
          onClick={() => setActiveTab("createAccess")}
        >
          <FaKey size={24} />
          Create Access
        </button>
        <button 
          className="flex flex-col items-center text-sm text-red-500"
          onClick={handleLogout}
        >
          <FaSignOutAlt size={24} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Index;

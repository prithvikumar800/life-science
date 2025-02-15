import Dashboard from "../../components/User/Dashboard";
import React, { useState, useEffect } from "react";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import { firebase } from "../../Firebase/config";
import { useRouter } from "next/router";

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
      <div>
        {activeTab === "home" && <Dashboard userData={userData} loading={loading} />}
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

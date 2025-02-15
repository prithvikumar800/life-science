import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebase } from "../Firebase/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const auth = firebase.auth();
  const db = firebase.firestore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userRef = db.collection("users").doc(user.uid);
      const userSnap = await userRef.get();

      if (userSnap.exists) {
        const userData = userSnap.data();
        if (userData.role === "Admin") {
          router.push("/Admin");
        } else if (userData.role === "Employee") {
          router.push("/Employee");
        } else if (userData.role === "User") {
          router.push("/User");
        } else {
          toast.error("Unauthorized access!");
        }
      } else {
        toast.error("User role not found!");
      }
    } catch (error) {
      toast.error("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white font-[sans-serif] min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <ToastContainer />
      <div className="max-w-md w-full border p-8 rounded-md bg-gray-100">
        <div className="text-center mb-6">
          <FaUser className="text-5xl text-gray-600 mx-auto" />
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="relative flex items-center">
            <input
              type="email"
              required
              className="w-full text-sm text-gray-800 bg-white border-2 border-transparent focus:border-[#1E2772] pl-4 pr-8 py-3 rounded-md outline-none"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className="absolute right-4 text-gray-400" />
          </div>

          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full text-sm text-gray-800 bg-white border-2 border-transparent focus:border-[#1E2772] pl-4 pr-8 py-3 rounded-md outline-none"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaEyeSlash className="absolute right-4 cursor-pointer text-gray-400" onClick={() => setShowPassword(false)} />
            ) : (
              <FaEye className="absolute right-4 cursor-pointer text-gray-400" onClick={() => setShowPassword(true)} />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
            {/* <div className="flex items-center">
              <input id="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-transparent rounded-md" />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                Remember me
              </label>
            </div> */}
            <div>
              <a href="/forgotpassword" className="text-sm font-semibold text-[#1E2772] hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-base font-semibold rounded-md text-white bg-[#1E2772] hover:bg-[#1e4272] focus:outline-none"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

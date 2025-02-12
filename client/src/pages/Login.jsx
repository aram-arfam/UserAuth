import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault(); // prevents refreshing
      axios.defaults.withCredentials = true; //sending cookies
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6  bg-gradient-to-br from-blue-200 to-purple-200">
      {/* <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      /> */}
      <div className="bg-purple-150 p-10 rounded-lg shadow-lg w-100 text-indigo-300 text-sm">
        <h2 className="text-2xl font-semibold text-black text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login "}
          <p className="text-center text-sm mb-6">
            {state === "Sign Up"
              ? "Create Your Account"
              : "Login to your account!"}
          </p>
          <form onSubmit={onSubmitHandler}>
            {state === "Sign Up" && (
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#e9ebec]">
                <img src={assets.person_icon} alt="" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="bg-transparent outline-none"
                  type="text"
                  placeholder="Enter Your Name"
                  required
                />
              </div>
            )}

            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#e9ebec]">
              <img src={assets.mail_icon} alt="" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="bg-transparent outline-none"
                type="email"
                placeholder="Enter Your Email id"
                required
              />
            </div>
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#e9ebec]">
              <img src={assets.lock_icon} alt="" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="bg-transparent outline-none"
                type="password"
                placeholder="Enter Your Password"
                required
              />
            </div>
            {state === "Login" && (
              <p
                onClick={() => navigate("/reset-password")}
                className="text-s mb-4 text-indigo-400 cursor-pointer "
              >
                Forgot Password?
              </p>
            )}

            <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-300 to bg-indigo-500 text-xs font-medium">
              {state}
            </button>
          </form>
          {state === "Sign Up" ? (
            <p className="text-gray-400 text-center text-s mt-4">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-400 cursor-pointer underline"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="text-gray-400 text-center text-s mt-4">
              No account with us?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-blue-400 cursor-pointer underline"
              >
                Sign Up Here
              </span>
            </p>
          )}
        </h2>
      </div>
    </div>
  );
};

export default Login;

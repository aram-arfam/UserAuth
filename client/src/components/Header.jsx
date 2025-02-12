import { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData } = useContext(AppContent);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      {!userData && (
        <img
          src={assets.hello}
          alt="Hello"
          className="w-64 h-64 rounded-full mb-6"
        />
      )}
      {userData && (
        <img
          src={assets.welcome}
          alt="Welcome"
          className="w-64 h-64 rounded-full mb-6"
        />
      )}

      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hello {userData ? userData.name : "Ji"}!
        <img className="w-8 aspect-square" src={assets.hand_wave} alt=".." />
      </h1>
      {userData && (
        <h2 className="text-3xl sm:text:5xl font-semibold mb-4">
          Stay Tuned For Further Updates
        </h2>
      )}
      {userData.isAccountVerified && <h1>Your Are Verified, Thank You</h1>}

      {!userData && (
        <div>
          <h2 className="text-3xl sm:text:5xl font-semibold mb-4">
            Welcome to UserAuth
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-blue-400 transition-all"
          >
            Login to Get Started
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

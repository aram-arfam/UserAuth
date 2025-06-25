import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import { AppContent } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault(); //prevent refresing
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      console.log(data);
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
      data.success && navigate("/reset-password");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmited(true);
  };
  const onSubmitNewPass = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { email, otp, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-200">
      {/* entring email  */}

      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your registered email id
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full ">
            <img src={assets.mail_icon} alt="mail icon" />
            <input
              className="bg-transparent outline-none text-white"
              type="email"
              placeholder="Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-300 to-indigo-600 text-white rounded-full mt-3">
            Submit
          </button>
        </form>
      )}
      {/* OTP INPUT FORM */}
      {!isOtpSubmited && isEmailSent && (
        <form
          onSubmit={onSubmitOTP}
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Password Reset OTP
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6 digit Code sent on your email id
          </p>
          <div className="flex justify-between mb-8 ">
            {/* onPaste={handlePaste()} */}
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="string"
                  maxLength="1"
                  key={index}
                  required
                  className="w-12 h-12  text-black text-center text-xl rounded-md"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to -indigo-900  text-white rounded-full">
            {" "}
            Submit
          </button>
        </form>
      )}

      {/* entering new pass */}

      {isOtpSubmited && isEmailSent && (
        <form
          onSubmit={onSubmitNewPass}
          className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            New Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the new password below
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full ">
            <img src={assets.lock_icon} alt="mail icon" />
            <input
              className="bg-transparent outline-none text-white"
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-300 to-indigo-600 text-white rounded-full mt-3">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;

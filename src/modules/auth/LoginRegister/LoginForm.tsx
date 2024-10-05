import { FaEnvelope, FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthButton from "../../../components/AuthButton";
import { Auth_URls } from "../../../constants/End-points";
import { EmailValidation } from "../../../constants/Validation";
import { LoginFormData } from "../../../utils/interfaces";
import React, { useState } from "react";
import axios from "axios";
import { setAuth } from "../authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Password visibility state
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await axios.post(Auth_URls.login, data);
      const { accessToken, refreshToken, profile } = response.data.data;
      dispatch(setAuth({ accessToken, refreshToken, profile }));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("profile", JSON.stringify(profile));
      navigate("/dashboard");
      toast.success("Logged in Successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message || "An error occurred";
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-11/12 mt-10 pt-10 gap-10 mx-auto"
    >
      {/* Email Field */}
      <div>
        <div className="relative flex mb-3 items-center border-2 border-borderColor rounded-md p-3  dark:border-primaryLight">
          <FaEnvelope className="absolute text-2xl left-4 text-primaryDark dark:text-lightText" />
          <input
            type="email"
            placeholder="Type your email"
            className="pl-10 bg-transparent border-none outline-none text-primaryDark dark:text-lightText placeholder:text-primaryDark dark:placeholder:text-primaryLight w-full"
            {...register("email", EmailValidation)}
          />
        </div>
        {errors.email && (
          <span className="dark:text-red-400 text-red-600 text-sm">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Password Field */}
      <div>
        <div className="relative flex items-center border-2 mb-3 border-borderColor rounded-md p-3  dark:border-primaryLight">
          <FaKey className="absolute left-4 text-2xl text-primaryDark dark:text-lightText" />
          <input
            type={isPasswordVisible ? "text" : "password"} // Toggle visibility
            placeholder="Type your password"
            className="pl-10 bg-transparent border-none outline-none text-primaryDark dark:text-lightText placeholder:text-primaryDark dark:placeholder:text-primaryLight w-full"
            {...register("password", { required: "Password is required" })}
          />
          <button
            type="button"
            className="absolute right-4"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? (
              <FaEyeSlash className="text-primaryDark dark:text-lightText" />
            ) : (
              <FaEye className="text-primaryDark dark:text-lightText" />
            )}
          </button>
        </div>
        {errors.password && (
          <span className="dark:text-red-400 text-red-600 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-between items-center">
        <AuthButton title="Sign In" />
        <div>
          Forgot your password?{" "}
          <Link className="dark:text-accent underline" to="/forgot-password">
            click here!
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

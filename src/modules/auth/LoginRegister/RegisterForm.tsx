import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { RegisterFormData, RegisterFormProps } from "../../../utils/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthButton from "../../../components/AuthButton";
import { Auth_URls } from "../../../constants/End-points";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../constants/Validation";

const RegisterForm: React.FC<RegisterFormProps> = ({ setMode }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Password visibility state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      await axios.post(Auth_URls.register, data);
      toast.success("Account Created Successfully. Please log in.");
      setMode("Login");
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
      className="flex flex-col w-11/12 mt-5 gap-3 mx-auto"
    >
      {/* First Name */}
      <div className="flex gap-10">
        <div className="flex-1">
          <div className="relative flex items-center border-2 mb-2 border-borderColor rounded-md p-3  dark:border-primaryLight">
            <FaUser className="absolute text-2xl left-4 text-primaryDark dark:text-lightText" />
            <input
              type="text"
              placeholder="Type your first name"
              className="pl-10 bg-transparent xs:text-xs border-none outline-none text-primaryDark dark:text-lightText placeholder:text-primaryDark dark:placeholder:text-primaryLight w-full"
              {...register("first_name", {
                required: "First name is required",
              })}
            />
          </div>
          {errors.first_name && (
            <span className="dark:text-red-400 text-red-600 text-sm">
              {errors.first_name.message}
            </span>
          )}
        </div>

        {/* Last Name */}
        <div className="flex-1">
          <div className="relative flex items-center xs:text-xs border-2 mb-2 border-borderColor rounded-md p-3  dark:border-primaryLight">
            <FaUser className="absolute text-2xl left-4 text-primaryDark dark:text-lightText" />
            <input
              type="text"
              placeholder="Type your last name"
              className="pl-10 bg-transparent border-none outline-none text-primaryDark dark:text-lightText placeholder:text-primaryDark dark:placeholder:text-primaryLight w-full"
              {...register("last_name", { required: "Last name is required" })}
            />
          </div>
          {errors.last_name && (
            <span className="dark:text-red-400 text-red-600 text-sm">
              {errors.last_name.message}
            </span>
          )}
        </div>
      </div>

      {/* Email Address */}
      <div>
        <div className="relative flex items-center border-2 mb-2 border-borderColor rounded-md p-3  dark:border-primaryLight">
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

      {/* Role Selection */}
      <div>
        <div className="relative flex items-center border-2 mb-2 border-borderColor rounded-md p-3  dark:border-primaryLight">
          <FaUsers className="absolute text-2xl left-4 text-primaryDark dark:text-lightText" />
          <select
            className="pl-10 bg-transparent  text-primaryDark dark:text-lightText border-none outline-none w-full"
            {...register("role")}
            defaultValue="Student"
            disabled
          >
            <option value="Student">Signing up as Student</option>
          </select>
        </div>
        {errors.role && (
          <span className="dark:text-red-400 text-red-600 text-sm">
            {errors.role.message}
          </span>
        )}
      </div>

      {/* Password Field */}
      <div>
        <div className="relative flex items-center border-2 mb-2 border-borderColor rounded-md p-3  dark:border-primaryLight">
          <FaKey className="absolute text-2xl left-4 text-primaryDark dark:text-lightText" />
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Type your password"
            className="pl-10 bg-transparent border-none outline-none text-primaryDark dark:text-lightText placeholder:text-primaryDark dark:placeholder:text-primaryLight w-full"
            {...register("password", PasswordValidation)}
          />
          <button
            type="button"
            className="absolute right-4 text-2xl"
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
      <AuthButton title="Sign Up" />
    </form>
  );
};

export default RegisterForm;

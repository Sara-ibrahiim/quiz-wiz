import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEnvelope, FaUser, FaKey, FaUsers } from "react-icons/fa";
import AuthButton from "../../../components/AuthButton";
import { RegisterFormData, RegisterFormProps } from "../../../utils/interfaces";
import { Auth_URls } from "../../../constants/End-points";
import axios from "axios";
import { toast } from "react-toastify";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../constants/Validation";

const RegisterForm: React.FC<RegisterFormProps> = ({ setMode }) => {
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
      className="flex flex-col gap-8 w-full mx-auto pt-10"
    >
      {/* First Name */}
      <div className="flex gap-10">
        <div className="flex-1">
          <div className="relative flex items-center border-2 mb-2 border-borderColor rounded-md p-3 dark:bg-darkSurface dark:border-primaryLight">
            <FaUser className="absolute text-2xl left-4 text-primaryDark dark:text-lightText" />
            <input
              type="text"
              placeholder="Type your first name"
              className="pl-10 bg-transparent border-none outline-none text-primaryDark dark:text-lightText placeholder:text-primaryDark dark:placeholder:text-primaryLight w-full"
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
          <div className="relative flex items-center border-2 mb-2 border-borderColor rounded-md p-3 dark:bg-darkSurface dark:border-primaryLight">
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
        <div className="relative flex items-center border-2 mb-2 border-borderColor rounded-md p-3 dark:bg-darkSurface dark:border-primaryLight">
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
        <div className="relative flex items-center border-2 mb-2 border-borderColor rounded-md p-3 dark:bg-darkSurface dark:border-primaryLight">
          <FaUsers className="absolute text-2xl left-4 text-primaryDark dark:text-lightText" />
          <select
            className="pl-10 bg-primaryLight dark:bg-darkSurface text-primaryDark dark:text-lightText border-none outline-none w-full"
            {...register("role")}
            defaultValue="Student"
            disabled
          >
            <option value="Student">Student</option>
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
        <div className="relative flex items-center border-2 mb-2 border-borderColor rounded-md p-3 dark:bg-darkSurface dark:border-primaryLight">
          <FaKey className="absolute text-2xl left-4 text-primaryDark dark:text-lightText" />
          <input
            type="password"
            placeholder="Type your password"
            className="pl-10 bg-transparent border-none outline-none text-primaryDark dark:text-lightText placeholder:text-primaryDark dark:placeholder:text-primaryLight w-full"
            {...register("password", PasswordValidation)}
          />
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

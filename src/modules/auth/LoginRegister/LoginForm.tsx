import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEnvelope, FaKey } from "react-icons/fa";
import AuthButton from "../../../components/AuthButton";
import { EmailValidation } from "../../../constants/Validation";
import { LoginFormData } from "../../../utils/interfaces";
import { Auth_URls } from "../../../constants/End-points";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      await axios.post(Auth_URls.login, data);
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
      className="flex flex-col gap-10 w-full mx-auto py-20"
    >
      {/* Email Field */}
      <div>
        <div className="relative flex mb-3 items-center border-2 border-borderColor rounded-md p-3 dark:bg-darkSurface dark:border-primaryLight">
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
        <div className="relative flex items-center border-2 mb-3 border-borderColor rounded-md p-3 dark:bg-darkSurface dark:border-primaryLight">
          <FaKey className="absolute left-4 text-2xl text-primaryDark dark:text-lightText" />
          <input
            type="password"
            placeholder="Type your password"
            className="pl-10 bg-transparent border-none outline-none text-primaryDark dark:text-lightText placeholder:text-primaryDark dark:placeholder:text-primaryLight w-full"
            {...register("password", { required: "Password is required" })}
          />
        </div>
        {errors.password && (
          <span className="dark:text-red-400 text-red-600 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <AuthButton title="Sign In" />
    </form>
  );
};

export default LoginForm;

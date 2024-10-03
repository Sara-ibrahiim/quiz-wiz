import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEnvelope, FaKey } from "react-icons/fa";
import AuthButton from "../../../components/AuthButton";
import { EmailValidation } from "../../../constants/Validation";

// Define the form data type
interface FormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Function to handle form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10 w-full mx-auto py-20"
    >
      {/* Email Field */}
      <div className="relative flex items-center border-2 border-borderColor rounded-md p-3 dark:bg-darkSurface dark:border-primaryLight">
        <FaEnvelope className="absolute text-2xl left-4 text-primaryDark dark:text-lightText" />
        <input
          type="email"
          placeholder="Type your email"
          className="pl-10 bg-transparent border-none outline-none text-primaryDark dark:text-lightText placeholder:text-primaryDark dark:placeholder:text-primaryLight w-full"
          {...register("email", EmailValidation)}
        />
      </div>
      {errors.email && (
        <span className="text-red-500 text-sm">{errors.email.message}</span>
      )}

      {/* Password Field */}
      <div className="relative flex items-center border-2 border-borderColor rounded-md p-3 dark:bg-darkSurface dark:border-primaryLight">
        <FaKey className="absolute left-4 text-2xl text-primaryDark dark:text-lightText" />
        <input
          type="password"
          placeholder="Type your password"
          className="pl-10 bg-transparent border-none outline-none text-primaryDark dark:text-lightText placeholder:text-primaryDark dark:placeholder:text-primaryLight w-full"
          {...register("password", { required: "Password is required" })}
        />
      </div>
      {errors.password && (
        <span className="text-red-500 text-sm">{errors.password.message}</span>
      )}

      {/* Submit Button */}
      <AuthButton title="Sign In" />
    </form>
  );
};

export default LoginForm;

import {
  EmailValidation,
  PasswordValidation,
} from "../../../constants/Validation";
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";

import AuthButton from "../../../components/AuthButton";
import AuthLogo from "../../../components/AuthLogo";
import { Auth_URls } from "../../../constants/End-points";
import { IoMdMail } from "react-icons/io";
import { RiMailSendFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface DataReset {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  let password;
  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DataReset>({ mode: "onChange" });
  password = watch("password", "");
  let onSubmit = async (data: DataReset) => {
    try {
      const { confirmPassword, ...apiData } = data;
      let response = await axios.post(Auth_URls.resetPassword, apiData);
      console.log(response.data);
      navigate("/auth");
      toast.success(
        response.data.message || "Successfully create new password"
      );
    } catch (error: any) {
      toast.error(error.response.data.message || "Failed");
    }
  };

  return (
    <>
      <AuthLogo />

      <section>
        <div className=" my-9">
          <p className="text-[#C5D86D] text-2xl font-bold">Reset password</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className="w-11/12"
        >
          <div className=" relative">
            <IoMdMail className=" absolute text-2xl left-4 mt-2  text-primaryDark dark:text-white" />
            <input
              type="email"
              placeholder="Type your email"
              className="invalid:border-rose-500 focus:bg-transparent font-light placeholder-black dark:placeholder-white p-2
          rounded-lg w-full border-2 focus:border-2
           border-primaryDark dark:border-white pl-11 text-sm  bg-transparent  text-primaryDark dark:text-white"
              {...register("email", EmailValidation)}
            />
            {errors.email && (
              <p className="text-rose-500 text-sm  mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="relative  my-7">
            <RiMailSendFill className=" absolute text-2xl left-4 mt-2  text-primaryDark dark:text-white" />

            <input
              type="text"
              placeholder="Type your oTb"
              className="invalid:border-rose-500 dark:invalid:border-rose-500 p-2 font-light focus:bg-transparent  
         focus:border-2 rounded-lg pl-11 text-sm w-full border-2 border-primaryDark dark:border-white bg-transparent placeholder-black dark:placeholder-white text-primaryDark dark:text-white "
              {...register("otp", {
                required: "OTP is required",
                minLength: {
                  value: 6,
                  message: "OTP must have at least 6 characters",
                },
              })}
            />
            {errors.otp && (
              <p className="text-rose-500 mt-1 text-sm   ">
                {errors.otp?.message}
              </p>
            )}
          </div>

          <div className="relative mb-7">
            <FaKey className=" absolute text-2xl left-4 mt-2  text-primaryDark dark:text-white" />

            <input
              type={isPasswordVisible ? "text" : "password"}
              className="invalid:border-rose-500 pl-11 text-sm f p-2 font-light focus:bg-transparent  
         focus:border-2  rounded-lg w-full border-2 border-primaryDark dark:border-white bg-transparent placeholder-black dark:placeholder-white text-primaryDark dark:text-white "
              placeholder="Type your password"
              aria-label="password"
              aria-describedby="basic-addon1"
              {...register("password", PasswordValidation)}
            />
            <button
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onMouseUp={(e) => {
                e.preventDefault();
              }}
              aria-hidden="true"
              type="button"
              className="text-2xl absolute mt-2 right-0 me-3"
              id="basic-addon1"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
            >
              <span className="sr-only">
                {isPasswordVisible ? "Hide Password" : "Show Password"}
              </span>
              {isPasswordVisible ? (
                <FaEyeSlash className=" text-primaryDark dark:text-white" />
              ) : (
                <FaEye className=" text-primaryDark dark:text-white" />
              )}
            </button>
            {errors.password && (
              <p className="text-rose-500 text-sm  mt-1">
                {errors.password?.message}
              </p>
            )}
          </div>

          <div className="relative mb-5">
            <FaKey className=" absolute text-2xl left-4 mt-2  text-primaryDark dark:text-white" />

            <input
              type={isPasswordVisible ? "text" : "password"}
              className="invalid:border-rose-500 pl-11  text-sm f p-2 font-light w-full focus:bg-transparent  
         focus:border-2 rounded-lg border-2 border-primaryDark
          dark:border-white bg-transparent placeholder-black dark:placeholder-white
           text-primaryDark dark:text-white "
              placeholder="Type your confirm password"
              aria-label="confirmPassword"
              aria-describedby="basic-addon1"
              {...register("confirmPassword", {
                required: "ConfirmPassword is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onMouseUp={(e) => {
                e.preventDefault();
              }}
              className="text-2xl absolute mt-2 right-0 me-3"
              id="basic-addon1"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              aria-hidden="true"
            >
              <span className="sr-only">
                {isPasswordVisible ? "Hide Password" : "Show Password"}
              </span>
              {isPasswordVisible ? (
                <FaEyeSlash className="text-primaryDark dark:text-white" />
              ) : (
                <FaEye className="text-primaryDark dark:text-white" />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="text-rose-500 text-sm mb-3 mt-1">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>

          <AuthButton title="Reset" />
        </form>
      </section>
    </>
  );
}

import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import AuthButton from "../../../components/AuthButton";
import AuthLogo from "../../../components/AuthLogo";
import { Auth_URls } from "../../../constants/End-points";
import { PasswordValidation } from "../../../constants/Validation";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface ChangePasswordForm {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordForm>({ mode: "onChange" });
  const newPassword = watch("newPassword", "");

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      const { confirmPassword, ...apiData } = data;
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        Auth_URls.changePassword,
        { password: apiData.password, password_new: apiData.newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password changed successfully" || response.data.message);
      navigate("/dashboard/homepage");
    } catch (error: any) {
      toast.error("Password change failed" || error.response?.data?.message);
    }
  };

  return (
    <>
      <AuthLogo />

      <section>
        <div className="my-7 py-14">
          <p className="text-[#C5D86D] text-2xl font-bold">Change password</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          method="post"
          className="w-11/12 flex flex-col gap-8"
        >
          {/* Old Password */}
          <div className="relative mb-4">
            <FaKey className="absolute text-2xl left-4 mt-3 text-primaryDark dark:text-white" />
            <input
              type={isOldPasswordVisible ? "text" : "password"}
              placeholder="Type your old password"
              className="invalid:border-rose-500 pl-11 text-sm f p-3 font-light w-full focus:bg-transparent focus:border-2 rounded-lg border-2 border-primaryDark dark:border-white bg-transparent placeholder-black dark:placeholder-white text-primaryDark dark:text-white"
              {...register("password", PasswordValidation)}
            />
            <button
              type="button"
              onClick={() => setIsOldPasswordVisible((prev) => !prev)}
              className="text-2xl absolute mt-3 right-0 me-3"
            >
              {isOldPasswordVisible ? (
                <FaEyeSlash className="text-primaryDark dark:text-white" />
              ) : (
                <FaEye className="text-primaryDark dark:text-white" />
              )}
            </button>
            {errors.password && (
              <p className="text-rose-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="relative mb-4">
            <FaKey className="absolute text-2xl left-4 mt-3 text-primaryDark dark:text-white" />
            <input
              type={isNewPasswordVisible ? "text" : "password"}
              placeholder="Type your new password"
              className="invalid:border-rose-500 pl-11 text-sm f p-3 font-light w-full focus:bg-transparent focus:border-2 rounded-lg border-2 border-primaryDark dark:border-white bg-transparent placeholder-black dark:placeholder-white text-primaryDark dark:text-white"
              {...register("newPassword", PasswordValidation)}
            />
            <button
              type="button"
              onClick={() => setIsNewPasswordVisible((prev) => !prev)}
              className="text-2xl absolute mt-3 right-0 me-3"
            >
              {isNewPasswordVisible ? (
                <FaEyeSlash className="text-primaryDark dark:text-white" />
              ) : (
                <FaEye className="text-primaryDark dark:text-white" />
              )}
            </button>
            {errors.newPassword && (
              <p className="text-rose-500 text-sm mt-1">
                {errors.newPassword?.message}
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="relative mb-4">
            <FaKey className="absolute text-2xl left-4 mt-3 text-primaryDark dark:text-white" />
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="Confirm your new password"
              className="invalid:border-rose-500 pl-11 text-sm f p-3 font-light w-full focus:bg-transparent focus:border-2 rounded-lg border-2 border-primaryDark dark:border-white bg-transparent placeholder-black dark:placeholder-white text-primaryDark dark:text-white"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => setIsConfirmPasswordVisible((prev) => !prev)}
              className="text-2xl absolute mt-3 right-0 me-3"
            >
              {isConfirmPasswordVisible ? (
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

          <AuthButton title="Change" />
        </form>
      </section>
    </>
  );
};

export default ChangePassword;

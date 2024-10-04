import { useForm } from "react-hook-form";
import AuthLogo from "../../../components/AuthLogo";
import { MdEmail } from "react-icons/md";
import AuthButton from "../../../components/AuthButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Auth_URls } from "../../../constants/End-points";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: { email: string }) => {
    try {
      const response = await axios.post(Auth_URls.forgetPassword, data);
      toast.success(response.data.data || "Email Sent Successfully");
      navigate("/reset-password");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="login-register-container h-full flex flex-col justify-between">
      <AuthLogo />

      <div className="flex flex-col w-full h-full m-5">
        <p className="text-[25px] font-[700] leading-[34.5px] text-[#C5D86D]">
          Forget Password
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full m-5">
          <label className="text-[18px] font-[700] leading-[20px]">
            Email Address
          </label>
          <div className="relative w-full mt-2">
            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              {...register("email", { required: true })}
              className="w-full border-[3px] border-white rounded-md p-3 pl-8 text-black bg-transparent"
              type="email"
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && (
            <p className="text-[14px] text-[#FF453A]">Email is required</p>
          )}
        </div>
        <div className="flex flex-col w-full m-5"></div>

        <div className="btn">
          <AuthButton title="Send Email" type="submit" />
        </div>
      </form>

      <div className="back-home mt-20 text-right">
        <Link to="/login" className="text-[#C5D86D]">
          <span className="text-white">Login?</span> Click Here
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;

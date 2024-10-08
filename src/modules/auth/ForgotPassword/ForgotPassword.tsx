import { useForm } from "react-hook-form";
import AuthLogo from "../../../components/AuthLogo";
import { MdEmail } from "react-icons/md";
import AuthButton from "../../../components/AuthButton";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Auth_URls } from "../../../constants/End-points";
import { toast } from "react-toastify";
import { EmailValidation } from "../../../constants/Validation";

interface ResetForm {
  email: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>();

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
    <div className="h-full flex flex-col justify-between w-11/12  text-primaryDark dark:text-lightText">
      <AuthLogo />

      <div className="my-5 pt-10">
        <h1 className="text-[25px] font-[700] text-accent">Forget Password</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full my-5 pt-10">
          <label
            htmlFor="email"
            className="text-[18px] font-[700] leading-[20px] py-5 text-primaryDark dark:text-lightText"
          >
            Email Address
          </label>
          <div className="relative flex items-center xs:text-xs border-2 mb-2  border-borderColor rounded-md p-3  dark:border-primaryLight">
            <MdEmail className="absolute left-1 top-1/2 text-3xl  transform -translate-y-1/2 text-primaryDark dark:text-lightText" />
            <input
              {...register("email", EmailValidation)}
              className="pl-10 bg-transparent border-none outline-none text-primaryDark dark:text-lightText placeholder:text-primaryDark dark:placeholder:text-primaryLight w-full"
              type="email"
              placeholder="Enter your email address"
              id="email"
            />
          </div>
          {errors.email && (
            <p className="text-[14px] text-[#FF453A]">Email is required</p>
          )}
        </div>

        <div className="flex justify-between items-center py-10">
          <div className="btn">
            <AuthButton title="Send Email" />
          </div>
          <Link to="/auth" className="text-accent hover:underline">
            <span className="text-primaryDark dark:text-lightText">Login?</span>{" "}
            Click Here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;

import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import { useEffect } from "react";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAuthDataFromLocalStorage = () => {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");
      const storedProfile = localStorage.getItem("profile");

      if (storedAccessToken && storedRefreshToken && storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        dispatch(
          setAuth({
            accessToken: storedAccessToken,
            refreshToken: storedRefreshToken,
            profile: parsedProfile,
          })
        );
      }
    };

    getAuthDataFromLocalStorage();
  }, [dispatch]);

  return null;
}

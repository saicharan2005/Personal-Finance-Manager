import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axiosInstance from "../utils/axiosInstance";
import { API_ENDPOINTS} from "../utils/apiPaths";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(
          API_ENDPOINTS.AUTH.GET_USER_INFO
        );

        
        if (isMounted && response.data) {
          console.log("User info fetched successfully:", response.data);
          
          updateUser(response.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    // cleanup to avoid setting state on unmounted component
    return () => {
      isMounted = false;
    };
  }, [user,updateUser, clearUser, navigate]);
};

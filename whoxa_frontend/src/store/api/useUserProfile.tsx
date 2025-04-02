import { useQuery } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
// import { updateProductDescription } from "../Slices/ProductDescriptionSlice";

import { UserDataRes } from "../../types/UserDataType";
import { updateUserData } from "../Slices/UserSlice";

export const useUserProfile = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  return useQuery<UserDataRes, Error>(
    ["user-details"],
    async () => {
      const response = await axios.post<UserDataRes>(
        `${import.meta.env.VITE_API_URL}user-details`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Dispatch action to set paginated products in Redux store
      dispatch(updateUserData(response.data.resData));

      return response.data;
    },
    {
      // Set cache time to prevent re-fetching on route changes
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    },
  );
};

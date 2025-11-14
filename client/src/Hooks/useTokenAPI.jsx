/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { logout, setLoading } from "../redux/authSlice";
import { useAuthAPI } from "./useAuthAPI";
import useSingleEffect from "./Custom/useSingleEffect";

export default function useAuthInit() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { ValidateAdminTokenAPI } = useAuthAPI();
  useSingleEffect(() => {
    const verify = async () => {
      dispatch(setLoading(true));
      try {
        await ValidateAdminTokenAPI({ token: auth?.token });
      } catch (err) {
        // if /me 401, try to refresh automatically via interceptor on subsequent requests,
        // but here mark user logged out
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    };
    verify();
  }, [dispatch]);
}

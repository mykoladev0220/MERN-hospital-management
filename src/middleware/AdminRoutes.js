import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/loginSlice";

export default function AdminRoutes(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bearerToken = useSelector((state) => state.login.token);
  let decoded = jwtDecode(bearerToken);

  useEffect(() => {
    if (!decoded.role !== "admin" && decoded.exp * 1000 < Date.now()) {
      dispatch(logout());
      navigate("/login-admin");
    }
  }, [navigate, decoded.role, decoded.exp, dispatch]);

  return props.children;
}

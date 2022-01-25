import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/loginSlice";

export default function NurseRoutes(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const bearerToken = useSelector((state) => state.login.token);
  let decoded = jwtDecode(bearerToken);

  useEffect(() => {
    if (!decoded.role !== "nurse" && decoded.exp * 1000 < Date.now()) {
      alert("Your session has expired, please login again");
      dispatch(logout());
      navigate("/login-doctor");
    }
  }, [navigate, decoded.role, decoded.exp, dispatch]);

  return props.children;
}

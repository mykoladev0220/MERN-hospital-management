import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/loginSlice";
import Modal from "../components/Modal";

export default function AdminRoutes(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bearerToken = useSelector((state) => state.login.token);
  let decoded = jwtDecode(bearerToken);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  const notice = (
    <Modal open={isModalOpen}>
      <div>
        <h1>Your session has expired, please login again</h1>
      </div>
      <button className="btn-main btn-secondary" onClick={onClose}>
        Cancel
      </button>
    </Modal>
  );

  useEffect(() => {
    if (!decoded.role !== "admin" && decoded.exp * 1000 < Date.now()) {
      //   alert("Your session has expired, please login again");
      onOpenModal();
      // eslint-disable-next-line no-unused-expressions
      notice.props.open
      dispatch(logout());
      navigate("/login-admin");
    }
  }, [navigate, decoded.role, decoded.exp, dispatch]);

  // eslint-disable-next-line no-sequences
  return props.children;
}

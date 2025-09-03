import React, { useEffect } from "react";
import MainRoutes from "./routes/MainRoutes";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearToast } from "./features/auth/authSlice";
import { currentUser } from "./services/authServices";
const App = () => {
  const dispatch = useDispatch();
  const { message, success, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(currentUser());
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (success === true) {
      toast.success(message);
    } else if (success === false) {
      toast.error(message);
    }
    dispatch(clearToast());
  }, [message, success]);
  return <MainRoutes />;
};

export default App;

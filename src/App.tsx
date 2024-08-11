import { RouterProvider, createBrowserRouter } from "react-router-dom";
import route from "./router";
import { authCheckAsync } from "./store/asyncThunk/loginAsync";
import { useAppDispatch } from "./store";
import { useEffect } from "react";

export default function App() {
  const dispatch = useAppDispatch();

  const checkingAuth = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(authCheckAsync(token));
    }
  };

  useEffect(() => {
    checkingAuth();
  }, []);

  return <RouterProvider router={createBrowserRouter(route)} />;
}
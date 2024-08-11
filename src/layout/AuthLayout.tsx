import { Box } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { COLOR } from "../utils/constant/color";
import { useAppSelector } from "../store";

export default function AuthLayout() {
    const token = localStorage.getItem('token');
    const isLogin = useAppSelector((state) => state.login.isLogin);

    if (token && isLogin) {
        return <Navigate to={"/"} />;
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: COLOR.BG_COLOR
            }}
        >
            <Outlet />
        </Box>
    );
}
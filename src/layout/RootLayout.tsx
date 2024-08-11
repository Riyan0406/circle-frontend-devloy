/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from "@mui/material";
import Sidebar from "../components/sidebar";
import { COLOR } from "../utils/constant/color";
import { Outlet } from "react-router-dom";
import Profile from "../components/profileBar/atom/profile";
import Suggest from "../components/profileBar/atom/suggest";
import Watermark from "../components/profileBar/atom/watermark";
import { useAppDispatch, useAppSelector } from "../store";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { getProfileAsync } from "../store/asyncThunk/profileAsync";
import { getSuggestAsync } from "../store/asyncThunk/suggestAsync";

export default function RootLayout() {
    const { suggest } = useAppSelector((state) => state.suggest);

    const dispatch = useAppDispatch();

    const token = localStorage.getItem('token');
    const isLogin = useAppSelector((state) => state.login.isLogin);

    if (!token && !isLogin) {
        return <Navigate to={"/auth/login"} />;
    }

    useEffect(() => {
        dispatch(getProfileAsync());
        dispatch(getSuggestAsync());
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                height: "100vh",
                bgcolor: COLOR.BG_COLOR,
                color: "#FFFFFF"
            }}
        >
            <Box
                flex={.5}
                p={4}
            >
                <Sidebar />
            </Box>

            <Box
                flex={3}
                sx={{
                    borderLeft: "2px solid",
                    borderRight: "2px solid",
                    borderColor: COLOR.BORDER_COLOR,
                    overflowY: "auto"
                }}
            >
                <Outlet />
            </Box>

            <Box
                flex={1.5}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    padding: 3,
                    overflow: "auto"
                }}
            >
                <Profile />

                <Box
                    sx={{
                        padding: 2,
                        borderRadius: "10px",
                        bgcolor: "#262626"
                    }}
                >
                    <Typography
                        sx={{
                            mb: 2
                        }}
                    >
                        Suggested for you
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px"
                        }}
                    >
                        {suggest.map((data) => (
                            <Suggest suggest={data} />
                        ))}
                    </Box>
                </Box>

                <Watermark />
            </Box>
        </Box>
    );
}
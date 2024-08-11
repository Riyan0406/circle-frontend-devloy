import {
    Home,
    HomeOutlined,
    PersonSearch,
    PersonSearchOutlined,
    AccountCircle,
    AccountCircleOutlined,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const MENU = [
    {
        name: "Home",
        path: "/",
        icon: {
            active: <Home fontSize="large" />,
            nonActive: <HomeOutlined fontSize="large" />,
        },
    },
    {
        name: "Search",
        path: "/search",
        icon: {
            active: <PersonSearch fontSize="large" />,
            nonActive: <PersonSearchOutlined fontSize="large" />,
        },
    },
    {
        name: "Profile",
        path: "/profile",
        icon: {
            active: <AccountCircle fontSize="large" />,
            nonActive: <AccountCircleOutlined fontSize="large" />,
        },
    },
];

export default function MenuItems() {
    return (
        <Box display={"flex"} flexDirection={"column"} gap={2}>
            {MENU.map((data) => (
                <NavLink to={data.path} style={{ textDecoration: "none" }}>
                    {({ isActive }) => (
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.7)"
                            }}
                        >
                            {isActive ? data.icon.active : data.icon.nonActive}
                            <Typography fontSize={24}>{data.name}</Typography>
                        </Box>
                    )}
                </NavLink>
            ))}
        </Box>
    );
}
import { RouteObject } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/home";
import SearchPage from "../pages/search";
import ProfilePage from "../pages/profile";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";
import DetailThread from "../components/thread/detailThread";

const route: RouteObject[] = [
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "status",
                element: <DetailThread />
            },
            {
                path: "search",
                element: <SearchPage />
            },
            {
                path: "profile",
                element: <ProfilePage />
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            },
        ]
    }
];

export default route;
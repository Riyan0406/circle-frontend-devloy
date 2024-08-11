/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography } from "@mui/material";
import { COLOR } from "../../../utils/constant/color";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect, useState } from "react";
import { getProfileAsync } from "../../../store/asyncThunk/profileAsync";
import EditProfileModal from "./editProfileModal";

export default function Profile() {
    const data = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(getProfileAsync());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const [open, setOpen] = useState(false);
    const [display, setDisplay] = useState("block");

    const handleClose = () => {
        setOpen(false);
        setDisplay("block");
    };

    useEffect(() => {
        if (window.location.pathname === '/profile') {
            setDisplay('none');
        } else {
            setDisplay('block');
        }
    }, [window.location.pathname]);

    return (
        <>
            {/* edit profile modal */}
            <EditProfileModal open={open} onClose={handleClose} />

            <Box
                sx={{
                    display: { display },
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
                    My Profile
                </Typography>

                <Box
                    sx={{
                        position: "relative"
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            height: "6rem",
                            borderRadius: "10px",
                            overflow: "hidden"
                        }}
                    >
                        <img
                            src={data.profile?.profile.cover}
                            alt="profile"
                            width={"100%"}
                        />
                    </Box>

                    <Box
                        sx={{
                            width: "80px",
                            height: "80px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "absolute",
                            top: 56,
                            left: 24,
                            border: "3px solid #262626",
                            borderRadius: "50px",
                            bgcolor: "white",
                            overflow: "hidden"
                        }}
                    >
                        <img
                            src={data.profile?.profile.avatar}
                            alt=""
                            width={"100rem"}
                            style={{ objectFit: "cover" }}
                        />
                    </Box>
                </Box>

                <Typography
                    variant="h5"
                    sx={{
                        mt: 8
                    }}
                >
                    {data.profile?.fullname}
                </Typography>

                <Typography
                    sx={{
                        color: COLOR.TEXT_COLOR
                    }}
                >
                    @{data.profile?.profile.username}
                </Typography>

                <Typography
                    sx={{
                        fontSize: "14px",
                        mt: 2
                    }}
                >
                    {data.profile?.profile.bio}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        mt: 2
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: "4px"
                        }}
                    >
                        <Typography
                            sx={{
                                color: "white"
                            }}
                        >
                            {data.profile?._count.followedBy}
                        </Typography>
                        <Typography
                            sx={{
                                color: COLOR.TEXT_COLOR
                            }}
                        >
                            Followings
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: "4px"
                        }}
                    >
                        <Typography
                            sx={{
                                color: "white"
                            }}
                        >
                            {data.profile?._count.following}
                        </Typography>
                        <Typography
                            sx={{
                                color: COLOR.TEXT_COLOR
                            }}
                        >
                            Followers
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
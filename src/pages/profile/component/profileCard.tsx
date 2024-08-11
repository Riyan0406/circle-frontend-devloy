import { Box, Button, Typography } from "@mui/material";
import { COLOR } from "../../../utils/constant/color";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useEffect, useState } from "react";
import { getProfileAsync } from "../../../store/asyncThunk/profileAsync";
import { Link } from "react-router-dom";
import { KeyboardBackspaceRounded } from "@mui/icons-material";
import EditProfileModal from "../../../components/profileBar/atom/editProfileModal";

export default function ProfileCard() {
    const dispatch = useAppDispatch();
    const data = useAppSelector((state) => state.user);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(getProfileAsync());
    }, []);

    return (
        <>
            <EditProfileModal open={open} onClose={handleClose} />

            <Box
                sx={{
                    padding: 2,
                    paddingBottom: 0
                }}
            >
                <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 2
                        }}
                    >
                        <KeyboardBackspaceRounded fontSize="large" />
                        <Typography
                            sx={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold'
                            }}
                        >
                            {data.profile?.fullname}
                        </Typography>
                    </Box>
                </Link>

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
                            alt=""
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

                    <Box
                        sx={{
                            position: "absolute",
                            bottom: -45,
                            right: 0
                        }}
                    >
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={handleOpen}
                            sx={{
                                borderColor: "white",
                                color: "white",
                                borderRadius: "50px",
                                ":hover": {
                                    borderColor: COLOR.CIRCLE_COLOR
                                }
                            }}
                        >
                            Edit Profile
                        </Button>
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
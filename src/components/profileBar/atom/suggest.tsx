import { Box, Button, Typography } from "@mui/material";
import { COLOR } from "../../../utils/constant/color";
import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getProfileAsync } from "../../../store/asyncThunk/profileAsync";
import Axios from "axios";

interface suggestProps {
    suggest: IUser;
}

const Suggest: FC<suggestProps> = ({ suggest }) => {
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector((state) => state.user);

    const [status, setStatus] = useState<string>('Follow');

    const handleFollow = async (followingId: string) => {
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: 'Post',
            url: 'https://circle-backend-three.vercel.app/follow',
            params: {
                followingId: followingId
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.data);

        // Toggle status follow/unfollow setelah mengikuti atau berhenti mengikuti
        if (status === 'Follow') {
            setStatus('Unfollow');
        } else {
            setStatus('Follow');
        }
    };

    // Periksa apakah sudah follow saat komponen di-render
    useEffect(() => {
        if (profile?.followedBy?.length) {
            const isFollowing = profile.followedBy.some((data) => data.followingId === suggest.id);
            setStatus(isFollowing ? 'Unfollow' : 'Follow');
        }
    }, [profile, suggest]);

    useEffect(() => {
        dispatch(getProfileAsync());
    }, [dispatch]);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    gap: 1
                }}
            >
                <Box
                    sx={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50px",
                        overflow: "hidden"
                    }}
                >
                    <img
                        src={suggest.profile.avatar}
                        alt=""
                        width={"100%"}
                    />
                </Box>

                <Box>
                    <Typography>
                        {suggest.fullname}
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "14px",
                            color: COLOR.TEXT_COLOR
                        }}
                    >
                        @{suggest.profile.username}
                    </Typography>
                </Box>
            </Box>

            <Button
                variant="outlined"
                size="small"
                sx={{
                    borderColor: "white",
                    color: "white",
                    borderRadius: "50px",
                    ":hover": {
                        borderColor: COLOR.CIRCLE_COLOR
                    }
                }}
                onClick={() => handleFollow(suggest.id)}
            >
                {status}
            </Button>
        </Box>
    );
};

export default Suggest;

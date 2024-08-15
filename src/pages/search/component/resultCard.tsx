import { Avatar, Box, Button, Typography } from "@mui/material";
import { COLOR } from "../../../utils/constant/color";
import { FC, useEffect, useState } from "react";
import Axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getProfileAsync } from "../../../store/asyncThunk/profileAsync";

interface IProps {
    user: IUser[] | null;
}

const ResultCard: FC<IProps> = ({ user }) => {
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector((state) => state.user);

    // Gunakan state untuk status masing-masing pengguna
    const [statuses, setStatuses] = useState<{ [key: string]: string; }>({});

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

        // Toggle status follow/unfollow untuk pengguna yang diklik
        setStatuses((prevStatuses) => ({
            ...prevStatuses,
            [followingId]: prevStatuses[followingId] === 'Follow' ? 'Unfollow' : 'Follow'
        }));
    };

    // Periksa apakah sudah follow saat komponen di-render
    useEffect(() => {
        if (profile?.followedBy?.length && user?.length) {
            const newStatuses: { [key: string]: string; } = {};
            user.forEach((data) => {
                const isFollowing = profile.followedBy.some((follower) => follower.followingId === data.id);
                newStatuses[data.id] = isFollowing ? 'Unfollow' : 'Follow';
            });
            setStatuses(newStatuses);
        }
    }, [profile, user]);

    useEffect(() => {
        dispatch(getProfileAsync());
    }, [dispatch]);

    return (
        <>
            {user?.length === 0 && (
                <Typography sx={{ textAlign: 'center' }}>Type for search</Typography>
            )}

            {user?.length !== 0 && user !== null && (
                user.map((data) => (
                    <Box
                        key={data.id}
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
                            <Avatar
                                src={data.profile.avatar}
                                alt="pp"
                                sx={{
                                    width: 48,
                                    height: 48
                                }}
                            />

                            <Box>
                                <Typography>
                                    {data.fullname}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        color: COLOR.TEXT_COLOR
                                    }}
                                >
                                    @{data.profile.username}
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
                            onClick={() => handleFollow(data.id)}
                        >
                            {statuses[data.id] || 'Follow'}
                        </Button>
                    </Box>
                ))
            )}
        </>
    );
};

export default ResultCard;

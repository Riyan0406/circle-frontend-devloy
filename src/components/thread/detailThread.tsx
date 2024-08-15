import { KeyboardBackspaceRounded } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { COLOR } from "../../utils/constant/color";
import ThreadForm from "./threadForm";
import LikeRepliesButton from "./likeRepliesButton";
import ImageComponent from "./imageComponent";
import Axios from "axios";
import { useEffect, useState } from "react";
import ThreadCard from "./threadsCard";

const DetailThread = () => {
    const location = useLocation();
    const data = location.state;

    const [replies, setReplies] = useState<IThread[]>();

    const getReplies = async () => {
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: 'Get',
            url: `https://circle-backend-three.vercel.app/threads/replies/${data.thread.id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setReplies(response.data);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            getReplies();
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            {/* back */}
            <Link to={'/'} style={{ color: 'white', textDecoration: 'none' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        pb: 0
                    }}
                >
                    <KeyboardBackspaceRounded fontSize="large" />

                    <Typography
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold'
                        }}
                    >
                        Status
                    </Typography>
                </Box>
            </Link>

            {/* status */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 2
                }}
            >
                {/* profile */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    }}
                >
                    <Avatar
                        src={data.thread.author.profile.avatar || ""}
                        alt={data.thread.author.fullname}
                    />

                    <Box>
                        <Typography>{data.thread.author.fullname}</Typography>
                        <Typography sx={{ color: '#909090' }}>@{data.thread.author.profile.username}</Typography>
                    </Box>
                </Box>

                {/* content */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1
                    }}
                >
                    <Typography>{data.thread.content}</Typography>

                    <ImageComponent image={data.thread.image} />

                    <LikeRepliesButton thread={data.thread} />
                </Box>
            </Box>

            {/* replies form */}
            <Box
                sx={{
                    borderTop: '2px solid',
                    borderBottom: '2px solid',
                    borderColor: COLOR.BORDER_COLOR
                }}
            >
                <ThreadForm placeholder="Type your reply!" threadId={data.thread.id} />
            </Box>

            {/* replies */}
            <Box>
                {replies?.map((data) => (
                    <ThreadCard threads={data} />
                ))}
            </Box>
        </>
    );
};

export default DetailThread;

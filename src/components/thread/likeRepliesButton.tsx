import { FavoriteRounded, FavoriteBorderRounded, ChatOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { COLOR } from "../../utils/constant/color";
import { API } from "../../lib/api";
import { FC, useEffect, useState } from "react";

interface IProps {
    thread: IThread;
}

const LikeRepliesButton: FC<IProps> = ({ thread }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const checkLike = async () => {
        try {
            const { data } = await API.get(
                `/like/check/${thread.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setLiked(data.thisLike !== null);
            setLikeCount(data.totalLike);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLike = async () => {
        try {
            const res = await API.post(
                `like/${thread.id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log(res);
            await checkLike();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkLike();
    }, [liked, likeCount]);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
            }}
        >
            <Button
                onClick={handleLike}
                sx={{
                    color: "white"
                }}
            >
                <Box display={"flex"} gap={1}>
                    {liked ? <FavoriteRounded sx={{ color: 'red' }} /> : <FavoriteBorderRounded />}
                    <Typography sx={{ color: COLOR.TEXT_COLOR }}>{likeCount}</Typography>
                </Box>
            </Button>

            <Link to={'/status'} style={{ textDecoration: 'none' }} state={{ thread }}>
                <Box display={"flex"} gap={1}>
                    <ChatOutlined sx={{ fill: '#909090' }} />
                    <Typography sx={{ color: COLOR.TEXT_COLOR }}>{thread._count.replies}</Typography>
                </Box>
            </Link>
        </Box>
    );
};

export default LikeRepliesButton;

/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Box, Typography } from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";
import ImageComponent from "./imageComponent";
import { COLOR } from "../../utils/constant/color";
import { API } from "../../lib/api";
import { useEffect, useState } from "react";
import LikeRepliesButton from "./likeRepliesButton";

interface IThreadCardProps {
    threads: IThread;
}

const ThreadCard: React.FC<IThreadCardProps> = ({ threads }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const checkLike = async () => {
        try {
            const { data } = await API.get(
                `/like/check/${threads.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setLiked(data.thisLike === null ? false : true);
            setLikeCount(data.totalLike);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkLike();
    }, [liked, likeCount]);

    const [year, setYear] = useState<number>(0);
    const [month, setMonth] = useState<number>(0);
    const [week, setWeek] = useState<number>(0);
    const [day, setDay] = useState<number>(0);
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [second, setSecond] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentDate = new Date();
            const createdDate = new Date(threads.createdAt);

            const diffInMilliseconds = currentDate.getTime() - createdDate.getTime();

            // detik
            const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);
            setSecond(seconds);

            // menit
            const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
            setMinute(minutes);

            // jam
            const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            setHour(hours);

            // hari
            const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
            setDay(days);

            // minggu
            const weeks = Math.round(days / 7);
            setWeek(weeks);

            // bulan
            const months = Math.round(weeks / 4);
            setMonth(months);

            // tahun
            const years = Math.round(months / 12);
            setYear(years);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [threads.createdAt]);

    const displayTime =
        year !== 0 ? `${year} years`
            : month !== 0 ? `${month} months`
                : week !== 0 ? `${week} weeks`
                    : day !== 0 ? `${day} days`
                        : hour !== 0 ? `${hour} hours`
                            : minute !== 0 ? `${minute} minutes`
                                : second !== 0 ? `${second} seconds`
                                    : "0 second";

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                borderBottom: "2px solid",
                borderColor: COLOR.BORDER_COLOR,
                p: 2
            }}
        >
            <Box
                sx={{
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#FFFFFF",
                    borderRadius: "50px",
                    overflow: "hidden"
                }}
            >
                <Avatar
                    src={threads.author.profile.avatar}
                    alt={threads.author.fullname}
                    sx={{
                        width: '65px',
                        height: '65px'
                    }}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: 1
                    }}
                >
                    <Typography>{threads.author.fullname}</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            color: COLOR.TEXT_COLOR
                        }}
                    >
                        <Typography>@{threads.author.profile.username}</Typography>
                        <FiberManualRecord sx={{ width: "6px", color: COLOR.TEXT_COLOR }} />
                        <Typography>
                            {displayTime} ago
                        </Typography>
                    </Box>
                </Box>

                <Typography>{threads.content}</Typography>

                {/* image comp */}
                <ImageComponent image={threads.image} />

                {/* like replies comp */}
                <LikeRepliesButton thread={threads} />
            </Box>

        </Box>
    );
};

export default ThreadCard;
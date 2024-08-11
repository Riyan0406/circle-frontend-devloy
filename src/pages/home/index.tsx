import ThreadCard from "../../components/thread/threadsCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { getThreadsAsync } from "../../store/asyncThunk/threadAsync";
import { Box, Typography } from "@mui/material";
import ThreadForm from "../../components/thread/threadForm";
import { COLOR } from "../../utils/constant/color";

export default function HomePage() {
    const { threads } = useAppSelector((state) => state.thread);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getThreadsAsync());
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(getThreadsAsync());
        }, 1000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    return (
        <Box>
            <Box
                sx={{
                    p: 2
                }}
            >
                <Typography
                    sx={{
                        fontSize: "1.5rem",
                        fontWeight: "bold"
                    }}
                >
                    Home
                </Typography>
            </Box>

            <Box
                sx={{
                    borderBottom: '2px solid',
                    borderColor: COLOR.BORDER_COLOR
                }}
            >
                <ThreadForm placeholder="What is happening?!" threadId='' />
            </Box>

            {threads.map((thread) => (
                <ThreadCard key={thread.id} threads={thread} />
            ))}
        </Box>
    );
}

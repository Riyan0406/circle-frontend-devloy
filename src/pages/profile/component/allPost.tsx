import { useEffect } from "react";
import ThreadCard from "../../../components/thread/threadsCard";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getProfileAsync } from "../../../store/asyncThunk/profileAsync";

const AllPost = () => {
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector((state) => state.user);

    useEffect(() => {
        
        dispatch(getProfileAsync());
    }, []);

    return (
        <>
            {profile?.threads.map((thread) => (
                <ThreadCard key={thread.id} threads={thread} />
            ))}
        </>
    );
};

export default AllPost;
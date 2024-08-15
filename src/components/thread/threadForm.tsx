import { Avatar, Button, TextField, Box, IconButton } from '@mui/material';
import { AddPhotoAlternateOutlined } from '@mui/icons-material';
import { COLOR } from '../../utils/constant/color';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import ThreadModal from './threadModal';
import { useAppDispatch, useAppSelector } from '../../store';
import { getProfileAsync } from '../../store/asyncThunk/profileAsync';
import Axios from 'axios';

interface IProps {
    placeholder: string;
    threadId: string;
}

const ThreadForm: FC<IProps> = ({ placeholder, threadId }) => {
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector((state) => state.user);

    const [open, setOpen] = useState<boolean>(false);
    const [content, setContent] = useState<string>('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePost = async () => {
        const token = localStorage.getItem('token');
        await Axios({
            method: 'Post',
            url: 'https://circle-backend-three.vercel.app/threads/createThread',
            data: {
                content: content
            },
            params: {
                userId: profile?.id,
                threadId: threadId
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setContent('');
        handleClose();
    };

    useEffect(() => {
        dispatch(getProfileAsync());
    }, []);

    return (
        <>
            <ThreadModal open={open} onClose={handleClose} sValue={content} placeholder={placeholder} threadId={threadId} />

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 2
                }}
            >
                <Avatar
                    alt="User Avatar"
                    src={profile?.profile.avatar}
                />

                <TextField
                    name='thread'
                    variant="outlined"
                    placeholder={placeholder}
                    fullWidth
                    value={content}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value)}
                    InputProps={{
                        style: { color: 'white' },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 50,
                            '& fieldset': {
                                border: 'none',
                            },
                            '&:hover fieldset': {
                                border: '1px solid',
                                borderColor: 'limegreen',
                            },
                            '&.Mui-focused fieldset': {
                                border: '2px solid',
                                borderColor: COLOR.CIRCLE_COLOR,
                            },
                        },
                    }}
                />

                <IconButton
                    onClick={handleOpen}
                >
                    <AddPhotoAlternateOutlined fontSize='large' sx={{ fill: COLOR.CIRCLE_COLOR }} />
                </IconButton>

                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        bgcolor: COLOR.CIRCLE_COLOR,
                        borderRadius: 50
                    }}
                    onClick={handlePost}
                    disabled={content === '' ? true : false}
                >
                    Post
                </Button>
            </Box>
        </>
    );
};

export default ThreadForm;

import { Modal, Box, Avatar, Button, IconButton, Typography } from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { AddPhotoAlternateOutlined, HighlightOffRounded } from '@mui/icons-material';
import { COLOR } from '../../utils/constant/color';
import { useAppDispatch, useAppSelector } from '../../store';
import { getProfileAsync } from '../../store/asyncThunk/profileAsync';
import Axios from 'axios';

interface IProps {
    open: boolean;
    onClose: () => void;
    sValue: string;
    placeholder: string;
    threadId: string;
}

const ThreadModal: FC<IProps> = ({ open, onClose, sValue, placeholder, threadId }) => {
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector((state) => state.user);
    const [inputValue, setInputValue] = useState<string>('');

    const [previewImage, setPreviewImage] = useState<string[]>([]);
    const [isEmpty, setIsEmpty] = useState(true);

    const [images, setImages] = useState<File[]>([]);

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            const newImages = Array.from(files);
            setImages(newImages);

            const newPreviewUrls = newImages.map(image => URL.createObjectURL(image));
            setPreviewImage(newPreviewUrls);
            setIsEmpty(newImages.length === 0);
        }
    };

    const handlePost = async () => {
        const token = localStorage.getItem('token');
        const formData = new FormData();

        formData.append('content', inputValue);
        images.forEach((image) => {
            formData.append('image', image);
        });

        await Axios({
            method: 'POST',
            url: 'https://circle-backend-three.vercel.app/threads/createThread/WImage',
            data: formData,
            params: {
                userId: profile?.id,
                threadId: threadId
            },
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        setInputValue('');
        setImages([]);
        onClose();
    };

    const handleDelete = (index: number) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
        setPreviewImage(prevPreviewImage => prevPreviewImage.filter((_, i) => i !== index));
    };

    useEffect(() => {
        setInputValue(sValue);
    }, [sValue]);

    useEffect(() => {
        dispatch(getProfileAsync());
    }, [dispatch]);

    useEffect(() => {
        if (images.length === 0 && previewImage.length === 0) {
            setIsEmpty(true);
        }
    }, [images, previewImage]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    width: '50%',
                    p: 2,
                    bgcolor: '#1D1D1D',
                    borderRadius: '8px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        mb: 2
                    }}
                >
                    <IconButton onClick={onClose} sx={{ color: 'white' }}>
                        <HighlightOffRounded />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'start',
                        gap: 2,
                        mb: 2
                    }}
                >
                    <Avatar
                        alt="User Avatar"
                        src={profile?.profile.avatar}
                    />

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <textarea
                            placeholder={placeholder}
                            value={inputValue}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
                            style={{
                                width: '100%',
                                height: 100,
                                maxHeight: 300,
                                padding: '4px',
                                color: 'white',
                                backgroundColor: 'transparent',
                                fontSize: '1rem',
                                borderRadius: '8px',
                                resize: 'none'
                            }}
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mt: 2,
                                mb: 2,
                                pb: 2,
                                borderBottom: '2px solid',
                                borderColor: COLOR.BORDER_COLOR
                            }}
                        >
                            <input
                                id='addImage'
                                type='file'
                                name='image'
                                onChange={handleImage}
                                multiple
                                hidden
                            />

                            <label htmlFor='addImage' style={{ cursor: 'pointer' }}>
                                <AddPhotoAlternateOutlined fontSize='large' sx={{ fill: COLOR.CIRCLE_COLOR }} />
                            </label>

                            <Button
                                variant="contained"
                                color="success"
                                sx={{
                                    bgcolor: COLOR.CIRCLE_COLOR,
                                    borderRadius: 50
                                }}
                                onClick={handlePost}
                                disabled={images.length === 0 || inputValue === '' ? true : false}
                            >
                                Post
                            </Button>
                        </Box>

                        <Box>
                            {isEmpty ? (
                                <Typography sx={{ color: 'white' }}>No File Added!</Typography>
                            )
                                :
                                (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                            flexWrap: 'wrap'
                                        }}
                                    >
                                        {previewImage.map((data, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    width: '6rem',
                                                    height: '6rem',
                                                    position: 'relative',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                <img
                                                    src={data}
                                                    alt={`contentImage${index}`}
                                                    width={'100%'}
                                                />

                                                <IconButton
                                                    sx={{
                                                        position: 'absolute',
                                                        top: -6,
                                                        right: -6
                                                    }}
                                                    onClick={() => handleDelete(index)}
                                                >
                                                    <HighlightOffRounded sx={{ color: 'lime' }} />
                                                </IconButton>
                                            </Box>
                                        ))}
                                    </Box>
                                )
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default ThreadModal;

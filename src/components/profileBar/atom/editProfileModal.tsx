import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, TextField, Button, Avatar, Typography, Modal, IconButton } from '@mui/material';
import { HighlightOffRounded } from '@mui/icons-material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useAppDispatch, useAppSelector } from '../../../store';
import { COLOR } from '../../../utils/constant/color';
import { getProfileAsync } from '../../../store/asyncThunk/profileAsync';
import Axios from 'axios';

interface EditProfileModalProps {
    open: boolean;
    onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ open, onClose }) => {
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector((state) => state.user);

    const [name, setName] = useState<string>(profile?.fullname || '');
    const [username, setUsername] = useState<string>(profile?.profile.username || '');
    const [bio, setBio] = useState<string>(profile?.profile.bio || '');

    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.profile.avatar || '');
    const [cover, setCover] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(profile?.profile.cover || '');

    const handleAttachment = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files) {
            if (e.target.name === 'avatar') {
                const selectedFile = files[0];
                setAvatar(selectedFile);
                setAvatarPreview(URL.createObjectURL(selectedFile));
            } else if (e.target.name === 'cover') {
                const selectedFile = files[0];
                setCover(selectedFile);
                setCoverPreview(URL.createObjectURL(selectedFile));
            }
        }
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem('token');

        // Update user information (name, username, bio)
        await Axios({
            method: 'Patch',
            url: `https://circle-backend-three.vercel.app/user/${profile?.id}`,
            data: {
                name: name,
                username: username,
                bio: bio
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Update avatar and cover if they exist
        if (avatar || cover) {
            const formData = new FormData();

            if (avatar) {
                formData.append('avatar', avatar);
            }

            if (cover) {
                formData.append('cover', cover);
            }

            await Axios({
                method: 'Patch',
                url: `https://circle-backend-three.vercel.app/user/attachment/${profile?.id}`,
                data: formData,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
        }

        // Refresh profile data
        dispatch(getProfileAsync());

        onClose();
    };

    useEffect(() => {
        dispatch(getProfileAsync());
    }, [dispatch]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    padding: 3,
                    bgcolor: "#1D1D1D",
                    color: "white",
                    borderRadius: 2,
                    boxShadow: 24,
                    width: 400,
                    mx: 'auto',
                    my: '20%',
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography variant="h6" component="div" id="modal-title">
                        Edit Profile
                    </Typography>
                    <IconButton
                        sx={{
                            p: 0
                        }}
                        onClick={onClose}
                    >
                        <HighlightOffRounded sx={{ fill: "#797979" }} />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        position: 'relative',
                        width: '100%',
                        mb: 5
                    }}
                >
                    <input
                        id='cover'
                        type='file'
                        name='cover'
                        onChange={handleAttachment}
                        hidden
                    />

                    <input
                        id='avatar'
                        type='file'
                        name='avatar'
                        onChange={handleAttachment}
                        hidden
                    />

                    <label htmlFor='cover' style={{ cursor: "pointer" }}>
                        <Box
                            sx={{
                                width: "100%",
                                height: "6rem",
                                borderRadius: "10px",
                                overflow: "hidden"
                            }}
                        >
                            <img
                                src={coverPreview || profile?.profile.cover}
                                alt="cover"
                                width={"100%"}
                            />
                        </Box>
                    </label>

                    <Avatar
                        src={avatarPreview || profile?.profile.avatar}
                        sx={{
                            position: 'absolute',
                            bottom: -40,
                            left: 16,
                            width: 80,
                            height: 80,
                            border: '3px solid #1D1D1D',
                        }}
                    />

                    <label htmlFor='avatar' style={{ cursor: "pointer" }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: 'absolute',
                                bottom: -40,
                                left: 62,
                                backgroundColor: 'gray',
                                width: 32,
                                height: 32,
                                borderRadius: "50px"
                            }}
                        >
                            <CameraAltIcon sx={{ fontSize: 16 }} />
                        </Box>
                    </label>
                </Box>

                {/* fullname */}
                <TextField
                    label="Name"
                    name="fullname"
                    color="success"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#545454',
                            },
                            '&:hover fieldset': {
                                borderColor: '#04A51E',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#04A51E',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#B2B2B2',
                        },
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                    }}
                />

                {/* username */}
                <TextField
                    label="Username"
                    name="username"
                    color="success"
                    value={username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#545454',
                            },
                            '&:hover fieldset': {
                                borderColor: '#04A51E',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#04A51E',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#B2B2B2',
                        },
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                    }}
                />

                {/* bio */}
                <TextField
                    label="Bio"
                    name="bio"
                    color="success"
                    value={bio}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setBio(e.target.value)}
                    fullWidth
                    margin="dense"
                    variant="outlined"
                    multiline
                    rows={2}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#545454',
                            },
                            '&:hover fieldset': {
                                borderColor: '#04A51E',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#04A51E',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: '#B2B2B2',
                        },
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                    }}
                />

                {/* button save */}
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "end"
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{
                            borderRadius: 50,
                            mt: 2,
                            bgcolor: COLOR.CIRCLE_COLOR,
                            '&:hover': {
                                bgcolor: "rgba(4, 165, 30, .6)"
                            },
                            textTransform: "capitalize",
                            px: 4
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditProfileModal;

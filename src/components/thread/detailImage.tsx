import { HighlightOffRounded } from '@mui/icons-material';
import { Box, IconButton, Modal } from '@mui/material';
import { FC } from 'react';
import { COLOR } from '../../utils/constant/color';

interface IProps {
    open: boolean;
    onClose: () => void;
    src: string;
}


const DetailImageModal: FC<IProps> = ({ open, onClose, src }) => {

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 36
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'white',
                    borderRadius: 2,
                    overflow: 'hidden'
                }}
            >
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0
                    }}
                >
                    <HighlightOffRounded fontSize='large' sx={{ fill: COLOR.CIRCLE_COLOR }} />
                </IconButton>

                <img
                    src={src}
                    alt='image'
                    width={'100%'}
                />
            </Box>
        </Modal>
    );
};

export default DetailImageModal;

import { Box } from "@mui/material";
import React, { useState } from "react";
import DetailImageModal from "./detailImage";

interface IProps {
    image?: IThreadImage[];
}

const ImageComponent: React.FC<IProps> = ({ image }) => {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState<string>('');

    const handleOpen = (data: string) => {
        setOpen(true);
        setUrl(data);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <DetailImageModal open={open} onClose={handleClose} src={url} />

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    gap: 2,
                    overflowX: 'auto'
                }}
            >
                {image?.map((item) => (
                    <>
                        <Box>
                            <img
                                src={item.url}
                                alt="thread_image"
                                key={item.id}
                                onClick={() => {
                                    if (item.url) {
                                        handleOpen(item.url);
                                    } else {
                                        console.error('URL is undefined');
                                    }
                                }}
                                style={{
                                    width: "100%",
                                    height: "10rem",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                    cursor: 'pointer'
                                }}
                            />
                        </Box>
                    </>
                ))}
            </Box>
        </>
    );
};

export default ImageComponent;

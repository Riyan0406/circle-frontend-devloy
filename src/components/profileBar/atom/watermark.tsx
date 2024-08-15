import { Box, Typography } from "@mui/material";
import { COLOR } from "../../../utils/constant/color";
import { FiberManualRecord, GitHub, Instagram, LinkedIn } from "@mui/icons-material";

export default function Watermark() {
    return (
        <Box
            sx={{
                padding: 2,
                borderRadius: "10px",
                bgcolor: "#262626"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}
            >
                <Typography>
                    Developed by Endang Triyana
                </Typography>
                <FiberManualRecord sx={{ width: "8px" }} />
                <a href="https://github.com/axelode" target="_blank">
                    <GitHub sx={{ color: 'white' }} />
                </a>
                <a href="https://www.linkedin.com/in/endang-triyana/" target="_blank">
                    <LinkedIn sx={{ color: 'white' }} />
                </a>
                <a href="https://www.instagram.com/endg_666" target="_blank">
                    <Instagram sx={{ color: 'white' }} />
                </a>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    color: COLOR.TEXT_COLOR,
                    gap: "2px"
                }}
            >
                <Typography
                    sx={{
                        fontSize: "12px"
                    }}
                >
                    Powered by
                </Typography>
                <a href="https://dumbways.id/" target="_blank">
                    <img
                        src="https://res.cloudinary.com/dbzdxsmvy/image/upload/v1716298002/uhc5aoqi6w5wlgvu542j.png"
                        alt="dw_logo"
                        width={"20px"}
                        height={"15px"}
                    />
                </a>
                <Typography
                    sx={{
                        fontSize: "12px"
                    }}
                >
                    Dumbways Indonesia
                </Typography>
                <FiberManualRecord sx={{ width: "8px" }} />
                <Typography
                    sx={{
                        fontSize: "12px"
                    }}
                >
                    #1 Coding Bootcamp
                </Typography>
            </Box>
        </Box>
    );
}

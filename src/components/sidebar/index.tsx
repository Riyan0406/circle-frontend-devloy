import { Box, Button, Typography } from "@mui/material";
import MenuItems from "./atom/MenuItems";
import { LogoutRounded } from '@mui/icons-material';

export default function Sidebar() {

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={600}
                    mb={3}
                    color={"#04A51E"}
                >
                    CIRCLE
                </Typography>

                <MenuItems />

                <Box
                    marginTop={"auto"}
                >
                    <Button
                        sx={{
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            gap: 1
                        }}
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}
                    >
                        <LogoutRounded
                            fontSize="large"
                            sx={{
                                rotate: "180deg"
                            }}
                        />
                        <Typography>Logout</Typography>
                    </Button>
                </Box>
            </Box>
        </>

    );
}
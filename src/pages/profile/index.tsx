/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@mui/material";
import ProfileCard from "./component/profileCard";
import { COLOR } from "../../utils/constant/color";
import AllPost from "./component/allPost";

export default function ProfilePage() {

    return (
        <Box>
            <Box
                sx={{
                    borderBottom: "2px solid",
                    borderColor: COLOR.BORDER_COLOR,
                    pb: 2
                }}
            >
                <ProfileCard />
            </Box>
            <AllPost />
        </Box>
    );
}

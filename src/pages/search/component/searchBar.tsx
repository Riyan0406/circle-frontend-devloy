import { PersonSearch } from "@mui/icons-material";
import { Box, Input } from "@mui/material";
import Axios from "axios";
import { ChangeEvent, FC, useEffect, useState } from "react";

interface searchProps {
    setResult: (data: IUser[]) => void;
}

const SearchBar: FC<searchProps> = ({ setResult }) => {
    const [condition, setCondition] = useState<string>('');

    const handleSearch = async () => {
        const token = localStorage.getItem('token');
        const response = await Axios({
            method: 'Post',
            url: 'https://circle-backend-three.vercel.app/user/friend/search',
            data: {
                condition: condition
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setResult(response.data);
    };

    useEffect(() => {
        handleSearch();
    }, [condition]);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    padding: 2,
                    bgcolor: "#383838",
                    width: "100%",
                    height: "50px",
                    borderRadius: "50px"
                }}
            >
                <PersonSearch fontSize="large" />
                <Input
                    type="text"
                    name="condition"
                    placeholder="Search your friend"
                    sx={{
                        width: "100%",
                        height: "100%",
                        color: "white",
                        '&&:before': {
                            borderBottom: 'none',
                        },
                        '&&:after': {
                            borderBottom: 'none',
                        },
                        '&&:hover:not(.Mui-disabled):before': {
                            borderBottom: 'none',
                        },
                    }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setCondition(e.target.value)}
                    value={condition}
                />
            </Box>
        </>
    );
};

export default SearchBar;
import { Box } from "@mui/material";
import SearchBar from "./component/searchBar";
import ResultCard from "./component/resultCard";
import { useState } from "react";

export default function SearchPage() {
    const [result, setResult] = useState<IUser[]>([])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                padding: 2
            }}
        >
            <SearchBar setResult={setResult} />
            <ResultCard user={result} />
        </Box>
    );
}

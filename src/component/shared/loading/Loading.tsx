import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
    return (
        <div style={{ position: "absolute", width: "100%" }}>
            <Box
                sx={{
                    position: "absolute",
                    zIndex: 2000,
                    width: "100%",
                    height: "75vh",
                    mt: { sm: 5, xs: 2 },
                    mb: { sm: 5, xs: 2 },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress color="secondary" size={90} />
            </Box>
        </div>
    );
}

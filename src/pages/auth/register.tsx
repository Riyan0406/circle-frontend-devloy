/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Controller } from "react-hook-form";
import useRegisterValidation from "../../validation/useRegisterValidation";
import { COLOR } from "../../utils/constant/color";
import { useRegisterFunction } from "./function/registerFunction";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from "../../store";
import { VisibilityOff, Visibility } from "@mui/icons-material";

const theme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        width: '300px',
                        '& fieldset': {
                            borderColor: '#545454', // Default border color
                        },
                        '&:hover fieldset': {
                            borderColor: 'white', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white', // Border color when focused
                        },
                        '& .MuiInputBase-input': {
                            color: 'white', // Text color
                            '&::placeholder': {
                                color: '#FFFFFF', // Placeholder color
                                opacity: 1,
                            },
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: '#3F3F3F', // Label color
                    },
                },
            },
        },
    },
});

export default function Register() {
    const registerState = useAppSelector((state) => state.register);
    const { control, reset, handleSubmit } = useRegisterValidation();
    const { onErrorSubmit, onSubmit } = useRegisterFunction({ reset });

    useEffect(() => {
        console.log(registerState);
    }, []);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    color: "#FFFFFF"
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        color: COLOR.CIRCLE_COLOR,
                        fontWeight: 700
                    }}
                >
                    Circle
                </Typography>

                <Typography
                    variant="h5"
                >
                    Create Circle Account
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        mt: 3
                    }}
                >
                    <Controller
                        control={control}
                        name="fullname"
                        render={({ field, fieldState }) => (
                            <TextField
                                label="Fullname *"
                                color="success"
                                inputProps={{
                                    color: "white"
                                }}
                                {...field}
                                helperText={fieldState.error?.message}
                                error={Boolean(fieldState.error)}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field, fieldState }) => (
                            <TextField
                                label="Email *"
                                color="success"
                                {...field}
                                helperText={fieldState.error?.message}
                                error={Boolean(fieldState.error)}
                            />
                        )}
                    />

                    <FormControl variant="outlined">
                        <InputLabel
                            htmlFor="outlined-adornment-password"
                            sx={{
                                color: "#545454",
                                '&.Mui-focused': {
                                    color: COLOR.CIRCLE_COLOR,
                                },
                            }}
                        >
                            Password *
                        </InputLabel>

                        <Controller
                            control={control}
                            name="password"
                            render={({ field, fieldState }) => (
                                <>
                                    <OutlinedInput
                                        {...field}
                                        error={Boolean(fieldState.error)}
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    sx={{
                                                        color: "white"
                                                    }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password *"
                                        sx={{
                                            color: "white",
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: fieldState.error ? 'red' : '#545454',
                                            },
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: fieldState.error ? 'red' : 'white',
                                            },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: fieldState.error ? 'red' : 'white',
                                            },
                                        }}
                                    />
                                    {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
                                </>
                            )}
                        />
                    </FormControl>

                    <Box
                        mt={3}
                        mb={3}
                    >
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={handleSubmit(onSubmit, onErrorSubmit)}
                            sx={{
                                width: "100%",
                                bgcolor: "#04A51E",
                                borderRadius: "50px",
                                ":hover": {
                                    bgcolor: "rgba(4, 165, 30, .7)"
                                }
                            }}
                        >
                            Register
                        </Button>
                    </Box>

                    <Typography>
                        Alredy have an account?{" "}
                        <Link
                            to={"/auth/login"}
                            style={{
                                textDecoration: "none",
                                color: COLOR.CIRCLE_COLOR
                            }}
                        >
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
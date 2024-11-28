import { Box, Button, TextField, Typography } from "@mui/material";
import { forwardRef, useState } from "react";
import { NewUser } from "../types";

interface LoginFormProps {
    onSubmit(values: NewUser): void;
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#272727',
    border: '1px solid #727272',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

const LoginForm = forwardRef(({ onSubmit }: LoginFormProps, ref) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const logIn = (e: React.SyntheticEvent) => {
        e.preventDefault();

        onSubmit({
            username: 'asd',
            password: 'asd'
        });
    }

    return (
        <Box sx={style} tabIndex={-1} ref={ref}>
            <form onSubmit={logIn} className="flex flex-col gap-4">
                <Typography id="modal-login-form title" variant="h6" component="h2" className="text-center">
                    Log In Form
                </Typography>
                <TextField 
                    required
                    id="txt-username"
                    label="Username"
                    value={username}
                    variant="outlined"
                    size="small"
                    onChange={({ target }) => setUsername(target.value)}
                />
                <TextField 
                    required
                    id="txt-password"
                    label="Password"
                    value={password}
                    variant="outlined"
                    size="small"
                    onChange={({ target }) => setPassword(target.value)}
                />
                <Button variant="contained" type="submit" sx={{ color: 'black' }}>
                    Log In
                </Button>
            </form>
        </Box>
    );
});

export default LoginForm;

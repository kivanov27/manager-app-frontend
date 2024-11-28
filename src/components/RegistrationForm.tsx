import { Box, Button, TextField, Typography } from "@mui/material";
import { forwardRef, useState } from "react";
import { NewUser } from "../types";

interface RegistrationFormProps {
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

const RegistrationForm = forwardRef(({ onSubmit }: RegistrationFormProps, ref) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const addUser = (e: React.SyntheticEvent) => {
        e.preventDefault();

        onSubmit({
            username: 'asd',
            password: 'asd'
        });
    }

    return (
        <Box sx={style} tabIndex={-1} ref={ref}>
            <form onSubmit={addUser} className="flex flex-col gap-4">
                <Typography id="modal-registration-form title" variant="h6" component="h2" className="text-center">
                    Registration Form
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
                    Submit
                </Button>
            </form>
        </Box>
    );
});

export default RegistrationForm;

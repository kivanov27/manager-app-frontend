import { forwardRef, useState } from "react";
import { NewExercise } from "../types";
import { Box, Button, TextField, Typography } from "@mui/material";

interface ExerciseFormProps {
    onSubmit(values: NewExercise): void;
}

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

const ExerciseForm = forwardRef(({ onSubmit }: ExerciseFormProps, ref) => {
    const [name, setName] = useState<string>();
    const [reps, setReps] = useState<string>();
    const [sets, setSets] = useState<string>();
    const [duration, setDuration] = useState<string>();
    const [weight, setWeight] = useState<string>();
    
    const addExercise = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (name) {
            onSubmit({
                name: name,
                reps: reps ?? undefined,
                sets: sets ?? undefined,
                duration: duration ?? undefined,
                weight: weight ?? undefined,
            });
        }
        else {
            throw new Error('Exercise name missing');
        }
    };
    
    return (
        <Box sx={style} tabIndex={-1} ref={ref}>
            <form onSubmit={addExercise} className="flex flex-col gap-4">
                <Typography id="modal-exercise-form-title" variant="h6" component="h2" className="text-center">Exercise Form</Typography>
                <TextField required id="txt-name" label="Name" variant="outlined" size="small" onChange={({ target }) => setName(target.value)} />
                <TextField id="txt-reps" label="Reps" variant="outlined" size="small" onChange={({ target }) => setReps(target.value)} />
                <TextField id="txt-sets" label="Sets" variant="outlined" size="small" onChange={({ target }) => setSets(target.value)} />
                <TextField id="txt-duration" label="Duration" variant="outlined" size="small" onChange={({ target }) => setDuration(target.value)} />
                <TextField id="txt-weight" label="Weight" variant="outlined" onChange={({ target }) => setWeight(target.value)} />
                <Button variant="contained" type="submit" sx={{ color: "black" }}>submit</Button>
            </form>
        </Box>
    );
});

ExerciseForm.displayName = 'ExerciseForm';
export default ExerciseForm;

import { forwardRef, useState } from "react";
import { NewExercise } from "../types";
import { Box, Typography } from "@mui/material";

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
        onSubmit({ name, reps, sets, duration, weight });
    };
    
    return (
        <Box sx={style} tabIndex={-1} ref={ref}>
            <form onSubmit={addExercise} className="flex flex-col gap-4">
                <Typography id="modal-exercise-form-title" variant="h6" component="h2">Exercise Form</Typography>
            </form>
        </Box>
    );
});

export default ExerciseForm;

import { forwardRef, useState } from "react";
import { Exercise, NewExercise } from "../types";
import { Box, Button, TextField, Typography } from "@mui/material";

interface ExerciseFormProps {
    onSubmit(values: NewExercise): void;
    exerciseToEdit?: Exercise | null;
    isEditMode?: boolean;
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

const ExerciseForm = forwardRef(({ onSubmit, exerciseToEdit, isEditMode = false }: ExerciseFormProps, ref) => {
    const [name, setName] = useState<string>(exerciseToEdit ? exerciseToEdit.name : '');
    const [reps, setReps] = useState<string | undefined>(exerciseToEdit ? exerciseToEdit.reps : '');
    const [sets, setSets] = useState<string | undefined>(exerciseToEdit ? exerciseToEdit.sets : '');
    const [duration, setDuration] = useState<string | undefined>(exerciseToEdit ? exerciseToEdit.duration : '');
    const [weight, setWeight] = useState<string | undefined>(exerciseToEdit ? exerciseToEdit.weight : '');
    
    const addExercise = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onSubmit({
            name: name,
            reps: reps,
            sets: sets,
            duration: duration,
            weight: weight
        });
    };
    
    return (
        <Box sx={style} tabIndex={-1} ref={ref}>
            <form onSubmit={addExercise} className="flex flex-col gap-4">
                <Typography id="modal-exercise-form-title" variant="h6" component="h2" className="text-center">
                    {isEditMode ? "Edit Exercise" : "Create Exercise"}
                </Typography>
                <TextField required id="txt-name" label="Name" value={name} variant="outlined" size="small" onChange={({ target }) => setName(target.value)} />
                <TextField id="txt-sets" label="Sets" value={sets} variant="outlined" size="small" onChange={({ target }) => setSets(target.value)} />
                <TextField id="txt-reps" label="Reps" value={reps} variant="outlined" size="small" onChange={({ target }) => setReps(target.value)} />
                <TextField id="txt-duration" label="Duration" value={duration} variant="outlined" size="small" onChange={({ target }) => setDuration(target.value)} />
                <TextField id="txt-weight" label="Weight" value={weight} variant="outlined" onChange={({ target }) => setWeight(target.value)} />
                <Button variant="contained" type="submit" sx={{ color: "black" }}>
                    {isEditMode ? "Save Changes" : "Submit"}
                </Button>
            </form>
        </Box>
    );
});

ExerciseForm.displayName = 'ExerciseForm';
export default ExerciseForm;

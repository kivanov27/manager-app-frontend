import { forwardRef, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Days, NewWorkout, Workout } from "../types";

interface WorkoutFormProps {
    onSubmit(values: NewWorkout): void;
    workoutToEdit?: Workout | null;
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

const WorkoutForm = forwardRef(({ onSubmit, workoutToEdit, isEditMode = false }: WorkoutFormProps, ref) => {
    const [title, setTitle] = useState<string>(workoutToEdit ? workoutToEdit.title : '');
    const [day, setDay] = useState<Days>(workoutToEdit ? workoutToEdit.day : Days.Monday);

    const handleDayChange = (value: string) => {
        if (Object.values(Days).includes(value as Days)) {
            setDay(value as Days);
        }
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onSubmit({ title, day, exercises: workoutToEdit?.exercises || [] });
    };

    return (
        <Box sx={style} tabIndex={-1} ref={ref}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Typography id="modal-workout-form-title" variant="h6" component="h2" className="text-center">
                    {isEditMode ? "Edit Workout" : "Create Workout"}
                </Typography>
                <TextField required id="txt-title" label="Title" variant="outlined" onChange={({ target }) => setTitle(target.value)} />
                <FormControl fullWidth>
                    <InputLabel id="select-day-label">Day</InputLabel>
                    <Select 
                        labelId="select-day-label" 
                        id="select-day" 
                        value={day} 
                        label="Day" 
                        sx={{ color: 'white' }} 
                        onChange={({ target }) => handleDayChange(target.value)}
                    >
                        {Object.values(Days).map(day => (
                            <MenuItem key={day} value={day}>{day}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" type="submit" sx={{ color: 'black' }}>
                    {isEditMode ? "Save Changes" : "Submit"}
                </Button>
            </form>
        </Box>
    );
});

WorkoutForm.displayName = 'WorkoutForm';

export default WorkoutForm;

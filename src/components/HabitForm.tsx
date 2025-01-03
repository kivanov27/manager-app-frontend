import { Box, Button, TextField, Typography } from "@mui/material";
import { HabitDay, NewHabit } from "../types";
import { forwardRef, useState } from "react";

interface HabitFormProps {
    onSubmit(values: NewHabit): void;
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

const HabitForm = forwardRef(({ onSubmit }: HabitFormProps, ref) => {
    const [name, setName] = useState<string>('');

    const addHabit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const days: HabitDay[] = generateDays();

        onSubmit({
            name,
            days
        });
    };

    const generateDays = (): HabitDay[] => {
        const today: Date = new Date();
        const days = [];

        for (let i: number = 0; i <= today.getMonth() + 1; i++) {
            const daysInMonth = new Date(today.getFullYear(), i+1, 0).getDate();

            for (let j: number = 1; j <= daysInMonth; j++) {
                days.push({ date: new Date(today.getFullYear(), i, j), completed: false });
            }
        }
        
        return days;
    };

    return (
        <Box sx={style} tabIndex={-1} ref={ref}>
            <form onSubmit={addHabit}>
                <Typography id="modal-habit-form-title" variant="h6" component="h2" className="text-center">Habit Form</Typography>
                <div className="flex items-center justify-center gap-x-3 mt-5">
                    <TextField required id="txt-habit-name" label="Name" value={name} variant="outlined" size="small" onChange={({ target }) => setName(target.value)} />
                    <Button variant="contained" type="submit" sx={{ color: 'black' }}>Submit</Button>
                </div>
            </form>
        </Box>
    );
});

HabitForm.displayName = 'HabitForm';

export default HabitForm;

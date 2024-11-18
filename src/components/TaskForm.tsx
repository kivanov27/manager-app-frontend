import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { NewTask } from "../types";
import { forwardRef, useState } from "react";

interface TaskFormProps {
    onSubmit(values: NewTask): void;
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

const TaskForm = forwardRef(({ onSubmit }: TaskFormProps, ref) => {
    const [startH, setStartH] = useState<number>();
    // const [startM, setStartM] = useState<number>();

    const addTask = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onSubmit({
            startsAt: new Date(),
            endsAt: new Date(),
            task: '',
            completed: false
        });
    }

    return (
        <Box sx={style} tabIndex={-1} ref={ref}>
            <form onSubmit={addTask} className="flex flex-col gap-4">
                <Typography id="modal-task-form-title" variant="h6" component="h2" className="text-center">
                    Task Form
                </Typography>
                <Select
                    labelId="start-select-label"
                    id="start-select"
                    value={startH}
                    label="Start"
                    onChange={({ target }) => setStartH(target.value as number)}
                >
                    {Array.from({ length: 24 }, (_, i) => i + 1).map(i => (
                        <MenuItem key={i} value={i}>{i}</MenuItem>
                    ))}
                </Select>
                <Button variant="contained" type="submit" sx={{ color: 'black' }}>Submit</Button>
            </form>
        </Box>
    )
});

export default TaskForm;

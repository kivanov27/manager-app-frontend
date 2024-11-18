import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
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
    width: 300,
    bgcolor: '#272727',
    border: '1px solid #727272',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

const TaskForm = forwardRef(({ onSubmit }: TaskFormProps, ref) => {
    const [start_h, setStart_h] = useState<number>(1);
    const [start_m, setStart_m] = useState<number>(0);
    const [end_h, setEnd_h] = useState<number>(1);
    const [end_m, setEnd_m] = useState<number>(0);
    const [task, setTask] = useState<string>('');

    const addTask = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const today = new Date();

        onSubmit({
            startsAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), start_h, start_m),
            endsAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), end_h, end_m),
            task,
            completed: false
        });
    }

    return (
        <Box sx={style} tabIndex={-1} ref={ref}>
            <form onSubmit={addTask} className="flex flex-col gap-8">
                <Typography id="modal-task-form-title" variant="h6" component="h2" className="text-center">
                    Task Form
                </Typography>
                <div className="flex justify-center items-center gap-x-6">
                    <h4 className="text-lg me-4">Start</h4>
                    <FormControl fullWidth sx={{ width: '70px' }}>
                        <InputLabel id="start-h-label">h</InputLabel>
                        <Select
                            labelId="start-h-label"
                            id="start-h"
                            value={start_h}
                            label="h"
                            onChange={({ target }) => setStart_h(target.value as number)}
                        >
                            {Array.from({ length: 24 }, (_, i) => i + 1).map(i => (
                                <MenuItem key={i} value={i}>{i}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ width: '70px' }}>
                        <InputLabel id="start-m-label">m</InputLabel>
                        <Select
                            labelId="start-m-label"
                            id="start-m"
                            value={start_m}
                            label="m"
                            onChange={({ target }) => setStart_m(target.value as number)}
                        >
                            {Array.from({ length: 61 }, (_, i) => i + 1).map(i => (
                                <MenuItem key={i-1} value={i-1}>{i-1}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className="flex justify-center items-center gap-x-6">
                    <h4 className="text-lg me-4">End</h4>
                    <FormControl fullWidth sx={{ width: '70px' }}>
                        <InputLabel id="end-h-label">h</InputLabel>
                        <Select
                            labelId="end-h-label"
                            id="end-h"
                            value={end_h}
                            label="h"
                            onChange={({ target }) => setEnd_h(target.value as number)}
                        >
                            {Array.from({ length: 24 }, (_, i) => i + 1).map(i => (
                                <MenuItem key={i} value={i}>{i}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ width: '70px' }}>
                        <InputLabel id="end-m-label">m</InputLabel>
                        <Select
                            labelId="end-m-label"
                            id="end-m"
                            value={end_m}
                            label="m"
                            onChange={({ target }) => setEnd_m(target.value as number)}
                        >
                            {Array.from({ length: 61 }, (_, i) => i + 1).map(i => (
                                <MenuItem key={i-1} value={i-1}>{i-1}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <TextField variant="outlined" label="Task" value={task} onChange={({ target }) => setTask(target.value)} />

                <Button variant="contained" type="submit" className="h-12" sx={{ color: 'black' }}>Submit</Button>
            </form>
        </Box>
    )
});

export default TaskForm;

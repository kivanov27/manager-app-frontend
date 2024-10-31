import { Button, Modal, Paper, Table, TableBody, TableContainer, TableHead } from "@mui/material";
import { Habit, NewHabit } from "../types";
import HabitForm from "../components/HabitForm";
import { useState } from "react";

interface HabitsProps {
    habits: Habit[];
}

const Habits = ({ habits }: HabitsProps) => {
    const [formOpen, setFormOpen] = useState<boolean>(false);

    const openForm = () => setFormOpen(true);
    const closeForm = () => setFormOpen(false);

    const submitHabit = async (values: NewHabit) => {
        console.log('New Habit:', values);
        closeForm();
    };

    return (
        <div className="w-full p-6">
            <h1 className="text-2xl text-center mb-10">Habits</h1>
            {habits.map(habit =>
                <div key={habit.id}>
                    <h2>{habit.name}</h2>
                    <TableContainer component={Paper} sx={{ maxHeight: 90, minHeight: 90 }}>
                        <Table sx={{ maxHeight: 90, minHeight: 90 }} size="small" aria-label={`${habit.name}-tracker`} className='bg-[#474747]'>
                            <TableHead>
                            </TableHead>
                            <TableBody>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}

            <Button variant='outlined' onClick={openForm}>create habit</Button>

            <Modal
                open={formOpen}
                onClose={closeForm}
                aria-labelledby='modal-habit-form-title'
                aria-describedby='modal-habit-form-description'
            >
                <HabitForm onSubmit={submitHabit} />
            </Modal>
        </div>
    );
};

export default Habits;

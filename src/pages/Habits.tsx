import { useState } from "react";
import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Habit, NewHabit } from "../types";
import HabitForm from "../components/HabitForm";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { daysOfWeek } from "../constants";

dayjs.extend(isoWeek);

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

    const startOfYear = dayjs().startOf("year");
    const currentDate = dayjs();
    const weeksSinceStartOfYear = currentDate.isoWeek() - startOfYear.isoWeek() + 1;

    const generateMonthHeaders = () => {
        const headers: { month: string, colSpan: number }[] = [];
        let currentMonth = startOfYear;
        while (currentMonth.isBefore(currentDate)) {
            const daysInMonth = currentMonth.daysInMonth();
            const weeksInMonth = Math.ceil(daysInMonth / 7);
            headers.push({ month: currentMonth.format("MMMM"), colSpan: weeksInMonth });
            currentMonth = currentMonth.add(1, "month");
        }
        return headers;
    };

    const monthHeaders = generateMonthHeaders();

    return (
        <div className="w-full p-6">
            <h1 className="text-2xl text-center mb-10">Habits</h1>
            {habits.map(habit =>
                <div key={habit.id}>
                    <h2>{habit.name}</h2>
                    <TableContainer component={Paper} sx={{ maxHeight: 90, minHeight: 90 }}>
                        <Table sx={{ maxHeight: 90, minHeight: 90 }} size="small" aria-label={`${habit.name}-tracker`} className='bg-[#474747]'>
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    {monthHeaders.map((header, index) => (
                                        <TableCell key={index} align="center" colSpan={header.colSpan} className="font-bold">
                                            {header.month}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {daysOfWeek.map((day, dayIndex) => (
                                    <TableRow key={dayIndex}>
                                        <TableCell>{day}</TableCell>
                                        {[...Array(weeksSinceStartOfYear)].map((_, weekIndex) => {
                                            const isCompleted = Math.random() > 0.5;
                                            const cellColor = isCompleted ? "#4caf50" : "e0e0e0";
                                            return (
                                                <TableCell key={weekIndex} className={`bg-[${cellColor}] w-3 h-3`} />
                                            );
                                        })}
                                    </TableRow>
                                ))}
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

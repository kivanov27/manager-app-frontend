import { useState } from "react";
import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useAppDispatch } from "../hooks";
import { createHabit } from "../reducers/habitReducer";
import { Habit, NewHabit } from "../types";
import { daysOfWeek } from "../constants";
import HabitForm from "../components/HabitForm";

dayjs.extend(isoWeek);

interface HabitsProps {
    habits: Habit[];
}

const Habits = ({ habits }: HabitsProps) => {
    const [formOpen, setFormOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const openForm = () => setFormOpen(true);
    const closeForm = () => setFormOpen(false);

    const submitHabit = async (values: NewHabit) => {
        await dispatch(createHabit(values));
        closeForm();
    };

    const startOfYear = dayjs().startOf("year");
    const currentDate = dayjs();
    const weeks: Dayjs[] = [];
    let weekStart = startOfYear.startOf("isoWeek");

    while (weekStart.isBefore(currentDate)) {
        weeks.push(weekStart);
        weekStart = weekStart.add(1, "week");
    }
    
    const generateMonthHeaders = () => {
        const headers: { month: string, colSpan: number }[] = [];
        let currentMonth = startOfYear.startOf("month");
        let colSpan = 0;

        for (const week of weeks) {
            if (week.month() === currentMonth.month()) {
                colSpan++;
            }
            else {
                if (colSpan > 0) {
                    headers.push({ month: currentMonth.format("MMMM"), colSpan });
                }
                currentMonth = week.startOf("month");
                colSpan = 1;
            }
        }

        // add last month's header
        if (colSpan > 0) {
            headers.push({ month: currentMonth.format("MMMM"), colSpan });
        }
        
        // if January doesn't start on Monday add 1 empty header
        if (startOfYear.isoWeekday() !== 1) {
            headers.unshift({ month: "", colSpan: 1 });
        }

        return headers;
    };

    const monthHeaders = generateMonthHeaders();

    console.log(weeks);

    return (
        <div className="w-full p-6">
            <h1 className="text-2xl text-center mb-10">Habits</h1>
            {habits.map(habit =>
                <div key={habit.id}>
                    <h2 className="capitalize mb-4">{habit.name}</h2>
                    <TableContainer sx={{ width: 'fit-content' }} component={Paper} className="mb-10">
                        <Table sx={{ width: 'fit-content' }} size="small" aria-label={`${habit.name}-tracker`} className='bg-[#474747] border border-white'>
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    {monthHeaders.map((header, index) => (
                                        <TableCell key={index} align="center" sx={{ color: 'white' }} colSpan={header.colSpan} className="font-bold border border-white">
                                            {header.month.slice(0, 3)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {daysOfWeek.map((day, dayIndex) => (
                                    <TableRow key={dayIndex}>
                                        <TableCell sx={{ color: 'white' }}>{day}</TableCell>
                                        {weeks.map((_, weekIndex) => {
                                            const isCompleted = Math.random() > 0.5;
                                            const cellColor = isCompleted ? "#4caf50" : "e0e0e0";
                                            return (
                                                <TableCell 
                                                    id={weekIndex.toString()}
                                                    key={weekIndex} 
                                                    sx={{ width: '2rem', height: '2rem', maxWidth: '2rem', maxHeight: '2rem', backgroundColor: cellColor }} 
                                                    className='border border-white' 
                                                >{}</TableCell>
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

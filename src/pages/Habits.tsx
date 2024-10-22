import { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Habit, HabitDay } from '../types';
import { daysOfWeek } from '../constants';

interface HabitProps {
    habits: Habit[];
}

const getWeekDays = (days: HabitDay[]): HabitDay[][] => {
    const weeks: HabitDay[][] = [];
    let currentWeek: HabitDay[] = [];

    days.forEach((day, index) => {
        currentWeek.push(day);

        if ((index + 1) % 7 === 0) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });

    if (currentWeek.length > 0) {
        weeks.push(currentWeek);
    }

    return weeks;
};

const getMonthHeaders = (weeks: HabitDay[][]) => {
    const months: { label: string; colSpan: number }[] = [];
    let currentMonth = '';
    let colSpan = 0;

    weeks.forEach(week => {
        const month = week[0].date.toLocaleString('default', { month: 'long' });
        if (month === currentMonth) {
            colSpan++;
        }
        else {
            if (currentMonth) {
                months.push({ label: currentMonth, colSpan });
            }
            currentMonth = month;
            colSpan = 1;
        }
    });

    if (currentMonth) {
        months.push({ label: currentMonth, colSpan });
    }

    return months;
};

const Habits = ({ habits }: HabitProps) => {
    const [habitData, setHabitData] = useState<Habit[]>();

    useEffect(() => {
        setHabitData(habits || []);
    }, [habits]);

    const toggleHabitDay = (habitId: string, dayIndex: number) => {
        setHabitData(prevHabits => {
            if (prevHabits) {
                prevHabits.map(habit => {
                    if (habit.id === habitId) {
                        const updatedDays = habit.days.map((day, index) => index === dayIndex ? { ...day, completed: !day.completed } : day);
                        return { ...habit, days: updatedDays }
                    }
                    return habit;
                });
            }
            return prevHabits;
        });
    };

    return (
        <div className="w-full p-6">
            <h1 className="text-2xl text-center mb-4">Habits</h1>

            {habitData && habitData.map(habit => {
                const weeks = getWeekDays(habit.days);
                const monthHeaders = getMonthHeaders(weeks);

                return (
                    <div key={habit.id}>
                        <h2 className='text-xl mb-2'>{habit.name}</h2>
                        <div className='flex justify-center'>
                            <TableContainer component={Paper} sx={{ minWidth: 650, maxWidth: 1200 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            {monthHeaders.map((month, index) => (
                                                <TableCell key={index} align='center' colSpan={month.colSpan}>
                                                    {month.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {daysOfWeek.map((dayName, dayIndex) => (
                                            <TableRow key={dayIndex}>
                                                <TableCell align='center'>
                                                    <strong>{dayName}</strong>
                                                </TableCell>

                                                {weeks.map((week, weekIndex) => (
                                                    <TableCell 
                                                        key={weekIndex} 
                                                        align='center'
                                                        sx={{
                                                            backgroundColor: week[dayIndex] && week[dayIndex].completed ? 'green' : 'lightgray',
                                                            cursor: 'pointer',
                                                            width: 40,
                                                            height: 40,
                                                            borderRadius: '5px',
                                                        }}
                                                        onClick={() => week[dayIndex] && toggleHabitDay(habit.id, weekIndex * 7 + dayIndex) }
                                                    >
                                                        {week[dayIndex] && week[dayIndex].date instanceof Date ? week[dayIndex].date.getDate() : null}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Habits;

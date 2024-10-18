import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Habit, HabitDay } from '../types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
}));

const DayCell = styled(TableCell)<{ completed: boolean }>(({ theme, completed }) => ({
    cursor: 'pointer',
    backgroundColor: completed ? theme.palette.success.main : theme.palette.background.paper,
    '&:hover': {
        backgroundColor: completed ? theme.palette.primary.dark : theme.palette.action.hover
    },
}));

const Habits = () => {
    const [habit, setHabit] = useState<Habit>({ name: 'My Habit', days: [] });
    const [grid, setGrid] = useState<Date[][]>([]);

    useEffect(() => {
        const today = new Date();
        const grid = generateGrid(today, 10, 7);
        setGrid(grid);
        setHabit((prev: any) => ({
            ...prev,
            days: grid.flat().map((date: any) => ({ date, completed: false}))
        }));
    }, [])

    const generateGrid = (endDate: Date, columns: number, rows: number): Date[][] => {
        const grid: Date[][] = [];
        let currentDate = new Date(endDate);

        for (let col = columns - 1; col >= 0; col--) {
            const column: Date[] = [];
            for (let row = rows - 1; row >= 0; row--) {
                column.unshift(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() - 1);
            }
            grid.unshift(column);
        }

        return grid;
    };

    const toggleDay = (date: Date) => {
        setHabit((prev: Habit) => ({
            ...prev,
            days: prev.days.map((day: HabitDay) =>
                day.date.getTime() === date.getTime()
                    ? { ...day, completed: !day.completed }
                    : day
            )
        }));
    };

    const isDayCompleted = (date: Date): boolean => {
        return habit.days.some((day: HabitDay) =>
            day.date.getTime() === date.getTime() && day.completed
        );
    };

    return (
        <div className="w-full">
            <h1 className="text-2xl text-center mb-4">Habits</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <StyledTableCell key={day} align="center">{day}</StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {grid.map((column, colIndex) => (
                            <TableRow key={colIndex}>
                                {column.map((date, rowIndex) => (
                                    <DayCell
                                        key={`${colIndex}-${rowIndex}`}
                                        completed={isDayCompleted(date)}
                                        onClick={() => toggleDay(date)}
                                        align="center"
                                    >
                                        {date.getDate()}
                                    </DayCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Habits;

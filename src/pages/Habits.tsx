import { ReactNode, useEffect } from "react";
import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { Button, Modal } from "@mui/material";
import { createHabit, updateHabit, deleteHabit } from "../reducers/habitReducer";
import { Habit, NewHabit } from "../types";
import HabitForm from "../components/HabitForm";
import { daysOfWeek, daysOfWeekShort, monthsOfYear } from "../constants";
import DeleteIcon from '@mui/icons-material/Delete';

interface HabitsProps {
    habits: Habit[];
}

const Habits = ({ habits }: HabitsProps) => {
    const [month, setMonth] = useState<number | undefined>();
    const [year, setYear] = useState<number | undefined>();
    const [formOpen, setFormOpen] = useState<boolean>(false);

    useEffect(() => {
        const today = new Date();
        setMonth(today.getMonth());
        setYear(today.getFullYear());
    }, [])

    const dispatch = useAppDispatch();
    const openForm = () => setFormOpen(true);
    const closeForm = () => setFormOpen(false);

    const submitHabit = async (values: NewHabit) => {
        await dispatch(createHabit(values));
        closeForm();
    };

    const handleMonthChange = (newMonth: number) => {
        setMonth(newMonth);
        console.log("month:", month);
    };

    const generateDays = (habit: Habit): ReactNode => {
        if (month && year) {
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDayOfMonth = new Date(year, month, 1);

            const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "numeric",
                day: "numeric",
            });
            const weekday = dateString.split(", ")[0];

            const paddingDays = daysOfWeek.indexOf(weekday);

            const days: ReactNode[] = [];

            for (let i = 1; i <= paddingDays + daysInMonth; i++) {
                if (i > paddingDays) {
                    const dayDate = new Date(year, month, i-paddingDays);
                    const day = habit.days.find(d => {
                        const date = new Date(d.date);
                        return date.toUTCString() === dayDate.toUTCString();
                    });

                    if (day) {
                        days.push(
                            <div 
                                key={i} 
                                className={`w-[50px] h-[50px] border border-white text-white flex justify-center items-center cursor-pointer 
                                    ${day.completed ? 'bg-green-800' : ''}`} 
                                onClick={() => toggleCompleted(habit.name, dayDate)}
                            >
                                {i - paddingDays}
                            </div>
                        );
                    }
                } else {
                    days.push(<div key={`padding-${i}`} className="w-[50px] h-[50px]" />);
                }
            }

            return (
                <div className={`mx-auto flex flex-wrap w-[352px] ${weekday === 'Sunday' ? 'h-[300px]' : 'h-[250px]'}`}>
                    {days}
                </div>
            );

        }
        else {
            console.log("Month or year is missing.");
        }

    };

    const toggleCompleted = (habitName: string, date: Date) => {         
        const habitToChange = habits.find(habit => habit.name === habitName);

        if (habitToChange) {
            const updatedDays = habitToChange.days.map(day => {
                const dayDate = new Date(day.date);
                if (dayDate.toUTCString() === date.toUTCString()) {
                    return { ...day, completed: !day.completed };
                }
                return day;
            });

            const updatedHabit = { ...habitToChange, days: updatedDays };
            dispatch(updateHabit(updatedHabit.id, updatedHabit));
        }
    };

    const handleDelete = async (id: string) => {
        await dispatch(deleteHabit(id)); 
    };

    const prevMonth = () => {
        if (month) {
            setMonth(month - 1);
        }
    };

    const nextMonth = () => {
        if (month) {
            setMonth(month + 1);
        }
    };

    return (
        <div className="w-full">
            <h1 className="text-3xl text-center mb-10">Habits</h1>
            <div className="flex flex-wrap gap-x-36 justify-center mt-20">
                {habits.map((habit) => (
                    <div key={habit.id} className="mb-10">
                        <h2 className="capitalize text-xl flex items-center justify-center gap-x-4">
                            {habit.name} 
                            <DeleteIcon className="cursor-pointer" onClick={() => handleDelete(habit.id)} />
                        </h2>
                        <div className="w-full flex justify-center gap-x-10 my-4">
                            <div className="flex gap-x-2">
                                <button onClick={prevMonth}>◄</button>
                                <select 
                                    name="months" 
                                    value={month} 
                                    onChange={({ target }) => handleMonthChange(parseInt(target.value))} 
                                    className="bg-gray-700 text-center"
                                >
                                    {Object.values(monthsOfYear).map((month, index) => (
                                        <option key={index} value={index}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                                <button onClick={nextMonth}>►</button>
                            </div>
                            <div className="flex gap-x-2">
                                <button>◄</button>
                                <div>{year}</div>
                                <button>►</button>
                            </div>
                        </div>
                        <div className="flex mx-auto w-[350px] mb-3">
                            {daysOfWeekShort.map((day) => (
                                <p key={day} className="w-[50px] text-center">{day}</p>
                            ))}
                        </div>
                        {generateDays(habit)}
                    </div>
                ))}
            </div>
            
            <div className="flex justify-center mt-4">
                <Button variant="outlined" onClick={openForm}>
                    create habit
                </Button>
            </div>

            <Modal
                open={formOpen}
                onClose={closeForm}
                aria-labelledby="modal-habit-form-title"
                aria-describedby="modal-habit-form-description"
            >
                <HabitForm onSubmit={submitHabit} />
            </Modal>
        </div>
    );
};

export default Habits;

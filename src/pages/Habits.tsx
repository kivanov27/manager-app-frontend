import { ReactNode } from "react";
import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { Button, Modal } from "@mui/material";
import { createHabit } from "../reducers/habitReducer";
import { Habit, NewHabit } from "../types";
import HabitForm from "../components/HabitForm";
import { daysOfWeek, monthsOfYear } from "../constants";

interface HabitsProps {
    habits: Habit[];
}

const Habits = ({ habits }: HabitsProps) => {
    // const [month, setMonth] = useState<number>();
    const [year, setYear] = useState<number>(2024);
    const [formOpen, setFormOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const openForm = () => setFormOpen(true);
    const closeForm = () => setFormOpen(false);

    const submitHabit = async (values: NewHabit) => {
        await dispatch(createHabit(values));
        closeForm();
    };

    // const handleMonthChange = (newMonth: number) => {
    //     setMonth(newMonth);
    //     console.log("month:", month);
    // };

    const generateDays = (): ReactNode => {
        const today = new Date();

        // const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1);

        const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
        const paddingDays = daysOfWeek.indexOf(dateString.split(", ")[0]);

        const days: ReactNode[] = [];

        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
            if (i > paddingDays) {
                days.push(
                    <div
                        key={i}
                        className="w-[100px] h-[100px] border border-white text-white flex justify-center items-center"
                        onClick={() => console.log("click")}
                    >
                        {i - paddingDays}
                    </div>,
                );
            } else {
                days.push(<div key={`padding-${i}`} className="w-[100px] h-[100px]" />);
            }
        }

        return days;
    };

    return (
        <div className="w-full p-6">
            <h1 className="text-2xl text-center mb-10">Habits</h1>
            {habits.map((habit) => (
                <div key={habit.id} className="mb-10">
                    <h2 className="capitalize text-center text-xl underline underline-offset-4">
                        {habit.name}
                    </h2>
                    <div className="w-full flex justify-center gap-x-10 my-4">
                        <div className="flex gap-x-2">
                            <button>◄</button>
                            <select name="months" className="bg-gray-700 text-center">
                                {Object.values(monthsOfYear).map((month, index) => (
                                    <option key={month} value={index}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                            <button>►</button>
                        </div>
                        <div className="flex gap-x-2">
                            <button>◄</button>
                            <button>{year}</button>
                            <button>►</button>
                        </div>
                    </div>
                    <div className="flex mx-auto w-[700px]">
                        {daysOfWeek.map((day) => (
                            <p key={day} className="w-[100px] text-center">
                                {day}
                            </p>
                        ))}
                    </div>
                    <div className="mx-auto border border-white w-[702px] h-[500px] flex flex-wrap">
                        {generateDays()}
                    </div>
                </div>
            ))}

            <Button variant="outlined" onClick={openForm}>
                create habit
            </Button>

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

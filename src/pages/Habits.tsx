import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { Button, Modal } from "@mui/material";
import { createHabit } from "../reducers/habitReducer";
import { Habit, NewHabit, Months } from "../types";
import HabitForm from "../components/HabitForm";
import { daysOfWeek } from "../constants";

interface HabitsProps {
    habits: Habit[];
}

const Habits = ({ habits }: HabitsProps) => {
    const [month, setMonth] = useState<Months>(Months.November);
    const [year, setYear] = useState<number>(2024);
    const [formOpen, setFormOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const openForm = () => setFormOpen(true);
    const closeForm = () => setFormOpen(false);

    const submitHabit = async (values: NewHabit) => {
        await dispatch(createHabit(values));
        closeForm();
    };

    return (
        <div className="w-full p-6">
            <h1 className="text-2xl text-center mb-10">Habits</h1>
            {habits.map(habit => (
                <div key={habit.id} className="mb-10">
                    <h2 className="capitalize text-center text-xl underline underline-offset-4">{habit.name}</h2>
                    <div className="w-full flex justify-center gap-x-10 my-4">
                        <div className="flex gap-x-2">
                            <button>◄</button>
                            <button>{month}</button>
                            <button>►</button>
                        </div>
                        <div className="flex gap-x-2">
                            <button>◄</button>
                            <button>{year}</button>
                            <button>►</button>
                        </div>
                    </div>
                    <div className="flex mx-auto w-[700px]">
                        {daysOfWeek.map(day => 
                            <p key={day} className="w-[100px] text-center">{day}</p>
                        )}
                    </div>
                    <div className="mx-auto border border-white w-[700px] h-[700px]">
                    </div>
                </div>
            ))}

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

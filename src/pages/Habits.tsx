import { ReactNode } from "react";
import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { Button, Modal } from "@mui/material";
import { createHabit } from "../reducers/habitReducer";
import { Habit, NewHabit, Months } from "../types";
import HabitForm from "../components/HabitForm";
import { daysOfWeek, monthsOfYear } from "../constants";

interface HabitsProps {
  habits: Habit[];
}

const Habits = ({ habits }: HabitsProps) => {
  const [month, setMonth] = useState<string>();
  const [monthIndex, setMonthIndex] = useState<number>();
  const [year, setYear] = useState<number>(2024);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  const submitHabit = async (values: NewHabit) => {
    await dispatch(createHabit(values));
    closeForm();
  };

  const handleMonthChange = (newMonth: string) => {
    setMonth(newMonth);
    if (month) {
      setMonthIndex(monthsOfYear.indexOf(month));
    }
    console.log("month:", month, "month index:", monthIndex);
  };

  const generateDays = (): ReactNode => {
    const today = new Date();
    setMonthIndex(today.getMonth());
    if (monthIndex) {
      setMonth(monthsOfYear[monthIndex]);
    }
    const daysInMonth = new Date();

    return <div>yolo</div>;
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
              <select
                name="months"
                className="bg-gray-700 text-center"
                onChange={({ target }) =>
                  handleMonthChange(target.value as Months)
                }
              >
                {Object.values(monthsOfYear).map((month) => (
                  <option key={month} value={month}>
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
          <div className="mx-auto border border-white w-[700px] h-[700px] flex">
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

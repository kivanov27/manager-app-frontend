import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { initializeWorkouts } from "../reducers/workoutReducer";
import { Route, Routes, useMatch } from "react-router-dom";
import { Days } from "../types";
import { Button, Divider, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import WorkoutForm from "../components/WorkoutForm";
import WorkoutPage from "./WorkoutPage";

const Workouts = () => {
    const [formOpen, setFormOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const workouts = useAppSelector(state => state.workouts);

    const match = useMatch('/workouts/:id');
    const workout = match ? workouts.find(workout => workout.id === Number(match.params.id)) : null;

    useEffect(() => {
        dispatch(initializeWorkouts());
    }, []);

    const handleOpenForm = () => setFormOpen(true);
    const handleCloseForm = () => setFormOpen(false);

    const submitWorkout = () => {}

    return (
        <div className="w-full px-8 py-4">
            <ul>
                {Object.values(Days).map(day => (
                    <li key={day} className="flex flex-col gap-2 pb-4">
                        <h1 className="text-2xl">{day}</h1> 
                        {workouts.map(workout => {
                            if (workout.day === day) {
                                return (
                                    <Link key={workout.id} to={`/workouts/${workout.id}`}>{workout.title}</Link>
                                )
                            }
                        })}
                        <Button variant="outlined" className="w-fit" onClick={handleOpenForm}>+ add workouts</Button>
                        <Divider orientation="horizontal" />
                    </li>
                ))}
            </ul>

            <Modal
                open={formOpen}
                onClose={handleCloseForm}
                aria-labelledby="modal-workout-form-title"
                aria-describedby="modal-workout-form-description"
            >
                <WorkoutForm onSubmit={submitWorkout} />
            </Modal>

            <Routes>
                <Route path="/workouts/:id" element={<WorkoutPage workout={workout} />} />
            </Routes>
        </div>
    );
};

export default Workouts;

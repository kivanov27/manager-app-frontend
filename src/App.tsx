import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Routes, Route, useMatch } from "react-router-dom";
import { initializeWorkouts, selectWorkouts } from "./reducers/workoutReducer";
import { initializeWorkoutRecords, selectWorkoutRecords } from "./reducers/workoutRecordReducer";
import { initializeHabits, selectHabits } from "./reducers/habitReducer";
import SideNav from "./components/SideNav";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import WorkoutTracker from "./pages/WorkoutTracker";
import Habits from "./pages/Habits";
import Timetable from "./pages/Timetable";
import WorkoutPage from "./pages/WorkoutPage";

const App = () => {
    const dispatch = useAppDispatch();
    const workouts = useAppSelector(selectWorkouts);
    const workoutRecords = useAppSelector(selectWorkoutRecords);
    const habits = useAppSelector(selectHabits);

    const match = useMatch('/workouts/:id');
    const workout = match ? workouts.find(workout => workout.id === match.params.id) : null;

    useEffect(() => {
        dispatch(initializeWorkouts());
        dispatch(initializeWorkoutRecords());
        dispatch(initializeHabits());
    }, [dispatch]);

    return (
        <div className="min-h-screen flex">
            <SideNav />
            <div className="ml-[16.666%] w-5/6 p-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/workouts" element={<Workouts workouts={workouts} />} />
                    <Route path="/workout-tracker" element={<WorkoutTracker workoutRecords={workoutRecords} />} />
                    <Route path="/habits" element={<Habits habits={habits} />} />
                    <Route path="/timetable" element={<Timetable />} />
                    <Route path="/workouts/:id" element={<WorkoutPage workout={workout} />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Routes, Route, useMatch } from "react-router-dom";
import { initializeWorkouts, selectWorkouts } from "./reducers/workoutReducer";
import { selectWorkoutRecords } from "./reducers/workoutRecordReducer";
import SideNav from "./components/SideNav";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import WorkoutTracker from "./pages/WorkoutTracker";
import Habits from "./pages/Habits";
import Timetable from "./pages/Timetable";
import WorkoutPage from "./pages/WorkoutPage";

const App = () => {

    console.log(typeof new Date().toLocaleDateString());

    const dispatch = useAppDispatch();
    const workouts = useAppSelector(selectWorkouts);
    const workoutRecords = useAppSelector(selectWorkoutRecords);

    const match = useMatch('/workouts/:id');
    const workout = match ? workouts.find(workout => workout.id === match.params.id) : null;

    useEffect(() => {
        dispatch(initializeWorkouts());
    }, [dispatch]);

    return (
        <div className="min-h-screen flex">
            <SideNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/workouts" element={<Workouts workouts={workouts} />} />
                <Route path="/workout-tracker" element={<WorkoutTracker workoutRecords={workoutRecords} />} />
                <Route path="/habits" element={<Habits />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/workouts/:id" element={<WorkoutPage workout={workout} />} />
            </Routes>
        </div>
    );
};

export default App;

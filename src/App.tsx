import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Routes, Route, useMatch } from "react-router-dom";
import { initializeWorkouts } from "./reducers/workoutReducer";
import SideNav from "./components/SideNav";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import WorkoutTracker from "./pages/WorkoutTracker";
import Habits from "./pages/Habits";
import Timetable from "./pages/Timetable";
import WorkoutPage from "./pages/WorkoutPage";

const App = () => {
    const dispatch = useAppDispatch();
    const workouts = useAppSelector(state => state.workouts);

    const match = useMatch('/workouts/:id');
    console.log(match?.params.id);
    const workout = match ? workouts.find(workout => workout.id === Number(match.params.id)) : null;
    console.log(`workout: ${JSON.stringify(workout)}`);

    useEffect(() => {
        dispatch(initializeWorkouts());
    }, []);

    return (
        <div className="min-h-screen flex">
            <SideNav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/workouts" element={<Workouts workouts={workouts} />} />
                <Route path="/workout-tracker" element={<WorkoutTracker />} />
                <Route path="/habits" element={<Habits />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/workouts/:id" element={<WorkoutPage workout={workout} />} />
            </Routes>
        </div>
    );
};

export default App;

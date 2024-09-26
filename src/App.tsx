import { Routes, Route } from "react-router-dom";
import SideNav from "./components/SideNav";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import WorkoutTracker from "./pages/WorkoutTracker";
import Habits from "./pages/Habits";
import Timetable from "./pages/Timetable";

const App = () => {
  return (
    <div className="min-h-screen flex">
        <SideNav />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/workout-tracker" element={<WorkoutTracker />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/timetable" element={<Timetable />} />
        </Routes>
    </div>
  );
};

export default App;

import { Link } from "react-router-dom";
import User from './User';

const SideNav = () => {
    return (
        <div className="w-1/6 max-h-screen min-h-screen fixed py-10 flex flex-col justify-between items-center border border-[#272727] border-e-[#727272]">
            <div className="flex flex-col items-center gap-y-2">
                <Link to='/workouts'>workouts</Link>
                <Link to='/workout-tracker'>workout tracker</Link>
                <Link to='/habits'>habits</Link>
                <Link to='/timetable'>timetable</Link>
            </div>
            <User />
        </div>
    );
};

export default SideNav;

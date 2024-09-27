import { Workout } from "../types";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";

interface WorkoutPageProps {
    workout: Workout | null | undefined;
}

const WorkoutPage = ({ workout }: WorkoutPageProps) => {
    const navigate = useNavigate();

    if (workout === null) {
        return <div>No workout found</div>
    }
    else if (workout === undefined) {
        return <div>Loading...</div>
    }
    else {
        return(
            <div className="w-full">
                <ArrowBackIosNewIcon className="cursor-pointer" onClick={() => navigate('/workouts')} />
                <p>{workout.title}</p>
            </div>
        );
    }
};

export default WorkoutPage;

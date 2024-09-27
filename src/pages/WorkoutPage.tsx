import { Workout } from "../types";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface WorkoutPageProps {
    workout: Workout;
}

const WorkoutPage = ({ workout }: WorkoutPageProps) => {
    return(
        <div>
            <ArrowBackIosNewIcon className="cursor-pointer" />
            <p>{workout.title}</p>
        </div>
    );
};

export default WorkoutPage;

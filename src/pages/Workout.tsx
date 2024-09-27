import { Workout } from "../types";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface WorkoutPageProps {
    workout: Workout | null | undefined;
}

const WorkoutPage = ({ workout }: WorkoutPageProps) => {
    if (workout === null) {
        return <div>No workout selected</div>
    }

    if (workout === undefined) {
        return <div>Loading...</div>
    }

    return(
        <div>
            <ArrowBackIosNewIcon className="cursor-pointer" />
            <p>{workout.title}</p>
        </div>
    );
};

export default WorkoutPage;

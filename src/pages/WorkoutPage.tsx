import { Workout } from "../types";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface WorkoutPageProps {
    workout: Workout | null | undefined;
}

const WorkoutPage = ({ workout }: WorkoutPageProps) => {
    console.log(workout);

    if (workout === null) {
        return <div>No workout found</div>
    }
    else if (workout === undefined) {
        return <div>Loading...</div>
    }
    else {
        return(
            <div>
                <ArrowBackIosNewIcon className="cursor-pointer" />
                <p>{workout.title}</p>
            </div>
        );
    }
};

export default WorkoutPage;

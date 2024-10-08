import { useAppDispatch } from "../hooks";
import { Workout } from "../types";

interface WorkoutTrackerProps {
    workoutRecords: Workout[];
}

const WorkoutTracker = ({ workoutRecords }: WorkoutTrackerProps) => {
    const dispatch = useAppDispatch();

    return (
        <div className="w-full p-6">
            <h1 className="text-center text-2xl mb-10">Workout Tracker</h1>
            {workoutRecords.map(workoutRecord => (
                <div key={workoutRecord.id}>
                    <h2>{workoutRecord.title}</h2>
                </div>
            ))}
        </div>
    );
};

export default WorkoutTracker;

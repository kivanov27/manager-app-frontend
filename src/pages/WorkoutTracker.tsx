//import { useAppDispatch } from "../hooks";
import { WorkoutRecord } from "../types";

interface WorkoutTrackerProps {
    workoutRecords: WorkoutRecord[];
}

const WorkoutTracker = ({ workoutRecords }: WorkoutTrackerProps) => {
    //const dispatch = useAppDispatch();

    console.log(workoutRecords);

    return (
        <div className="w-full p-6">
            <h1 className="text-center text-2xl mb-10">Workout Tracker</h1>
            {workoutRecords.map(workoutRecord => (
                <div key={workoutRecord.id}>
                    <div>
                        {workoutRecord.title} {workoutRecord.date}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WorkoutTracker;

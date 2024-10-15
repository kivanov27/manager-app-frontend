import { useState } from "react";
import { WorkoutRecord } from "../types";

interface WorkoutTrackerProps {
    workoutRecords: WorkoutRecord[];
}

const WorkoutTracker = ({ workoutRecords }: WorkoutTrackerProps) => {
    const [show, setShow] = useState<boolean[]>([]);

    return (
        <div className="w-full p-6">
            <h1 className="text-center text-2xl mb-10">Workout Tracker</h1>
            {workoutRecords.map(workoutRecord => (
                <div key={workoutRecord.id} className="mb-10">
                    {workoutRecord.title} - {workoutRecord.date}
                    <ul>
                        {workoutRecord.exercises.map(exercise => (
                            <li key={exercise.id} className="list-disc list-inside">
                                {exercise.name} {exercise.sets ? `${exercise.sets} x ${exercise.reps}` : exercise.duration}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default WorkoutTracker;

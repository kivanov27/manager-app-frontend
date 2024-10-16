import { useState, useEffect } from "react";
import { WorkoutRecord } from "../types";

interface WorkoutTrackerProps {
    workoutRecords: WorkoutRecord[];
}

const WorkoutTracker = ({ workoutRecords }: WorkoutTrackerProps) => {
    const [show, setShow] = useState<boolean[]>([]);

    useEffect(() => {
        setShow(new Array(workoutRecords.length).fill(false));
    }, [workoutRecords]);

    const toggleVisibility = (index: number) => {
        setShow(prevShow => {
            const newShow = [...prevShow];
            newShow[index] = !newShow[index];
            return newShow;
        });
    };
    
    return (
        <div className="w-full p-6">
            <h1 className="text-center text-2xl mb-10">Workout Tracker</h1>
            {workoutRecords.map((workoutRecord, index) => (
                <div key={workoutRecord.id} className="mb-10">
                    <div
                        className="cursor-pointer flex items-center gap-x-4"
                        onClick={() => toggleVisibility(index)}
                    >
                        <span>{workoutRecord.date} - {workoutRecord.title}</span>
                        <span
                            className={`transition ease-in-out duration-[250ms] ${show[index] ? "rotate-0" : "-rotate-90"}`}
                        >
                            ▼
                        </span>
                    </div>
                    <div
                        className={`transition-all ease-in-out duration-300 overflow-hidden ${show[index] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                    >
                        <ul className="mt-2">
                            {workoutRecord.exercises.map(exercise => (
                                <li key={exercise.id} className="list-disc list-inside">
                                    {exercise.name} {exercise.sets ? `${exercise.sets} x ${exercise.reps}` : exercise.duration}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WorkoutTracker;

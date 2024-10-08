import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { createWorkout, updateWorkout, deleteWorkout } from "../reducers/workoutReducer";
import { Days, NewWorkout, Workout } from "../types";
import WorkoutForm from "../components/WorkoutForm";
import { Button, Divider, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface WorkoutsProps {
    workouts: Workout[];
}

const Workouts = ({ workouts }: WorkoutsProps) => {
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [workoutToEdit, setWorkoutToEdit] = useState<Workout | null>(null);

    const dispatch = useAppDispatch();

    const openForm = () => {
        setIsEditMode(false);
        setWorkoutToEdit(null);
        setFormOpen(true);
    }

    const closeForm = () => setFormOpen(false);

    const submitWorkout = (values: NewWorkout) => {
        if (isEditMode && workoutToEdit) {
            dispatch(updateWorkout({ ...workoutToEdit, ...values }));
        }
        else {
            dispatch(createWorkout(values));
        }
        closeForm();
    };

    const editWorkout = (workout: Workout) => {
        setWorkoutToEdit(workout);
        setIsEditMode(true);
        setFormOpen(true);
    };

    const removeWorkout = (workout: Workout) => {
        dispatch(deleteWorkout(workout.id));
    };

    return (
        <div className="w-full px-8 py-4">
            <ul>
                {Object.values(Days).map(day => (
                    <li key={day} className="flex flex-col gap-2 pb-4">
                        <h1 className="text-2xl">{day}</h1> 
                        {workouts.map(workout => {
                            if (workout.day === day) {
                                return (
                                    <div key={workout.id} className="flex gap-2">
                                        <Link 
                                            to={`/workouts/${workout.id}`}
                                            className="w-full text-center p-1 border border-[#dbd0d0] border-opacity-50 rounded-[0.25rem] hover:border-opacity-100
                                            transition ease-in-out duration-[250ms] bg-white bg-opacity-0 hover:bg-opacity-[0.02]"
                                        >
                                            {workout.title}
                                        </Link>
                                        <Button variant="outlined" className="w-10" onClick={() => editWorkout(workout)}>
                                            <EditIcon />
                                        </Button>
                                        <Button variant="outlined" className="w-10" onClick={() => removeWorkout(workout)}>
                                            <DeleteForeverIcon />
                                        </Button>
                                    </div>
                                )
                            }
                        })}
                        <Divider orientation="horizontal" sx={{ backgroundColor: 'black' }} />
                    </li>
                ))}
            </ul>
            <Button variant="outlined" className="w-fit" onClick={openForm}>+ add workouts</Button>

            <Modal
                open={formOpen}
                onClose={closeForm}
                aria-labelledby="modal-workout-form-title"
                aria-describedby="modal-workout-form-description"
            >
                <WorkoutForm
                    onSubmit={submitWorkout}
                    workoutToEdit={workoutToEdit}
                    isEditMode={isEditMode}
                />
            </Modal>
        </div>
    );
};

export default Workouts;

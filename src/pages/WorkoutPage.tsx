import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { addExercise, updateExercise, deleteExercise } from "../reducers/workoutReducer";
import { Exercise, NewExercise, Workout, NewWorkoutRecord } from "../types";
import ExerciseForm from "../components/ExerciseForm";
import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal, InputAdornment } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { createWorkoutRecord } from "../reducers/workoutRecordReducer";
import { customDateFormat } from "../utils";

interface WorkoutPageProps {
    workout: Workout | null | undefined;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        borderColor: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: theme.palette.common.white,
        borderColor: theme.palette.common.black,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        color: theme.palette.common.white,
    },
}));

const WorkoutPage = ({ workout }: WorkoutPageProps) => {
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [isAddingExercise, setIsAddingExercise] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [exerciseToEdit, setExerciseToEdit] = useState<Exercise | null>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const openForm = () => {
        setIsEditMode(false);
        setExerciseToEdit(null);
        setFormOpen(true);
    }

    const closeForm = () => setFormOpen(false);

    const submitExercise = async (values: NewExercise) => {
        setIsAddingExercise(true);
        if (workout) {
            try {
                if (isEditMode && exerciseToEdit) {
                    await dispatch(updateExercise(workout.id, { ...exerciseToEdit, ...values }));
                }
                else {
                    await dispatch(addExercise(workout.id, values));
                }
                closeForm();
            }
            catch (error) {
                console.error('Failed to add exercise:', error);
            }
            finally {
                setIsAddingExercise(false);
            }
        }
    };

    const editExercise = (exercise: Exercise) => {
        setExerciseToEdit(exercise);
        setIsEditMode(true);
        setFormOpen(true);
    };

    const removeExercise = (exerciseId: string) => {
        if (workout) {
            dispatch(deleteExercise(workout.id, exerciseId));
        }
    };

    const recordWorkout = () => {
        if (workout) {
            const exercises = [];
            const date = new Date();

            for (let i = 0; i < workout.exercises.length; i++) {
                const sets = (document.getElementById(`txt-sets-${workout.exercises[i].id}`) as HTMLInputElement)?.value;
                const reps = (document.getElementById(`txt-reps-${workout.exercises[i].id}`) as HTMLInputElement)?.value;
                const duration = (document.getElementById(`txt-duration-${workout.exercises[i].id}`) as HTMLInputElement)?.value + ' min';
                const weight = (document.getElementById(`txt-weight-${workout.exercises[i].id}`) as HTMLInputElement)?.value + ' kg';

                const exercise: NewExercise = {
                    name: workout.exercises[i].name,
                    sets,
                    reps,
                    duration,
                    weight
                };

                exercises.push(exercise);
            }

            const workoutToRecord: NewWorkoutRecord = {
                title: workout.title,
                day: workout.day,
                date: customDateFormat(date),
                exercises
            };

            dispatch(createWorkoutRecord(workoutToRecord));
            navigate('/workouts');
        }
        else {
            throw new Error('No workout to record');
        }
    };

    if (workout === null) {
        return <div>No workout found</div>
    }
    else if (workout === undefined || isAddingExercise) {
        return <div>Loading...</div>
    }
    else {
        return (
            <div className="w-full p-6">
                <ArrowBackIosNewIcon className="cursor-pointer float-start" onClick={() => navigate('/workouts')} />
                <h2 className="text-center text-2xl mb-10">{workout.title}</h2>
                <div className="flex justify-center">
                    <TableContainer component={Paper} sx={{ minWidth: 650, maxWidth: 1200 }}>
                        <Table sx={{ minWidth: 650, maxWidth: 1200 }} size="small" aria-label='workout details' className='bg-[#474747]'>
                            <TableHead>
                                <TableRow>
                                    {[
                                        "Exercise",
                                        "Sets",
                                        "Reps",
                                        "Duration",
                                        "Weight",
                                        "Actual Sets",
                                        "Actual Reps",
                                        "Actual Duration",
                                        "Actual Weight"
                                    ].map((heading, index) => (
                                        <StyledTableCell
                                            key={heading}
                                            align={index >= 5 ? "right" : "left"} // align right for last 4 columns
                                            sx={index === 5 ? { borderLeft: '1px solid', borderColor: 'black' } : {}}
                                        >
                                            {heading}
                                        </StyledTableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {workout.exercises.map(exercise => (
                                    <StyledTableRow
                                        key={exercise.id ?? `temp-${exercise.name}`}
                                    >
                                        <StyledTableCell component="th" scope="exercise">
                                            <EditIcon className="cursor-pointer me-2" onClick={() => editExercise(exercise)} />
                                            <DeleteForeverIcon className="cursor-pointer me-2" onClick={() => removeExercise(exercise.id ?? '')} />
                                            {exercise.name || 'Loading...'}
                                        </StyledTableCell>
                                        <StyledTableCell>{exercise.sets || '-'}</StyledTableCell>
                                        <StyledTableCell>{exercise.reps || '-'}</StyledTableCell>
                                        <StyledTableCell>{exercise.duration || '-'}</StyledTableCell>
                                        <StyledTableCell>{exercise.weight || '-'}</StyledTableCell>
                                        <StyledTableCell align="right" sx={{ borderLeft: '1px solid' }}>
                                            <TextField id={`txt-sets-${exercise.id}`} variant="outlined" size="small" className="w-20" />
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <TextField id={`txt-reps-${exercise.id}`} variant="outlined" size="small" className="w-20" />
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <TextField
                                                id={`txt-duration-${exercise.id}`}
                                                variant="outlined"
                                                size="small"
                                                className="w-20"
                                                slotProps={{
                                                    input: {
                                                        endAdornment: <InputAdornment position="end">min</InputAdornment>
                                                    },
                                                }}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <TextField
                                                id={`txt-weight-${exercise.id}`}
                                                variant="outlined"
                                                size="small"
                                                className="w-20"
                                                slotProps={{
                                                    input: {
                                                        endAdornment: <InputAdornment position="end" sx={{ color: 'white' }}>kg</InputAdornment>,
                                                    },
                                                }}
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="flex justify-center">
                    <Button variant="outlined" sx={{ marginTop: '1rem', marginRight: '1rem', width: 'fit-content' }} onClick={openForm}>add exercise</Button>
                    <Button variant="contained" sx={{ marginTop: '1rem', color: 'black', width: 'fit-content' }} onClick={recordWorkout}>record</Button>
                </div>

                <Modal
                    open={formOpen}
                    onClose={closeForm}
                    aria-labelledby="modal-exercise-form-title"
                    aria-describedby="modal-exercise-form-description"
                >
                    <ExerciseForm
                        onSubmit={submitExercise}
                        exerciseToEdit={exerciseToEdit}
                        isEditMode={isEditMode}
                    />
                </Modal>
            </div>
        );
    }
};

export default WorkoutPage;

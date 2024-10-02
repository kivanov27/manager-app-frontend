import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewExercise, Workout } from "../types";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper, TextField, Button, Modal } from "@mui/material";
import ExerciseForm from "../components/ExerciseForm";
import { useAppDispatch } from "../hooks";
import { addExercise } from "../reducers/workoutReducer";

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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const WorkoutPage = ({ workout }: WorkoutPageProps) => {
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [isAddingExercise, setIsAddingExercise] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const openForm = () => setFormOpen(true);
    const closeForm = () => setFormOpen(false);

    const submitExercise = async (values: NewExercise) => {
        setIsAddingExercise(true);
        if (workout) {
            try {
                await dispatch(addExercise(workout.id, values));
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

    if (workout === null) {
        return <div>No workout found</div>
    }
    else if (workout === undefined || isAddingExercise) {
        return <div>Loading...</div>
    }
    else {
        return(
            <div className="w-full p-6">
                <ArrowBackIosNewIcon className="cursor-pointer" onClick={() => navigate('/workouts')} />
                <h2 className="text-center text-2xl mb-10">{workout.title}</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label='workout details' className='bg-[#474747]'>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Exercise</StyledTableCell>
                                <StyledTableCell>Sets</StyledTableCell>
                                <StyledTableCell>Reps</StyledTableCell>
                                <StyledTableCell>Duration</StyledTableCell>
                                <StyledTableCell>Weight</StyledTableCell>
                                <StyledTableCell align="right">Actual Sets</StyledTableCell>
                                <StyledTableCell align="right">Actual Reps</StyledTableCell>
                                <StyledTableCell align="right">Actual Duration</StyledTableCell>
                                <StyledTableCell align="right">Actual Weight</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workout.exercises.map(exercise => (
                                <StyledTableRow 
                                    key={exercise.id ?? `temp-${exercise.name}`} 
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell component="th" scope="exercise">
                                        {exercise.name}
                                    </StyledTableCell>
                                    <StyledTableCell>{exercise.sets || '-'}</StyledTableCell>
                                    <StyledTableCell>{exercise.reps || '-'}</StyledTableCell>
                                    <StyledTableCell>{exercise.duration || '-'}</StyledTableCell>
                                    <StyledTableCell>{exercise.weight || '-'}</StyledTableCell>
                                    <StyledTableCell align="right">
                                        <TextField id="txt-sets" variant="outlined" className="w-20" />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <TextField id="txt-reps" variant="outlined" className="w-20" />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <TextField id="txt-duration" variant="outlined" className="w-20" />
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <TextField id="txt-weight" variant="outlined" className="w-20" />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="outlined" sx={{ marginTop: '1rem', marginRight: '1rem' }} onClick={openForm}>add exercise</Button>
                <Button variant="contained" sx={{ marginTop: '1rem', color: 'black' }}>record</Button>

                <Modal
                    open={formOpen}
                    onClose={closeForm}
                    aria-labelledby="modal-exercise-form-title"
                    aria-describedby="modal-exercise-form-description"
                >
                    <ExerciseForm onSubmit={submitExercise} />
                </Modal>
            </div>
        );
    }
};

export default WorkoutPage;

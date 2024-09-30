import { Workout } from "../types";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface WorkoutPageProps {
    workout: Workout | null | undefined;
}

const createData = ( name: string, sets: string, reps: string, duration: string, weight: string) => {
    return { name, sets, reps, duration, weight };
};

const rows = [
    createData('push up', '10', '10', '5min', '7kg')
];

const WorkoutPage = ({ workout }: WorkoutPageProps) => {
    const navigate = useNavigate();

    if (workout === null) {
        return <div>No workout found</div>
    }
    else if (workout === undefined) {
        return <div>Loading...</div>
    }
    else {
        return(
            <div className="w-full p-6">
                <ArrowBackIosNewIcon className="cursor-pointer" onClick={() => navigate('/workouts')} />
                <h2 className="text-center text-2xl mb-10">{workout.title}</h2>
                <ul>
                    {workout.exercises.map(exercise => (
                        <li 
                            key={exercise.id}
                            className="list-disc list-inside"
                        >
                            {exercise.name} {exercise.sets}
                        </li>
                    ))}
                </ul>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label='workout details' className='bg-[#474747]'>
                        <TableHead className="text-white">
                            <TableRow>
                                <TableCell className="text-white">Exercise</TableCell>
                                <TableCell align="right">Sets</TableCell>
                                <TableCell align="right">Reps</TableCell>
                                <TableCell align="right">Duration</TableCell>
                                <TableCell align="right">Weight</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="right">{row.sets}</TableCell>
                                    <TableCell align="right">{row.reps}</TableCell>
                                    <TableCell align="right">{row.duration}</TableCell>
                                    <TableCell align="right">{row.weight}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
};

export default WorkoutPage;

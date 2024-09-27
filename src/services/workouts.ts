import axios from "axios";
import { Workout, Exercise, NewWorkout, NewExercise } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
    const { data } = await axios.get<Workout[]>(`${apiBaseUrl}/workouts`);
    return data;
};

const getOne = async (id: string) => {
    const { data } = await axios.get<Workout>(`${apiBaseUrl}/workouts/${id}`);
    return data;
};

const create = async (object: NewWorkout) => {
    const { data } = await axios.post<Workout>(`${apiBaseUrl}/workouts`, object);
    return data;
};

const addExercise = async (workoutId: string, object: NewExercise) => {
    const { data } = await axios.post<Exercise>(`${apiBaseUrl}/workouts/${workoutId}/exercises`, object);
    return data;
}

const workoutService = { getAll, getOne, create, addExercise };
export default workoutService;

import axios from "axios";
import { Workout, NewWorkout, NewExercise, Exercise } from "../types";
import { apiBaseUrl } from "../constants";
import { checkError } from "../utils";

const getAll = async () => {
    try {
        const { data } = await axios.get<Workout[]>(`${apiBaseUrl}/workouts`);
        return data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const getOne = async (id: string) => {
    try {
        const { data } = await axios.get<Workout>(`${apiBaseUrl}/workouts/${id}`);
        return data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const create = async (object: NewWorkout) => {
    try {
        const { data } = await axios.post<Workout>(`${apiBaseUrl}/workouts`, object);
        return data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const update = async (id: string, updatedWorkout: Workout) => {
    try {
        const response = await axios.put<Workout>(`${apiBaseUrl}/workouts/${id}`, updatedWorkout);
        return response.data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const remove = async (id: string) => {
    try {
        await axios.delete(`${apiBaseUrl}/workouts/${id}`);
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const createExercise = async (workoutId: string, object: NewExercise) => {
    try {
        const { data } = await axios.post<Workout>(`${apiBaseUrl}/workouts/${workoutId}/exercises`, object);
        return data.exercises.pop();
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const updateExercise = async (workoutId: string, exercise: Exercise) => {
    try {
        const response = await axios.put<Workout>(`${apiBaseUrl}/workouts/${workoutId}/exercises/${exercise.id}`, exercise);
        return response.data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const removeExercise = async (workoutId: string, exerciseId: string) => {
    try {
        const response = await axios.delete(`${apiBaseUrl}/workouts/${workoutId}/exercises/${exerciseId}`);
        return response.data;
    }
    catch (error: unknown) {
        checkError(error);
    }
}

const workoutService = { 
    getAll, 
    getOne, 
    create, 
    update, 
    remove,
    createExercise, 
    updateExercise,
    removeExercise
};

export default workoutService;
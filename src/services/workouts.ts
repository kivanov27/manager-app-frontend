import axios from "axios";
import { Workout, NewWorkout, NewExercise, Exercise } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
    try {
        const { data } = await axios.get<Workout[]>(`${apiBaseUrl}/workouts`);
        return data;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('AxiosError:', error.response?.data || error.message);
            throw error;
        }
        else if (error instanceof Error) {
            console.error('Error getting workouts:', error.message);
            throw error;
        }
        else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
};

const getOne = async (id: string) => {
    try {
        const { data } = await axios.get<Workout>(`${apiBaseUrl}/workouts/${id}`);
        return data;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('AxiosError:', error.response?.data || error.message);
            throw error;
        }
        else if (error instanceof Error) {
            console.error('Error getting workout:', error.message);
            throw error;
        }
        else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
};

const create = async (object: NewWorkout) => {
    try {
        const { data } = await axios.post<Workout>(`${apiBaseUrl}/workouts`, object);
        return data;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('AxiosError:', error.response?.data || error.message);
            throw error;
        }
        else if (error instanceof Error) {
            console.error('Error creating workout:', error.message);
            throw error;
        }
        else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
};

const createExercise = async (workoutId: string, object: NewExercise) => {
    try {
        const { data } = await axios.post<Workout>(`${apiBaseUrl}/workouts/${workoutId}/exercises`, object);
        return data.exercises.pop();
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('AxiosError:', error.response?.data || error.message);
            throw error;
        }
        else if (error instanceof Error) {
            console.error('Error adding exercise:', error.message);
            throw error;
        }
        else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
};

const update = async (id: string, updatedWorkout: Workout) => {
    try {
        const response = await axios.put<Workout>(`${apiBaseUrl}/workouts/${id}`, updatedWorkout);
        return response.data;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('AxiosError:', error.response?.data || error.message);
            throw error;
        }
        else if (error instanceof Error) {
            console.error('Error adding exercise:', error.message);
            throw error;
        }
        else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
};

const updateExercise = async (workoutId: string, exercise: Exercise) => {
    try {
        const response = await axios.put<Workout>(`${apiBaseUrl}/workouts/${workoutId}/exercises/${exercise.id}`, exercise);
        return response.data;
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('AxiosError:', error.response?.data || error.message);
            throw error;
        }
        else if (error instanceof Error) {
            console.error('Error adding exercise:', error.message);
            throw error;
        }
        else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
};

const workoutService = { getAll, getOne, create, createExercise, update, updateExercise };
export default workoutService;

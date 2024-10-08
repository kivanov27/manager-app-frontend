import workoutService from "../services/workouts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { Workout, Exercise, NewWorkout, NewExercise } from "../types";

type WorkoutState = Workout[];
const initialState: WorkoutState = [];

const workoutSlice = createSlice({
    name: 'workouts',
    initialState,
    reducers: {
        setWorkouts(_state, action: PayloadAction<Workout[] | undefined>) {
            return action.payload;
        },
        appendWorkout(state, action: PayloadAction<Workout | undefined>) {
            if (action.payload) {
                state.push(action.payload);
            }
        },
        updateWorkoutState(state, action: PayloadAction<{ id: string, workout: Workout }>) {
            const index = state.findIndex(w => w.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload.workout;
            }
        },
        removeWorkout(state, action: PayloadAction<string>) {
            return state.filter(w => w.id !== action.payload);
        },
        appendExercise(state, action: PayloadAction<{workoutId: string, addedExercise: Exercise}>) {
            const { workoutId, addedExercise } = action.payload;
            const workout = state.find(w => w.id === workoutId);
            if (workout) {
                workout.exercises.push(addedExercise);
            }
        },
        updateExerciseState(state, action: PayloadAction<{ workoutId: string, exercises: Exercise[] }>) {
            const { workoutId, exercises } = action.payload;
            const workout = state.find(w => w.id === workoutId);
            if (workout) {
                workout.exercises = exercises;
            }
        },
        removeExercise(state, action: PayloadAction<{ workoutId: string, exerciseId: string}>) {
            const { workoutId, exerciseId } = action.payload;
            const workout = state.find(w => w.id === workoutId);
            if (workout) {
                workout.exercises = workout.exercises.filter(e => e.id !== exerciseId);
            }
        }
    }
});

export const { 
    setWorkouts, 
    appendWorkout, 
    updateWorkoutState, 
    removeWorkout,
    appendExercise, 
    updateExerciseState,
    removeExercise
} = workoutSlice.actions;

export const initializeWorkouts = () => {
    return async (dispatch: AppDispatch) => {
        const workouts = await workoutService.getAll();
        dispatch(setWorkouts(workouts));
    };
};

export const createWorkout = (data: NewWorkout) => {
    return async (dispatch: AppDispatch) => {
        const newWorkout = await workoutService.create(data);
        dispatch(appendWorkout(newWorkout));
    };
};

export const updateWorkout = (updatedWorkout: Workout) => {
    return async (dispatch: AppDispatch) => {
        try {
            const workout = await workoutService.update(updatedWorkout.id, updatedWorkout);
            if (workout) {
                dispatch(updateWorkoutState({ id: updatedWorkout.id, workout }));
            }
        }
        catch (error) {
            console.error('Failed to update:', error);
            throw error;
        }
    };
};

export const deleteWorkout = (workoutId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await workoutService.remove(workoutId);
            dispatch(removeWorkout(workoutId));
        }
        catch (error) {
            console.error('Failed to delete workout:', error);
            throw error;
        }
    };
};

export const addExercise = (workoutId: string, data: NewExercise) => {
    return async (dispatch: AppDispatch) => {
        try {
            const addedExercise = await workoutService.createExercise(workoutId, data);
            if (addedExercise) {
                dispatch(appendExercise({workoutId, addedExercise}));
            }
        }
        catch (error) {
            console.error('Failed to add exercise:', error);
            throw error;
        }
    };
};

export const updateExercise = (workoutId: string, updatedExercise: Exercise) => {
    return async (dispatch: AppDispatch) => {
        try {
            const workout = await workoutService.updateExercise(workoutId, updatedExercise);
            if (workout) {
                dispatch(updateExerciseState({ workoutId, exercises: workout.exercises }));
            }
        }
        catch (error) {
            console.error('Failed to update:', error);
            throw error;
        }
    };
};

export const deleteExercise = (workoutId: string, exerciseId: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            await workoutService.removeExercise(workoutId, exerciseId);
            dispatch(removeExercise({ workoutId, exerciseId }));
        }
        catch (error) {
            console.error('Failed to delete exercise:', error);
            throw error;
        }
    };
};

export const selectWorkouts = (state: RootState) => state.workouts;

export default workoutSlice.reducer;

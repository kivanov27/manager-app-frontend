import workoutService from "../services/workouts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { NewWorkout, Workout } from "../types";
// import RootState if need to type selector functions

type WorkoutState = Workout[];
const initialState: WorkoutState = [];

const workoutSlice = createSlice({
    name: 'workouts',
    initialState,
    reducers: {
        setWorkouts(_state, action: PayloadAction<Workout[]>) {
            return action.payload;
        },
        appendWorkout(state, action: PayloadAction<Workout>) {
            state.push(action.payload);
        }
    }
});

export const { setWorkouts, appendWorkout } = workoutSlice.actions;

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

export default workoutSlice.reducer;

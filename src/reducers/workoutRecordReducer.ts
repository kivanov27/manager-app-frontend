import workoutRecordService from "../services/workoutRecords";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { NewWorkoutRecord, WorkoutRecord } from "../types";

type WorkoutRecordState = WorkoutRecord[];
const initialState: WorkoutRecordState = [];

const workoutRecordSlice = createSlice({
    name: 'workoutRecords',
    initialState,
    reducers: {
        setWorkoutRecords(_state, action: PayloadAction<WorkoutRecord[] | undefined>) {
            return action.payload;
        },
        appendWorkoutRecord(state, action: PayloadAction<WorkoutRecord | undefined>) {
            if (action.payload) {
                state.push(action.payload);
            }
        },
        updateWorkoutRecordState(state, action: PayloadAction<{ id: string, workout: WorkoutRecord }>) {
            const index = state.findIndex(w => w.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload.workout;
            }
        },
        removeWorkoutRecord(state, action: PayloadAction<string>) {
            return state.filter(w => w.id !== action.payload);
        }
    }
});

export const { 
    setWorkoutRecords, 
    appendWorkoutRecord, 
    updateWorkoutRecordState, 
    removeWorkoutRecord 
} = workoutRecordSlice.actions;

export const initializeWorkoutRecords = () => {
    return async (dispatch: AppDispatch) => {
        const workoutRecords = await workoutRecordService.getAll();
        dispatch(setWorkoutRecords(workoutRecords));
    };
};

export const createWorkoutRecord = (data: NewWorkoutRecord) => {
    return async (dispatch: AppDispatch) => {
        const newWorkoutRecord = await workoutRecordService.create(data);
        dispatch(appendWorkoutRecord(newWorkoutRecord));
    };
};

export const updateWorkoutRecord = (id: string, workoutRecord: WorkoutRecord) => {
    return async (dispatch: AppDispatch) => {
        const updatedWorkoutRecord = await workoutRecordService.update(id, workoutRecord);
        if (updatedWorkoutRecord) {
            dispatch(updateWorkoutRecordState({ id, workout: updatedWorkoutRecord }));
        }
    };
};

export const deleteWorkoutRecord = (id: string) => {
    return async (dispatch: AppDispatch) => {
        await workoutRecordService.remove(id);
        dispatch(removeWorkoutRecord(id));
    };
};

export const selectWorkoutRecords = (state: RootState) => state.workoutRecords;

export default workoutRecordSlice.reducer;

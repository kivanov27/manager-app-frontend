import { habitService } from "../services/habits";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { Habit, NewHabit } from "../types";

type HabitState = Habit[];
const initialState: HabitState = [];

const habitSlice = createSlice({
    name: 'habits',
    initialState,
    reducers: {
        setHabits(_state, action: PayloadAction<Habit[] | undefined>) {
            return action.payload;
        },
        appendHabit(state, action: PayloadAction<Habit | undefined>) {
            if (action.payload) {
                state.push(action.payload);
            }
        },
        updateHabitState(state, action: PayloadAction<{ id: string, habit: Habit }>) {
            const index = state.findIndex(h => h.id === action.payload.id);  
            if (index !== -1) {
                state[index] = action.payload.habit;
            }
        },
        removeHabit(state, action: PayloadAction<string>) {
            return state.filter(h => h.id !== action.payload);
        }
    }
});

export const {
    setHabits,
    appendHabit,
    updateHabitState,
    removeHabit
} = habitSlice.actions;

export const initializeHabits = () => {
    return async (dispatch: AppDispatch) => {
        const habits = await habitService.getAll();
        dispatch(setHabits(habits));
    };
};

export const createHabit = (data: NewHabit) => {
    return async (dispatch: AppDispatch) => {
        const newHabit = await habitService.create(data);
        dispatch(appendHabit(newHabit));
    };
};

export const updateHabit = (id: string, habit: Habit) => {
    return async (dispatch: AppDispatch) => {
        const updatedHabit = await habitService.update(id, habit);
        if (updatedHabit) {
            dispatch(updateHabitState({ id, habit: updatedHabit }));
        }
    };
};

export const deleteHabit = (id: string) => {
    return async (dispatch: AppDispatch) => {
        await habitService.remove(id);
        dispatch(removeHabit(id));
    };
};

export const selectHabits = (state: RootState) => state.habits;

export default habitSlice.reducer;

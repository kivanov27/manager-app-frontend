import { taskService } from "../services/tasks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import { Task, NewTask } from "../types";

type TasksState = Task[];
const initialState: TasksState = [];

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks(_state, action: PayloadAction<Task[] | undefined>) {
            return action.payload;
        },
        appendTask(state, action: PayloadAction<Task | undefined>) {
            if (action.payload) {
                state.push(action.payload);
            }
        },
        updateTaskState(state, action: PayloadAction<{ id: string, task: Task }>) {
            const index = state.findIndex(t => t.id === action.payload.id);  
            if (index !== -1) {
                state[index] = action.payload.task;
            }
        },
        removeTask(state, action: PayloadAction<string>) {
            return state.filter(t => t.id !== action.payload);
        }
    }
});

export const {
    setTasks,
    appendTask,
    updateTaskState,
    removeTask
} = taskSlice.actions;

export const initializeTasks = () => {
    return async (dispatch: AppDispatch) => {
        const tasks = await taskService.getAll();
        dispatch(setTasks(tasks));
    };
};

export const createTask = (data: NewTask) => {
    return async (dispatch: AppDispatch) => {
        const newTask = await taskService.create(data);
        dispatch(appendTask(newTask));
    };
};

export const updateTask = (id: string, task: Task) => {
    return async (dispatch: AppDispatch) => {
        const updatedTask = await taskService.update(id, task);
        if (updatedTask) {
            dispatch(updateTaskState({ id, task: updatedTask }));
        }
    };
};

export const deleteTask = (id: string) => {
    return async (dispatch: AppDispatch) => {
        await taskService.remove(id);
        dispatch(removeTask(id));
    };
};

export const selectTasks = (state: RootState) => state.tasks;

export default taskSlice.reducer;

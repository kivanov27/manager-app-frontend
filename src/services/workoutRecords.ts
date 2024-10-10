import axios from "axios";
import { WorkoutRecord, NewWorkoutRecord } from "../types";
import { apiBaseUrl } from "../constants";
import { checkError } from "../utils";

const getAll = async () => {
    try {
        const { data } = await axios.get<WorkoutRecord[]>(`${apiBaseUrl}/workoutRecords`);
        return data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const getOne = async (id: string) => {
    try {
        const { data } = await axios.get<WorkoutRecord>(`${apiBaseUrl}/workoutRecords/${id}`);
        return data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const create = async (object: NewWorkoutRecord) => {
    try {
        const { data } = await axios.post<WorkoutRecord>(`${apiBaseUrl}/workoutRecords`, object);
        return data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const update = async (id: string, updatedWorkout: WorkoutRecord) => {
    try {
        const { data } = await axios.put<WorkoutRecord>(`${apiBaseUrl}/workoutRecords/${id}`, updatedWorkout);
        return data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const remove = async (id: string) => {
    try {
        await axios.delete(`${apiBaseUrl}/workoutRecords/${id}`);
    }
    catch (error: unknown) {
        checkError(error);
    }
};

export default {
    getAll,
    getOne,
    create,
    update,
    remove
};

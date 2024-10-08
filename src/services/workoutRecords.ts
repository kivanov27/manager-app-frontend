import axios from "axios";
import { Workout, NewWorkout } from "../types";
import { apiBaseUrl } from "../constants";
import { checkError } from "../utils";

const getAll = async () => {
    try {
        const { data } = await axios.get<Workout[]>(`${apiBaseUrl}/workoutRecords`);
        return data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const getOne = async (id: string) => {
    try {
        const { data } = await axios.get<Workout>(`${apiBaseUrl}/workoutRecords/${id}`);
        return data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const create = async (object: NewWorkout) => {
    try {
        const { data } = await axios.post<Workout>(`${apiBaseUrl}/workoutRecords`, object);
        return data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const update = async (id: string, updatedWorkout: Workout) => {
    try {
        const { data } = await axios.put<Workout>(`${apiBaseUrl}/workoutRecords/${id}`, updatedWorkout);
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
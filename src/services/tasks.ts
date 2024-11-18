import axios from 'axios';
import { Task, NewTask } from '../types';
import { apiBaseUrl } from '../constants';
import { checkError } from '../utils';

const getAll = async () => {
    try {
        const response = await axios.get<Task[]>(`${apiBaseUrl}/tasks`);
        return response.data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const getOne = async (id: string) => {
    try {
        const response = await axios.get<Task>(`${apiBaseUrl}/tasks/${id}`);
        return response.data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const create = async (newTask: NewTask) => {
    try {
        const response = await axios.post<Task>(`${apiBaseUrl}/tasks`, newTask);
        return response.data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const update = async (id: string, newTask: NewTask) => {
    try {
        const response = await axios.put<Task>(`${apiBaseUrl}/tasks/${id}`, newTask);
        return response.data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const remove = async (id: string) => {
    try {
        await axios.delete(`${apiBaseUrl}/tasks/${id}`);
    }
    catch (error: unknown) {
        checkError(error);
    }
};

export const taskService = { getAll, getOne, create, update, remove };

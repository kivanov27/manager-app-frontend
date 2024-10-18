import axios from 'axios';
import { Habit, NewHabit } from '../types';
import { apiBaseUrl } from '../constants';
import { checkError } from '../utils';

const getAll = async () => {
    try {
        const response = await axios.get<Habit[]>(`${apiBaseUrl}/habits`);
        return response.data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const getOne = async (id: string) => {
    try {
        const response = await axios.get<Habit>(`${apiBaseUrl}/habits/${id}`);
        return response.data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const create = async (newHabit: NewHabit) => {
    try {
        const response = await axios.post<Habit>(`${apiBaseUrl}/habits`, newHabit);
        return response.data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const update = async (id: string, newHabit: NewHabit) => {
    try {
        const response = await axios.put<Habit>(`${apiBaseUrl}/habits/${id}`, newHabit);
        return response.data;
    }
    catch (error: unknown) {
        checkError(error);
    }
};

const remove = async (id: string) => {
    try {
        await axios.delete(`${apiBaseUrl}/habits/${id}`);
    }
    catch (error: unknown) {
        checkError(error);
    }
};

export const habitService = { getAll, getOne, create, update, remove };

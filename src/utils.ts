import axios from 'axios';

export const checkError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.error('AxiosError:', error.response?.data || error.message);
        throw error;
    }
    else if (error instanceof Error) {
        console.error('Error:', error.message);
        throw error;
    }
    else {
        console.error('Unknown error:', error);
        throw new Error('An unknown error occurred');
    }
};
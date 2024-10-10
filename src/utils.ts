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

export const customDateFormat = (date: Date): string => {
    const day = String(date.getDay()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, '0');
    const mins = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}-${month}-${year} ${hours}:${mins}`;
};

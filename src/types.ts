export enum Days {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
    Sunday = 'Sunday'
}

export enum Months {
    January = 'January',
    February = 'February',
    March = 'March',
    April = 'April',
    May = 'May',
    June = 'June',
    July = 'July',
    August = 'August',
    September = 'September',
    October = 'October',
    November = 'November',
    December = 'December'
}

export interface Workout {
    id: string;
    title: string;
    day: Days;
    exercises: Exercise[];
}

export interface NewWorkout {
    title: string;
    day: Days;
    exercises: NewExercise[];
}

export interface Exercise {
    id?: string;
    name: string;
    sets?: string;
    reps?: string;
    duration?: string;
    weight?: string;
}

export type NewExercise = Omit<Exercise, 'id'>;

export interface WorkoutRecord extends Workout {
    date: string;
}

export interface NewWorkoutRecord extends NewWorkout {
    date: string;
}

export interface HabitDay {
    date: Date;
    completed: boolean;
}

export interface Habit {
    id: string;
    name: string;
    days: HabitDay[];
}

export type NewHabit = Omit<Habit, 'id'>;

export enum Days {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
    Sunday = 'Sunday'
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

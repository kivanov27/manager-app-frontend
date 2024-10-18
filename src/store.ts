import { configureStore } from "@reduxjs/toolkit";
import workoutReducer from "./reducers/workoutReducer";
import workoutRecordReducer from "./reducers/workoutRecordReducer";
import habitReducer from "./reducers/habitReducer";

const store = configureStore({
    reducer: {
        workouts: workoutReducer,
        workoutRecords: workoutRecordReducer,
        habits: habitReducer
    }
});

export default store;
// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

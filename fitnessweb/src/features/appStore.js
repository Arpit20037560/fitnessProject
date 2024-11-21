import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; 
import recordReducer from "./recordSlice";
import workoutReducer from "./workoutsSlice"

const store = configureStore({
  reducer: {
    user: userReducer, 
    workout: workoutReducer,
    record: recordReducer
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
  name: "workouts",
  initialState: [],

  reducers: {
    createWorkouts: (state, action) => {
      state.push(action.payload);
    },
    getWorkoutDetails: (state, action) => {
      return action.payload; 
    },
    getWorkoutDetailsById: (state, action) => {
      return state.find((workout) => workout.id == action.payload);
    },
    deleteWorkoutDetailsById: (state, action) => {
      return state.filter((workout) => workout.id != action.payload);
    },
    deleteWorkoutDetails: (state, action) => {
      return []; 
    },
    editWorkoutById: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.findIndex((workout) => workout.id == id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
      }
    },
  },
});

export const {
  createWorkouts,
  getWorkoutDetails,
  getWorkoutDetailsById,
  deleteWorkoutDetailsById,
  deleteWorkoutDetails,
  editWorkoutById,
} = workoutSlice.actions;

export default workoutSlice.reducer;

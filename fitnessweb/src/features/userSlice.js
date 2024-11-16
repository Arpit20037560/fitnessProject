import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "user",
  initialState: null, 

  reducers: {
    loggedInUser: (state, action) => {
      return action.payload; 
    },
    signUpUser: (state, action) => {
      return action.payload; 
    },
    logOutUser: () => {
      return null; 
    }
  }
});

export const { loggedInUser, signUpUser, logOutUser } = userSlice.actions; 

export default userSlice.reducer; 

import { createSlice } from "@reduxjs/toolkit";

const recordSlice = createSlice({
    name:"records",
    initialState:[],

    reducers:{
        createRecord:(state,action)=>{
            state.push(action.payload);
        },
        getAllRecords:(state,action)=>{
            return state;
        },
        getRecordById:(state,action)=>{
            return state.find((record)=>record.id==action.payload)
        },
        deleteRecordById:(state,action)=>
        {
            return state.filter((record)=>record.id!=action.payload);
        },
        clearAllRecords:()=>
        {
            return [];
        },
        editRecordById:(state,action)=>
        {
            const { id, updates } = action.payload; // Payload should contain `id` and `updates`
            const index = state.findIndex((record) => record.id === id);
            if (index !== -1) 
            {
              state[index] = { ...state[index], ...updates }; // Merge the updates with the existing record
            }
          },
    },
});

export const {
    createRecord,
    getAllRecords,
    getRecordById,
    deleteRecordById,
    clearAllRecords,
    editRecordById,
  } = recordSlice.actions;
  
  export default recordSlice.reducer;
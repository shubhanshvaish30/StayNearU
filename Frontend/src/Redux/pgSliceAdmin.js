import { createSlice } from "@reduxjs/toolkit";

const initialState={
    pgs:[],
    totalEarning:0,
}

export const pgSliceAdmin=createSlice({
    name:'pg',
    initialState,
    reducers:{
        setList:(state,action)=>{
            state.pgs=action.payload;
        }
    }
})

export const {setList}=pgSliceAdmin.actions;
export default pgSliceAdmin.reducer;
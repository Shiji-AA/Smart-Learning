import { createSlice } from "@reduxjs/toolkit";

export interface SelectedChat{ 
    id : string,
    participants:[],
    messages:[], 
}

export interface ChatState{
    selectedchat : SelectedChat | null;
}


const initialState = {
    selectedchat : null,
}

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        setChatInfo :(state,action)=>{
            state.selectedchat=action.payload;
        }
    }
})


export const  {setChatInfo} = chatSlice.actions;
export default chatSlice.reducer;
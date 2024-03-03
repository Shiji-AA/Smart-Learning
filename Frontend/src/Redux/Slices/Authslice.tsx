import {createSlice} from '@reduxjs/toolkit';

//represents the structure of user data
export interface UserData{
    name:string,
    email:string,
    phone:string,
    id : string,
    image : string,
    role : string
}

export interface UserState{
    userdata : UserData | null;
}

const initialState :UserState ={
    userdata:null,
}

 const authSlice =createSlice({
    name:"auth",
    initialState,
    reducers:{
    setUserInfo :(state,action)=>{
        state.userdata = action.payload;
    },
    logout:(state)=>{
        state.userdata = null;
    }

    }
})

export const  {setUserInfo,logout} = authSlice.actions;
export default authSlice.reducer;
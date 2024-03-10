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
        localStorage.removeItem("studentToken")
        state.userdata = null;
    },
    updateProfile: (state,action)=>{
        if(state.userdata !==null){
            state.userdata=action.payload;
        }
    }

    }
})

export const  {setUserInfo,logout,updateProfile} = authSlice.actions;
export default authSlice.reducer;
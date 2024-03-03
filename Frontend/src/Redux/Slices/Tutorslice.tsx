import { createSlice } from "@reduxjs/toolkit";


//represents the structure of user data
export interface TutorData{
    tutorName: string;   
    tutorEmail:string ,
    id : string,
    image : string
}
export interface TutorState{
    tutordata : TutorData | null;
}
const initialState : TutorState ={
    tutordata:null,
}

const tutorSlice =createSlice({
    name:'tutor',
    initialState,
    reducers:{

        setTutorInfo:(state,action)=>{
            state.tutordata =action.payload            
        },       
        logout:(state)=>{
            state.tutordata=null;            
        }


    }
})

export const {setTutorInfo,logout} = tutorSlice.actions
export default tutorSlice.reducer;




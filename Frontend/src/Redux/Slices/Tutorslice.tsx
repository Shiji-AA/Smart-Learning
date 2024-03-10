import { createSlice } from "@reduxjs/toolkit";


//represents the structure of user data
export interface TutorData{
    tutorName: string;   
    tutorEmail:string ,
    tutorId : string, 
    image : string,
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
            localStorage.removeItem("tutorToken")
            state.tutordata=null;            
        },
        updateTutorProfile: (state,action)=>{
            if(state.tutordata !==null){
                state.tutordata=action.payload;
            }
        }


    }
})

export const {setTutorInfo,logout,updateTutorProfile} = tutorSlice.actions
export default tutorSlice.reducer;




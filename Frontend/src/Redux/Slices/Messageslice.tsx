import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedMessage { 
    id: string;
    senderId: string;
    receiverId: string;
    message: string;
}

export interface MessageState {
    selectedmessage: SelectedMessage | null;
}

const initialState: MessageState = {
    selectedmessage: null,
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessageInfo: (state, action: PayloadAction<SelectedMessage | null>) => {
            state.selectedmessage = action.payload;
        }
    }
})

export const { setMessageInfo } = messageSlice.actions;
export default messageSlice.reducer;

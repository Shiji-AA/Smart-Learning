import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../Slices/Authslice';
import adminReducer from '../Slices/Adminslice';
import tutorReducer from  '../Slices/Tutorslice';
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";//localStorage
import chatReducer from '../Slices/Chatslice';
import messageReducer from '../Slices/Messageslice';


const persistConfig = {
    storage, //localStorage
    key:"auth"
}
const persistConfigAdmin = {
    storage,
    key:"admin"
}
const persistConfigTutor = {
    storage,
    key:"tutor"
}
const persistConfigChat = {
    storage,
    key:"chat"
}
const persistConfigMessage = {
    storage,
    key:"message"
}
const persistedAuthreducer = persistReducer(persistConfig,authReducer)//persisted version is storing
const persistedAdiminreducer = persistReducer(persistConfigAdmin,adminReducer)
const persistedTutorreducer = persistReducer(persistConfigTutor,tutorReducer)
const persistedChatreducer = persistReducer(persistConfigChat,chatReducer)
const persistedMessagereducer = persistReducer(persistConfigMessage,messageReducer)

 export const store= configureStore({
    reducer:{
        auth :persistedAuthreducer,
        admin :persistedAdiminreducer,
        tutor :persistedTutorreducer,
        chat : persistedChatreducer,
        message:persistedMessagereducer,
    }
    
})
export const persistor=persistStore(store) //for persisting store

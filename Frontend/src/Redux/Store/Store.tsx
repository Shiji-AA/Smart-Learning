import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../Slices/Authslice';
import adminReducer from '../Slices/Adminslice';
import tutorReducer from  '../Slices/Tutorslice';
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";//localStorage


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
const persistedAuthreducer = persistReducer(persistConfig,authReducer)//persisted version is storing
const persistedAdiminreducer = persistReducer(persistConfigAdmin,adminReducer)
const persistedTutorreducer = persistReducer(persistConfigTutor,tutorReducer)

 export const store= configureStore({
    reducer:{
        auth :persistedAuthreducer,
        admin :persistedAdiminreducer,
        tutor :persistedTutorreducer,
    }
    
})
export const persistor=persistStore(store) //for persisting store

import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../Slices/Authslice';
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";//localstorage


const persistConfig = {
    storage,
    key:"auth"
}

const persistedAuthreducer = persistReducer(persistConfig,authReducer)

 export const store= configureStore({
    reducer:{
        auth :persistedAuthreducer,
    }
    
})
export const persistor=persistStore(store)

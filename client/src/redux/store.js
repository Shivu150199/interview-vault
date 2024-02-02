import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userReducer from './user/userSlice'

import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'
 
//combine the reducer for persist so create  a root reduce and then create a persist config and in persist reducer put the both of th things 
const rootReducer = combineReducers({
  user: userReducer,
})
const persistConfig={
  key:'root',
  storage,
  version:1,
}
const persistedReducer=persistReducer(persistConfig,rootReducer)
export const store = configureStore({
  //to use redux persist in place of user reducer
  // reducer: {user:userReducer},//inpalce of this we can use persisted reducer
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>
  getDefaultMiddleware({
    serializableCheck:false,
  })
})
//at last export the persist reducer
export const persistor=persistStore(store)
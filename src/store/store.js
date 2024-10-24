
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './authSlice';

const persistConfig = {
  key: 'root',
  storage,
};


const persistedReducer = persistReducer(persistConfig, authReducer);


const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
});

// Create a persistor
export const persistor = persistStore(store);
export default store;

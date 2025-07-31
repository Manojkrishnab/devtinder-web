import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice';
import connectionsReducer from './slices/connectionsSlice'
import requestsReducer from './slices/requestSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        connections: connectionsReducer,
        requests: requestsReducer
    }
})

export default appStore;
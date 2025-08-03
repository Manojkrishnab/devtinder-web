import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload;
        },
        filterFeed: (state, action) => {
            const newFeed = state.filter(user => user._id !== action.payload);
            return newFeed;
        },
        removeFeed: () => null,
    }
})

export const {addFeed, filterFeed, removeFeed} = feedSlice.actions;
export default feedSlice.reducer;
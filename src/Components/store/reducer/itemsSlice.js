import { createSlice } from '@reduxjs/toolkit';

const initialState = {menuItems: []}

const items = createSlice({
    name: "items",
    initialState,
    reducers: {
        setItems: (state, action) => {
            //console.log("items action :- ", action.payload);
            state.items = action.payload
        }
    }
}) 

export const { setItems } = items.actions

export default items.reducer
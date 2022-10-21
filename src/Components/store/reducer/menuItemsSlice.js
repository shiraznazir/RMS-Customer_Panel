import { createSlice } from '@reduxjs/toolkit';

const initialState = {menuItems: []}

const menuItems = createSlice({
    name: "menuItems",
    initialState,
    reducers: {
        setMenuItems: (state, action) => {
            //console.log("items action :- ", action.payload);
            state.menuItems = action.payload
        }
    }
}) 

export const { setMenuItems } = menuItems.actions

export default menuItems.reducer
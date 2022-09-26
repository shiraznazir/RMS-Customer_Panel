import { createSlice } from "@reduxjs/toolkit"

const initialState = {cart:[]}

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state,action) =>  {
            state.cart = action.payload
        }
    }
})

export const { setCart } = cart.actions

export default cart.reducer
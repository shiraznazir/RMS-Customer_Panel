import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from './reducer/itemsSlice'
import cartSlice from './reducer/cartSlice'

const store = configureStore({
  reducer: { items: itemsSlice, cart: cartSlice },
});

export default store;
import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from './reducer/itemsSlice';
import cartSlice from './reducer/cartSlice';
import userSlice from "./reducer/userSlice";

const store = configureStore({
  reducer: { items: itemsSlice, cart: cartSlice, user: userSlice },
});

export default store;
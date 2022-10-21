import { configureStore } from "@reduxjs/toolkit";
import menuItemsSlice from './reducer/menuItemsSlice';
import cartSlice from './reducer/cartSlice';
import userSlice from "./reducer/userSlice";

const store = configureStore({
  reducer: { menuItems: menuItemsSlice, cart: cartSlice, user: userSlice },
});

export default store;
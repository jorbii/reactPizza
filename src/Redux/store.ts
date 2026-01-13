import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './Slices/filterSlice.ts'
import cartSlice from './Slices/cartsSlice.ts'
import pizzasSlice from './Slices/pizzasSlice.ts'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartSlice,
    pizza: pizzasSlice,
  },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

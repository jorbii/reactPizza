import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './Slices/filterSlice'
import cartSlice from './Slices/cartsSlice'
import pizzasSlice from './Slices/pizzasSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartSlice,
    pizza: pizzasSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

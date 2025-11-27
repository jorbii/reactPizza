import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './Slices/filterSlice'
import cartSlice from './Slices/cartsSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartSlice,
  },
})



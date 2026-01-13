
import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItemType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}

const initialState:CartSliceState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
     
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
            ...action.payload,
          count: 1,
        })
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

  
    minusItem(state,action: PayloadAction<string>){
      const findItem = state.items.find((obj) => obj.id === action.payload)
     
      if (findItem) {
        findItem.count--;
      }

      state.items = state.items.filter((obj) => obj.count !== 0);

      state.totalPrice = state.items.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0
      );
    },
    removeItem(state, action: PayloadAction<string>) {
       state.items = state.items.filter(obj => obj.id !== action.payload);
       state.totalPrice =state.items.reduce((sum,obj) => obj.price * obj.count + sum, 0);
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    
  },
});

export const cartSelektor = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id)

export const {addItem, removeItem,clearItem,minusItem,} = cartSlice.actions;
export default cartSlice.reducer;
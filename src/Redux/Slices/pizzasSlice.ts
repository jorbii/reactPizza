
import { createSlice, createAsyncThunk, PayloadAction,} from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from "axios";


/* 1️⃣ types */
export type FetchPizzasParams = {
  order: string;
  sortBy: String;
  category: string;
  search: string;
  currentPage: number;
};

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
}




/* 2️⃣ async thunk */
export const fetchPizzas = createAsyncThunk<
PizzaItem[],
FetchPizzasParams
>(
  'pizza/fetchPizzasStatus', 
  async(params) => { 
    const { order, sortBy, category, search, currentPage} = params;
    const {data} = await axios.get<PizzaItem[]>(
      `https://68fdc9817c700772bb11ec50.mockapi.io/Items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
     );
    return data;
  }
)


/* 3️⃣ slice */
interface PizzaSliceState {
  items: PizzaItem[];
  status: 'loading' | 'success' | 'error';
}



const initialState: PizzaSliceState = {
  items:[],
  status: 'loading',
  
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },  
  },


  extraReducers: (builder) => {
    builder
    
    .addCase(fetchPizzas.pending,(state) => {
      state.status = 'loading';
      state.items = [];
    })
    .addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    })
    .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
    })
  }
});

export const pizzaSelektor = (state: RootState) => state.pizza;

export const {setItems} = pizzasSlice.actions;
export default pizzasSlice.reducer;
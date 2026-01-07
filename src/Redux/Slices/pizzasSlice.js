
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// бізнес логіка запросу даних і переробка в ссилку для витягнення певной піци
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async({params, thunkApi}) => { 
    const { order, sortBy, category, search, currentPage} = params;
    const {data} = await axios.get(
      `https://68fdc9817c700772bb11ec50.mockapi.io/Items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
     );
    return data;
  }
)

const initialState = {
  items:[],
  status: 'loading',
  
};

const pizzasSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },  
  },
    extraReducers: (builder) => {
      builder
        .addCase(fetchPizzas.pending, (state) => {
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
      });
  },
});

export const pizzaSelektor = (state) => state.pizza;

export const {setItems} = pizzasSlice.actions;
export default pizzasSlice.reducer;
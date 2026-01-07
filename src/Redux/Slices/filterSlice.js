
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  sort: { name: 'популярність', sortProperty: 'rating' },
  searchValue: '',
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
     setSearchvalue(state, action) {
      state.searchValue = action.payload;
    },
    setSort(state, action) {
      // замінюємо весь об'єкт sort однією операцією
      state.sort = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    // для дебагу — скидання
    resetFilters(state) {
      state.categoryId = 0;
      state.sort = initialState.sort;
      state.searchValue = '';
      state.currentPage = 1;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage ?? state.currentPage);
      state.categoryId = Number(action.payload.categoryId ?? state.categoryId);

      if (action.payload.sort) {
        state.sort = action.payload.sort;
      }
    }
  },
});

export const selectSort = (state) => state.filter.sort;
export const selectFilter = (state) => state.filter;

export const {setFilters, setCategoryId, setSort, setSearchValue, setCurrentPage, resetFilters,setSearchvalue } = filterSlice.actions;
export default filterSlice.reducer;



 //setFilters(state,action){
       // state.currentPage = Number(action.payload.currentPage);
      //  state.categoryId = Number(action.payload.categoryId);
      ///  state.sort = action.payload.sort ?? state.sort;
  //  }
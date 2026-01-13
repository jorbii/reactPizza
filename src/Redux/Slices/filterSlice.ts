
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnam {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type Sort = {
   name: string;
   sortProperty: SortPropertyEnam ;
}

interface FilterSliceState { 
  categoryId: number,
  sort: Sort,
  searchValue: string,
  currentPage: number,
}

const initialState:FilterSliceState = {
  categoryId: 0,
  searchValue: '',
  currentPage: 1,
  sort: { 
    name: 'popular', 
    sortProperty: SortPropertyEnam.RATING_DESC, 
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
     setSearchvalue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      // замінюємо весь об'єкт sort однією операцією
      state.sort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    // для дебагу — скидання
    resetFilters(state) {
      state.categoryId = 0;
      state.sort = initialState.sort;
      state.searchValue = '';
      state.currentPage = 1;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage ?? state.currentPage);
      state.categoryId = Number(action.payload.categoryId ?? state.categoryId);

      if (action.payload.sort) {
        state.sort = action.payload.sort;
      }
    }
  },
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const {setFilters, setCategoryId, setSort, setSearchValue, setCurrentPage, resetFilters,setSearchvalue } = filterSlice.actions;
export default filterSlice.reducer;



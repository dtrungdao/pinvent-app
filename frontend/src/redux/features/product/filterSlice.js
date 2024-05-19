import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filtered: []
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    
    FILTER_PRODUCTS(state, action){
        const {products, search} = action.payload;

        const tempProduct = products.filter(
          (product =>
          product.name.toLowerCase().includes(search.toLowerCase())
        ));
        state.filtered = tempProduct;
    },
  }
});

export const {FILTER_PRODUCTS} = filterSlice.actions;

export const selectFiltered = (state) => state.filter.filtered;


export default filterSlice.reducer;
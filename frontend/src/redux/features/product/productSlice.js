import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { productService } from '../../../services/productService';
import {toast} from 'react-toastify'


const initialState = {
    product: null,
    products: [],
    isError: [],
    isSuccess: false,
    isLoading: false,
    message: "",
    outOfStock: 0,
    category: [],
}

//Function create new device
export const createProduct = createAsyncThunk(
    "products/create", 
    async (formData, thunkAPI) => {
        try {
            return await productService.createProduct(formData)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Function get all devices
export const getProducts = createAsyncThunk(
    "products/getAll", 
    async (_, thunkAPI) => {
        try {
            return await productService.getProducts()
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Function delete a device
export const deleteProduct = createAsyncThunk(
    "products/delete", 
    async (id, thunkAPI) => {
        try {
            return await productService.deleteProduct(id)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Function get device information
export const getProduct = createAsyncThunk(
    "products/getProduct",
    async (id, thunkAPI) => {
      try {
        return await productService.getProduct(id)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

//Function update a device
export const updateProduct = createAsyncThunk(
    "products/updateProduct", 
    async ({id}, formData, thunkAPI) => {
        try {
            return await productService.updateProduct(id, formData)
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message
            ) || error.message || error.toString();
            console.log(message)
            return thunkAPI.rejectWithValue(message)
        }
    }
)



const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {

    CALC_CATEGORY(state, action) {
        const products = action.payload
        const array = []
        products.map((item) => {
            const {category} = item;

            return array.push(category)
        });
        const arrayCategory = [...new Set(array)]
        state.category = arrayCategory;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(createProduct.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.products.push(action.payload);
            toast.success("Product added")
        })
        .addCase(createProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload)
        })

        .addCase(getProducts.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.products = action.payload;
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload)
        })

        .addCase(deleteProduct.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Product deleted")
        })
        .addCase(deleteProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload)
        })

        .addCase(getProduct.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.product = action.payload;
          })
          .addCase(getProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
          })

          
        .addCase(updateProduct.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Product updated")
        })
        .addCase(updateProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload)
        })
  }
});

export const {CALC_STORE_VALUE, CALC_CATEGORY} = productSlice.actions

export const selectIsLoading = (state) => state.product.isLoading
export const selectCategory = (state) => state.product.category
export const selectProduct = (state) => state.product.product



export default productSlice.reducer
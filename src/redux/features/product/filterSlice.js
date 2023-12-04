import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts: []
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_PRODUCTS(state, action) {
            const { products, search } = action.payload;
            const tempProducts = products.filter((product) => {
                if (product.name && product.category) {
                    return (
                        product.name.toLowerCase().includes(search.toLowerCase()) ||
                        product.category.toLowerCase().includes(search.toLowerCase())
                    );
                }
                return false
            }
            )

            state.filteredProducts = tempProducts;
        }
    }
});

export const { FILTER_PRODUCTS } = filterSlice.actions
export const selectFilteredProduct = (state) => state.filter.filteredProducts
export default filterSlice.reducer
import {RootState} from "../../../redux/store";

export const productsSelect = ({
    products: (state: RootState) => state.products.products,
    hasPreloaded: (state: RootState) => state.products.hasPreloaded
});

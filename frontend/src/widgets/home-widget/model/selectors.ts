import {RootState} from "../../../redux/store";

export const homeProductsSelect = ({
    bestSelling: (state: RootState) => state.homeProducts.bestSelling,
    hasPreloaded: (state: RootState) => state.homeProducts.hasPreloaded,
    newProducts: (state: RootState) => state.homeProducts.news,
    saleProducts: (state: RootState) => state.homeProducts.sales.products,
    sale: (state: RootState) => state.homeProducts.sales.sale,
});

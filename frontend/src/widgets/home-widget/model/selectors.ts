import {RootState} from "../../../redux/store";

export const homeProductsSelect = ({
    bestSelling: (state: RootState) => state.homeProducts.bestSelling,
    newProducts: (state: RootState) => state.homeProducts.news,
    saleProducts: (state: RootState) => state.homeProducts.sales
});

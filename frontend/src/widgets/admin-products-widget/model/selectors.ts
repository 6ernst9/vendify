import {RootState} from "../../../redux/store";

export const userProductsSelect = ({
    products: (state: RootState) => state.userProducts.products
});

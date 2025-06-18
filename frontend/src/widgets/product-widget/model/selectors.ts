import {RootState} from "../../../redux/store";

export const currentProductSelect = ({
    product: (state: RootState) => state.currentProduct.product,
    related: (state: RootState) => state.currentProduct.related,
    hasPreloaded: (state: RootState) => state.currentProduct.hasPreloaded,
});

import {RootState} from "../../../redux/store";

export const adminProductSelect = ({
    id: (state: RootState) => state.adminProduct.id,
    name: (state: RootState) => state.adminProduct.name,
    stock: (state: RootState) => state.adminProduct.stock,
    reviews: (state: RootState) => state.adminProduct.reviews,
    noReviews: (state: RootState) => state.adminProduct.noReviews,
    images: (state: RootState) => state.adminProduct.images,
    price: (state: RootState) => state.adminProduct.price,
    oldPrice: (state: RootState) => state.adminProduct.oldPrice,
    description: (state: RootState) => state.adminProduct.description,
    store: (state: RootState) => state.adminProduct.store,
    category: (state: RootState) => state.adminProduct.category,
});
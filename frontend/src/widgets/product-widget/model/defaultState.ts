import {ProductState} from "./types";

export const defaultState: ProductState = {
    product: {
        id: -1,
        name: '',
        price: 0,
        category: '',
        reviews: 0,
        description: '',
        images: [],
        stock: 0,
        noReviews: 0,
        store: '',
    },
    related: [],
    hasPreloaded: false
}
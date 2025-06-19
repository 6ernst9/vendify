import {Products} from "./types";

export const defaultProducts: Products = {
    sales: {
        products: [],
        sale: {
            id: 0,
            name: '',
            percentage: 0,
            productIds: [],
            endDate: '',
            store: ''
        }
    },
    news: [],
    bestSelling: [],
    hasPreloaded: false
}
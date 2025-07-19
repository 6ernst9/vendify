import {Product} from "../../../types/products";

export interface ProductState {
    product: Product;
    related: Product[];
    hasPreloaded: boolean;
}
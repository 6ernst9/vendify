export interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    stars: number;
    reviews: number;
    images: string[];
    sale: number;
}

export interface ProductDetails {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    description: string;
    category: string;
    stars: number;
    reviews: number;
    images: string[];
    sale: number;
}
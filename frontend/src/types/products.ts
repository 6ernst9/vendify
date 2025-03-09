export interface Product {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    stars: number;
    reviews: number;
    img: string;
    sale: number;
}

export interface ProductDetails {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    description: string;
    category: string;
    stars: number;
    reviews: number;
    img: string;
    sale: number;
}
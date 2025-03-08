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
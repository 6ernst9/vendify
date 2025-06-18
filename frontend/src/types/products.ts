export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    oldPrice?: number;
    description: string;
    reviews: number;
    images: string[];
    stock: number;
}
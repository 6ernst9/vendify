export type Product = {
    id: number;
    store: string;
    name: string;
    images: string[];
    category: string;
    sizes: string;
    price: number;
    description: string;
    reviews: number;
    stock: number;
}

export type Products = {
    products: Product[];
}
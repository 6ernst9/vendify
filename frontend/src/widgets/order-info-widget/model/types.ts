import {Address} from "../../checkout-widget/model/types";
import {OrderProduct} from "../../admin-order-widget/model/types";

export interface Order {
    id: string;
    customerId: number;
    items: OrderProduct[];
    address: Address;
    status: string;
    rated: boolean;
    price: number;
    createdAt: string;
    storeId: string;
}

export interface RateItem {
    productId: number;
    score: number;
}

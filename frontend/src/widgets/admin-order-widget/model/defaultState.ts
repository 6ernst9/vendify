import {Order} from "./types";

export const defaultOrder: Order = {
    id: '',
    price: 0,
    address: {
        zipCode: '',
        phoneNumber: '',
        apartment: '',
        street: '',
        city: ''
    },
    items: [],
    customerId: 0,
    status: '',
    createdAt: '',
    storeId: '',
    store: ''
}
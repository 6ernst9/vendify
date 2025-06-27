import {RootState} from "../../../redux/store";

export const userOrderSelect = ({
    id: (state: RootState) => state.userOrder.id,
    price: (state: RootState) => state.userOrder.price,
    status: (state: RootState) => state.userOrder.status,
    items: (state: RootState) => state.userOrder.items,
    createdAt: (state: RootState) => state.userOrder.createdAt,
    customerId: (state: RootState) => state.userOrder.customerId,
    address: (state: RootState) => state.userOrder.address,
    storeId: (state: RootState) => state.userOrder.storeId,
    rated: (state: RootState) => state.userOrder.rated,
});

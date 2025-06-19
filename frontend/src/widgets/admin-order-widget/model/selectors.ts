import {RootState} from "../../../redux/store";

export const adminOrderSelect = ({
    id: (state: RootState) => state.adminOrder.id,
    price: (state: RootState) => state.adminOrder.price,
    status: (state: RootState) => state.adminOrder.status,
    items: (state: RootState) => state.adminOrder.items,
    createdAt: (state: RootState) => state.adminOrder.createdAt,
    customerId: (state: RootState) => state.adminOrder.customerId,
    address: (state: RootState) => state.adminOrder.address,
    storeId: (state: RootState) => state.adminOrder.storeId,
    store: (state: RootState) => state.adminOrder.store,
});

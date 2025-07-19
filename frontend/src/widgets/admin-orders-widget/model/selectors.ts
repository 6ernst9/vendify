import {RootState} from "../../../redux/store";

export const adminOrderSelect = ({
    orders: (state: RootState) => state.adminOrders.orders
});

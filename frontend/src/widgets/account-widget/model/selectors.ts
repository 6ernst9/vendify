import {RootState} from "../../../redux/store";

export const userOrderSelect = ({
    orders: (state: RootState) => state.userOrders.orders
});

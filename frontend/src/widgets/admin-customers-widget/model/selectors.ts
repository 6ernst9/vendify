import {RootState} from "../../../redux/store";

export const adminCustomersSelect = ({
    customers: (state: RootState) => state.adminCustomers.customers
});

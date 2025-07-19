import {RootState} from "../../../redux/store";

export const adminDealsSelect = ({
    sales: (state: RootState) => state.deals.sales
});

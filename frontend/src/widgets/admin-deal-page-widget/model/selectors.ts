import {RootState} from "../../../redux/store";

export const adminDealSelect = ({
    id: (state: RootState) => state.adminDeal.id,
    name: (state: RootState) => state.adminDeal.name,
    percentage: (state: RootState) => state.adminDeal.percentage,
    productIds: (state: RootState) => state.adminDeal.productIds,
    code: (state: RootState) => state.adminDeal.code,
    store: (state: RootState) => state.adminDeal.store,
    endDate: (state: RootState) => state.adminDeal.endDate,
    status: (state: RootState) => state.adminDeal.status,
});
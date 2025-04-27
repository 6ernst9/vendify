import {RootState} from "../../../redux/store";

export const userStoresSelect = ({
    stores: (state: RootState) => state.userStores.stores
});

import { RootState } from "../../store";

export const storesSelect = ({
    stores: (state: RootState) => state.stores.stores,
    loaded: (state: RootState) => state.stores.loaded
});

import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {storesSelect} from "../core/stores/selectors";
import {setCurrentStore} from "../core/store/reducers";
import {storeSelect} from "../core/store/selectors";

const useStoreFromPath = () => {
    const stores = useSelector(storesSelect.stores);
    const currentPath = useSelector(storeSelect.path);
    const dispatch = useDispatch();

    useEffect(() => {
        const pathname = window.location.pathname;
        const segments = pathname.split('/').filter(Boolean);
        const slug = segments[0];
        console.log(slug);

        if (slug === currentPath) {
            return;
        }

        const foundStore = stores.find((store) => store.path === slug);
        if (foundStore) {
            dispatch(setCurrentStore(foundStore));
        } else {
            console.log("Store not found:", slug);
        }
    }, [stores]);
};

export default useStoreFromPath;

import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {storesSelect} from "../core/stores/selectors";
import {setCurrentStore} from "../core/store/reducers";
import {storeSelect} from "../core/store/selectors";
import {useNavigate} from "react-router-dom";
import setFavicon from "../../util/store";

const allowedPaths = [undefined, 'admin', 'home', 'login', 'sign-up'];

const useStoreFromPath = () => {
    const stores = useSelector(storesSelect.stores);
    const loaded = useSelector(storesSelect.loaded);
    const currentPath = useSelector(storeSelect.path);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const pathname = window.location.pathname;
        const segments = pathname.split('/').filter(Boolean);
        const slug = segments[0];

        if (slug === currentPath) {
            return;
        }

        if(allowedPaths.includes(slug)) {
            return;
        }

        if(loaded){
            const foundStore = stores.find((store) => store.path === slug);
            if (foundStore) {
                setFavicon(foundStore.logo);
                dispatch(setCurrentStore(foundStore));
            } else {
                console.log("Store not found:", slug);
                navigate('/home')
            }
        } else {
            return;
        }
    }, [stores]);
};

export default useStoreFromPath;

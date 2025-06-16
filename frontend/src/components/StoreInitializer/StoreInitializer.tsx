import useStoreFromPath from "../../redux/hooks/useStoreFromPath";
import useInjectTheme from "../../redux/hooks/useInjectTheme";

const StoreInitializer = () => {
    useStoreFromPath();
    useInjectTheme();
    return null;
};

export default StoreInitializer;

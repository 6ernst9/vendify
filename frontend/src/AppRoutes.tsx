import React, {useEffect, useMemo} from "react";
import AdminHomeWidget from "./widgets/admin-home-widget/AdminHomeWidget";
import AdminStoreWidget from "./widgets/admin-store-widget/AdminStoreWidget";
import AdminStoreCreateWidget from "./widgets/admin-store-create-widget/AdminStoreCreateWidget";
import AdminOrdersWidget from "./widgets/admin-orders-widget/AdminOrdersWidget";
import AdminDealsWidget from "./widgets/admin-deals-widget/AdminDealsWidget";
import AdminProductsWidget from "./widgets/admin-products-widget/AdminProductsWidget";
import AdminCustomersWidget from "./widgets/admin-customers-widget/AdminCustomersWidget";
import HomeWidget from "./widgets/home-widget/HomeWidget";
import ProductWidget from "./widgets/product-widget/ProductWidget";
import CartWidget from "./widgets/cart-widget/CartWidget";
import WishlistWidget from "./widgets/wishlist-widget/WishlistWidget";
import ContactWidget from "./widgets/contact-us-widget/ContactWidget";
import NotFoundWidget from "./widgets/not-found-widget/NotFoundWidget";
import {useRoutes} from "react-router-dom";
import HomePageWidget from "./widgets/home-page-widget/HomePageWidget";
import AdminLoginWidget from "./widgets/admin-login-widget/AdminLoginWidget";
import AdminSignUpWidget from "./widgets/admin-sign-up-widget/AdminSignUpWidget";
import {request} from "./util/request";
import {STORES_BASE_URL} from "./util/constants";
import {useDispatch, useSelector} from "react-redux";
import {setStores} from "./redux/core/stores/reducers";
import {storesSelect} from "./redux/core/stores/selectors";

const AppRoutes = () => {
    const stores = useSelector(storesSelect.stores);
    const dispatch = useDispatch();

    useEffect(() => {
        request({
            url: STORES_BASE_URL + '/get-stores',
            method: "GET"
        }).then((response) => {
            dispatch(setStores(response.data));
        }).catch((error) => {
            console.error("Error fetching stores:", error);
        });
    }, []);

    const routes = useMemo(() => {
        const adminRoutes = [
            { path: "/", element: <HomePageWidget /> },
            { path: "/home", element: <HomePageWidget /> },
            { path: "/login", element: <AdminLoginWidget /> },
            { path: "/sign-up", element: <AdminSignUpWidget /> },
            { path: "/admin", element: <AdminHomeWidget /> },
            { path: "/admin/home", element: <AdminHomeWidget /> },
            { path: "/admin/company", element: <AdminStoreWidget /> },
            { path: "/admin/company/create", element: <AdminStoreCreateWidget /> },
            { path: "/admin/orders", element: <AdminOrdersWidget /> },
            { path: "/admin/deals", element: <AdminDealsWidget /> },
            { path: "/admin/products", element: <AdminProductsWidget /> },
            { path: "/admin/customers", element: <AdminCustomersWidget /> },
        ];

        const dynamicStoreRoutes = stores.flatMap((store) => {
            const { path } = store;
            console.log(path);

            return [
                {
                    path: `/:path`,
                    element: <HomeWidget />
                },
                {
                    path: `/:path/home`,
                    element: <HomeWidget />
                },
                {
                    path: `/:path/product`,
                    element: <ProductWidget />
                },
                {
                    path: `/:path/cart`,
                    element: <CartWidget />
                },
                {
                    path: `/:path/wishlist`,
                    element: <WishlistWidget />
                },
                {
                    path: `/:path/contact`,
                    element: <ContactWidget />
                }
            ];
        });

        return [...adminRoutes, ...dynamicStoreRoutes, { path: "*", element: <NotFoundWidget /> }];
    }, [stores]);

    return useRoutes(routes);
};

export default AppRoutes;
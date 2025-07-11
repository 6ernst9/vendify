import React, {useEffect, useMemo, useState} from "react";
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
import AdminStorePageWidget from "./widgets/admin-store-page-widget/AdminStorePageWidget";
import AdminProductCreateWidget from "./widgets/admin-product-create-widget/AdminProductCreateWidget";
import ProductsBrowseWidget from "./widgets/products-browse-widget/ProductsBrowseWidget";
import LoginWidget from "./widgets/login-widget/LoginWidget";
import SignUpWidget from "./widgets/sign-up-widget/SignUpWidget";
import CheckoutWidget from "./widgets/checkout-widget/CheckoutWidget";
import AdminDealsCreateWidget from "./widgets/admin-deals-create-widget/AdminDealsCreateWidget";
import AccountWidget from "./widgets/account-widget/AccountWidget";
import AdminAnalyticsWidget from "./widgets/admin-analytics-widget/AdminAnalyticsWidget";
import AdminFinancesWidget from "./widgets/admin-finances-widget/AdminFinancesWidget";
import AdminLogsWidget from "./widgets/admin-logs-widget/AdminLogsWidget";
import Loading from "./components/Loading/Loading";
import AdminOrderWidget from "./widgets/admin-order-widget/AdminOrderWidget";
import OrderInfoWidget from "./widgets/order-info-widget/OrderInfoWidget";
import AdminStoreEditWidget from "./widgets/admin-edit-store/AdminStoreEdit";
import AdminProductEditWidget from "./widgets/admin-product-edit-widget/AdminProductEditWidget";
import AdminProductPageWidget from "./widgets/admin-product-page-widget/AdminProductPageWidget";
import AdminDealPageWidget from "./widgets/admin-deal-page-widget/AdminDealPageWidget";
import AdminAccountPageWidget from "./widgets/admin-account-page-widget/AdminAccountPageWidget";
import AdminAccountEditWidget from "./widgets/admin-account-edit-widget/AdminAccountEditWidget";
import TermsWidget from "./widgets/terms-widget/TermsWidget";

const AppRoutes = () => {
    const stores = useSelector(storesSelect.stores);
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        request({
            url: STORES_BASE_URL + '/get-stores',
            method: "GET"
        }).then((response) => {
            dispatch(setStores(response.data));
            setLoaded(true);
        }).catch((error) => {
            console.error("Error fetching stores:", error);
            setLoaded(true);
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
            { path: "/admin/account", element: <AdminAccountPageWidget /> },
            { path: "/admin/account/edit", element: <AdminAccountEditWidget /> },
            { path: "/admin/analytics", element: <AdminAnalyticsWidget /> },
            { path: "/admin/finances", element: <AdminFinancesWidget /> },
            { path: "/admin/logs", element: <AdminLogsWidget /> },
            { path: "/admin/company", element: <AdminStoreWidget /> },
            { path: "/admin/company/create", element: <AdminStoreCreateWidget /> },
            { path: "/admin/orders", element: <AdminOrdersWidget /> },
            { path: "/admin/orders/:orderId", element: <AdminOrderWidget /> },
            { path: "/admin/deals", element: <AdminDealsWidget /> },
            { path: "/admin/deals/:dealId", element: <AdminDealPageWidget /> },
            { path: "/admin/deals/create", element: <AdminDealsCreateWidget /> },
            { path: "/admin/products", element: <AdminProductsWidget /> },
            { path: "/admin/products/create", element: <AdminProductCreateWidget /> },
            { path: "/admin/customers", element: <AdminCustomersWidget /> },
            { path: "/admin/products/:productId", element: <AdminProductPageWidget /> },
            { path: "/admin/products/edit/:productId", element: <AdminProductEditWidget /> },
        ];

        const dynamicStoreRoutes = stores.flatMap((store) => {
            const { path } = store;

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
                    path: `/:path/product/:productId`,
                    element: <ProductWidget />
                },
                {
                    path: `/:path/cart`,
                    element: <CartWidget />
                },
                {
                    path: `/:path/checkout`,
                    element: <CheckoutWidget />
                },
                {
                    path: `/:path/wishlist`,
                    element: <WishlistWidget />
                },
                {
                    path: `/:path/browse`,
                    element: <ProductsBrowseWidget/>
                },
                {
                    path: `/:path/browse/:category`,
                    element: <ProductsBrowseWidget/>
                },
                {
                    path: `/:path/contact`,
                    element: <ContactWidget />
                },
                {
                    path: `/:path/terms`,
                    element: <TermsWidget />
                },
                {
                    path: `/:path/login`,
                    element: <LoginWidget/>
                },
                {
                    path: `/:path/account`,
                    element: <AccountWidget/>
                },
                {
                    path: `/:path/sign-up`,
                    element: <SignUpWidget/>
                },
                {
                    path: `/:path/order/:orderId`,
                    element: <OrderInfoWidget/>
                },
                {
                    path: `/:path/*`,
                    element: <NotFoundWidget/>
                },
                {
                    path: '/admin/company/:id',
                    element: <AdminStorePageWidget/>
                },
                {
                    path: '/admin/company/edit/:id',
                    element: <AdminStoreEditWidget/>
                }
            ];
        });

        return [...adminRoutes, ...dynamicStoreRoutes];
    }, [stores]);

    const routing = useRoutes(routes);

    if (!loaded) {
        return <Loading/>;
    } else {
        return routing;
    }
};

export default AppRoutes;
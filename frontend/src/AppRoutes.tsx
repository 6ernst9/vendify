import React, {useMemo} from "react";
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

const stores = [
    {
        slug: "exclusive",
        name: "Exclusive Store",
        theme: { /*...*/ },
        contact: { /*...*/ }
    },
    {
        slug: "freshmart",
        name: "FreshMart",
        theme: { /*...*/ },
        contact: { /*...*/ }
    }
];

const AppRoutes = () => {
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
            const { slug } = store;

            return [
                {
                    path: `/${slug}`,
                    element: <HomeWidget />
                },
                {
                    path: `/${slug}/home`,
                    element: <HomeWidget />
                },
                {
                    path: `/${slug}/product`,
                    element: <ProductWidget />
                },
                {
                    path: `/${slug}/cart`,
                    element: <CartWidget />
                },
                {
                    path: `/${slug}/wishlist`,
                    element: <WishlistWidget />
                },
                {
                    path: `/${slug}/contact`,
                    element: <ContactWidget />
                }
            ];
        });

        return [...adminRoutes, ...dynamicStoreRoutes, { path: "*", element: <NotFoundWidget /> }];
    }, []);

    return useRoutes(routes);
};

export default AppRoutes;
package com.vendify.accounts.util;

public class UserActivityMapper {

    public static String toAdminLog(Long userId, String page, String action) {
        var userLabel = userId != null ? "User " + userId : "New user";

        if (action != null) {
            if (action.startsWith("view-product:")) {
                String productId = action.split(":")[1];
                return userLabel + " viewed product " + productId + ".";
            } else if (action.startsWith("add-to-cart:")) {
                String productId = action.split(":")[1];
                return userLabel + " added product " + productId + " to cart.";
            } else if (action.startsWith("remove-from-cart:")) {
                String productId = action.split(":")[1];
                return userLabel + " removed product " + productId + " from cart.";
            } else if (action.startsWith("add-to-wishlist:")) {
                String productId = action.split(":")[1];
                return userLabel + " added product " + productId + " to wishlist.";
            } else if (action.startsWith("remove-from-wishlist:")) {
                String productId = action.split(":")[1];
                return userLabel + " removed product " + productId + " from wishlist.";
            } else if (action.startsWith("search:")) {
                String search = action.split(":")[1];
                return userLabel + " searched " + search + ".";
            } else if (action.equals("login")) {
                return userLabel + " logged in.";
            } else if (action.equals("sign-up")) {
                return userLabel + " registered a new account.";
            } else if (action.equals("view-checkout")) {
                return userLabel + " viewed the checkout page.";
            } else if (action.equals("view-home")) {
                return userLabel + " entered the home page.";
            } else if (action.equals("place-order")) {
                return userLabel + " placed a new order.";
            } else if (action.equals("view-account")) {
                return userLabel + " viewed their account.";
            } else if (action.equals("view-wishlist")) {
                return userLabel + " viewed their wishlist.";
            } else if (action.equals("add-all-to-cart")) {
                return userLabel + " added all products to cart.";
            } else if (action.equals("view-cart")) {
                return userLabel + " viewed the cart.";
            } else if (action.equals("view-contact")) {
                return userLabel + " viewed the contact page.";
            } else if (action.equals("view-all-products")) {
                return userLabel + " browsed all products.";
            } else if (action.equals("logout")) {
                return userLabel + " logged out.";
            }
        }

        if (page != null) {
            if (page.equals("home")) {
                return userLabel + " visited the homepage.";
            } else if (page.equals("browse")) {
                return userLabel + " browsed products.";
            } else if (page.startsWith("product:")) {
                String productId = page.split(":")[1];
                return userLabel + " viewed product " + productId + ".";
            } else if (page.equals("checkout")) {
                return userLabel + " entered checkout.";
            } else if (page.equals("cart")) {
                return userLabel + " viewed their cart.";
            } else if (page.equals("wishlist")) {
                return userLabel + " viewed their wishlist.";
            } else if (page.startsWith("search")) {
                return userLabel + " performed a search.";
            }
        }

        return userLabel + " performed an unknown action.";
    }
}

package com.vendify.orders.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("cartItems")
public class CartItem {
    @Id
    private String id;
    private String storeId;
    private long customerId;
    private long productId;
    private int quantity;

    public CartItem(String storeId, long customerId, long productId, int quantity) {
        this.storeId = storeId;
        this.customerId = customerId;
        this.productId = productId;
        this.quantity = quantity;
    }
}

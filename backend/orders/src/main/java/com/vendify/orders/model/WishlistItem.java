package com.vendify.orders.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("wishlistItem")
public class WishlistItem {
    @Id
    private String id;
    private String storeId;
    private long customerId;
    private long productId;

    public WishlistItem(String storeId, long customerId, long productId) {
        this.storeId = storeId;
        this.customerId = customerId;
        this.productId = productId;
    }
}


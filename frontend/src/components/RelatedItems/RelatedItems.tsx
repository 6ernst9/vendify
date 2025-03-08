import React from "react";
import './RelatedItems.css'
import {products} from "../../widgets/product-widget/mock/products";
import ProductSlider from "../ProductSlider/ProductSlider";

const RelatedItems: React.FC = () => {
    return (
        <div className="related-items">
            <div className="related-items-header">
                <span/>
                <p>Related Items</p>
            </div>
            <ProductSlider products={products}/>
        </div>
    )
}

export default RelatedItems;
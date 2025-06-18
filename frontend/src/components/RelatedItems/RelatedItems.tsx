import React from "react";
import './RelatedItems.css'
import ProductSlider from "../ProductSlider/ProductSlider";
import {useSelector} from "react-redux";
import {currentProductSelect} from "../../widgets/product-widget/model/selectors";

const RelatedItems: React.FC = () => {
    const products = useSelector(currentProductSelect.related);

    return (
        <div className="related-items">
            <div className="related-items-header">
                <span/>
                <p>Related Items</p>
            </div>
            <ProductSlider products={products} wishlist={false}/>
        </div>
    )
}

export default RelatedItems;
import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const BrowseSkeleton: React.FC = () => {
    const skeletonCards = Array.from({ length: 12 }, (_, i) => (
        <div className="product-card" key={i}>
            <div className="product-img-container">
                <Skeleton height="100%" width="100%" borderRadius={8} />
            </div>
            <h2><Skeleton width={120} /></h2>
            <div className="product-card-price">
                <Skeleton width={50} height={18} />
                <Skeleton width={40} height={16} />
            </div>
            <div className="product-card-ratings">
                <Skeleton width={100} height={16} />
                <Skeleton width={30} height={16} />
            </div>
        </div>
    ));

    return (
        <div className="browse-container">
            <h1 className="browse-title"><Skeleton width={120} /></h1>
            <div className="browse-grid">
                {skeletonCards}
            </div>
        </div>
    );
};

export default BrowseSkeleton;

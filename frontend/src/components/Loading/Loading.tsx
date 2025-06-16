import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import './Loading.css';

const Loading: React.FC = () => {
    return (
        <div className="skeleton-page">
            <div className="skeleton-store-header">
                <div className="skeleton-store-header-logo">
                    <Skeleton width={100} height={25}/>
                </div>

                <div className="skeleton-store-header-navbar">
                    <Skeleton width={60} height={20}/>
                    <Skeleton width={60} height={20}/>
                    <Skeleton width={60} height={20}/>
                </div>

                <div className="skeleton-store-header-account">
                    <Skeleton width={100} height={30}/>
                    <Skeleton circle height={24} width={24}/>
                    <Skeleton circle height={24} width={24}/>
                    <Skeleton circle height={24} width={24}/>
                </div>
            </div>

            <div className="skeleton-banner">
                <div className="skeleton-banner-categories">
                    {Array.from({length: 7}).map((_, idx) => (
                        <Skeleton key={idx} width={120} height={18}/>
                    ))}
                </div>
                <div className="skeleton-banner-img-container">
                    <Skeleton className="skeleton-banner-img" height={600} width={window.window.innerWidth - 280}/>
                </div>
            </div>

            <div className="skeleton-flash-header">
                <Skeleton width={120} height={20}/>
                <Skeleton width={100} height={15}/>
            </div>

            <div className="skeleton-flash-cards">
                {Array.from({length: 6}).map((_, idx) => (
                    <div key={idx} className="skeleton-card">
                        <Skeleton height={250}/>
                        <Skeleton height={15} style={{marginTop: 8}}/>
                        <Skeleton height={15} width={60}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Loading;
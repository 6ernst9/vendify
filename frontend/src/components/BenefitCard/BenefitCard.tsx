import React from "react";
import "./BenefitCard.css"

interface BenefitCardProps {
    title: string;
    description: string;
    Icon: React.ElementType;
}

const BenefitCard: React.FC<BenefitCardProps> = ({title, description, Icon}) => {
    return (
        <div className="benefit-card">
            <div className="benefit-card-icon-container">
                <Icon/>
            </div>
            <div className="benefit-card-text-container">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default BenefitCard;
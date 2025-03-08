import React from "react";
import {ReactComponent as Truck} from '../../assets/icons/truck.svg';
import {ReactComponent as Shield} from '../../assets/icons/shield.svg';
import {ReactComponent as Headphones} from '../../assets/icons/headphones.svg';
import BenefitCard from "../BenefitCard/BenefitCard";
import "./Benefits.css";

const Benefits: React.FC = () => {
    const benefits = [
        {
            title: 'FREE AND FAST DELIVERY',
            description: 'Free delivery for all orders over 40$',
            Icon: Truck
        },
        {
            title: '24/7 CUSTOMER SERVICE',
            description: 'Friendly 24/7 customer support',
            Icon: Headphones
        },
        {
            title: 'MONEY BACK GUARANTEE',
            description: 'We return money within 30 days',
            Icon: Shield
        }
    ];

    return (
        <div className="benefits">
            {benefits.map((benefit) =>
                <BenefitCard {...benefit}/>
            )}
        </div>
    )
}

export default Benefits;
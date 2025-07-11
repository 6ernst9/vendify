import React from "react";
import './styles.css';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Terms from "../../components/Terms/Terms";
const TermsWidget: React.FC = () => {
    return (
        <div className="terms-widget">
            <Header/>
            <Terms/>
            <Footer/>
        </div>
    )
}

export default TermsWidget;
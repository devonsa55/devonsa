import React from 'react';
import '../../styles/components/ConstructionTape.css';

const ConstructionTape: React.FC = () => {
    return (
        <div className="construction-overlay">
            <div className="tape-band tape-band-main">
                <div className="scrolling-text main-text">
                    {[...Array(10)].map((_, i) => (
                        <span key={i}>WORK IN PROGRESS&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    ))}
                </div>
            </div>
            <div className="tape-band tape-band-sub">
                <div className="scrolling-text sub-text">
                    {[...Array(20)].map((_, i) => (
                        <span key={i}>COME BACK SOON&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ConstructionTape;

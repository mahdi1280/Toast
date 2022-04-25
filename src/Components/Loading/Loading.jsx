import React from "react";
import loading from "../../asset.image/Bean Eater-1s-200px.gif";
import './style.css';

export default function Loading() {
    return <div className="container">
        <img src={loading} alt="loading"/>
    </div>;
}

// LoadingScreen.js
import React from 'react';
import ReactLoading from "react-loading";
const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            {/* <h2>Loading...</h2> */}
            <ReactLoading type="cylon" color="#000000"
                height={100} width={50} />
        </div>
    );
}

export default LoadingScreen;

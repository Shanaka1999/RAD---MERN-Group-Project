import React, { useState } from "react";

const Home = ({children})=> {
    return (
        <div style={{
            backgroundImage: "url('travel.jpg')",
            objectFit:"cover",
            backgroundPosition:"center",
            backgroundRepeat: "no-repeat",
            backgroundSize:"cover",
            height: "100vh",
            width: "100vw"
        }}>
        {children}
        </div>
    )

}

export default Home;
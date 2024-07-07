import React, { useState, useEffect } from 'react';

function RandomBackgroundComponent() {
    
    const backgrounds = [
        require('./Resources/camp.png'),
        // require('./Resources/camp2.png')
    ];

    const [background, setBackground] = useState('');

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * backgrounds.length);
        setBackground(backgrounds[randomIndex]);
    }, []); 

    return (
        <div className='backgroundImage' style={{
            backgroundImage: `url(${background})`,
            height: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
        </div>
    );
}

export default RandomBackgroundComponent;

import React from 'react';
import { Link } from 'react-router-dom';
const Navigation = () => {
    return (
        <div>
            <h1><Link to='/'>Home</Link></h1>
            <h1><Link to='/Profile'>Profile</Link></h1>
        </div>
    );
};

export default Navigation;
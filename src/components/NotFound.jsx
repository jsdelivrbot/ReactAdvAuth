import React from 'react';

const NotFound = ({ location }) => {
    return (
        <div>
            Sorry, requested page <code>{location.pathname}</code> not found...
        </div>
    );
}

export default NotFound;
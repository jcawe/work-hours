import React, { FunctionComponent } from 'react';

const Layout: FunctionComponent = ({children}) => (
    <div>
        <header>
            <title>Work hours</title>
        </header>
        <div className="container">
            {children}
        </div>
    </div>
);

export default Layout;
import React from 'react';
import Layout from './Layout';
import Dashboard from './Dashboard';
import AddHours from './AddHours';

const App: React.FunctionComponent = () => (
    <Layout>
        <Dashboard />
    </Layout>
);

export default App;
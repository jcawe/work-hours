import React, { FunctionComponent, useEffect, useState } from 'react';
import Loader from './Loader';
import { Hours } from './Hour';
import { HourModel } from '../types/models';
import 'regenerator-runtime/runtime';

const Dashboard: FunctionComponent = ({ setLoading }: any) => {
    return (
        <div>
            <h1 style={{textAlign:'center'}}>Dashboard</h1>
            <hr />
            <Hours user="97cd7842-abe7-4100-a091-e3bfe638b6fe" />
        </div>
    );
}

export default Dashboard;
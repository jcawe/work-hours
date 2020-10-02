import React, { FunctionComponent, useState, useEffect } from 'react';
import { HourModel } from '../types/models';
import Collection from './Collection';

interface HourProps extends HourModel {
    onChange: (obj: HourModel) => void
}

export const Hour: FunctionComponent<HourProps> = ({ date, hourInit, hourEnd, userId, id, onChange }) => {
    const [sDate, setDate] = useState(date !== undefined ? date.toString() : '');
    const [sHourInit, setHourInit] = useState(hourInit);
    const [sHourEnd, setHourEnd] = useState(hourEnd);
    const [sUserId, setUserId] = useState(userId);
    const [sId, setId] = useState(id);

    useEffect(() => {
        setDate(date !== undefined ? date.toString() : '')
        setHourInit(hourInit);
        setHourEnd(hourEnd);
        setUserId(userId);
        setId(id);
    }, [id, date, hourInit, hourEnd, userId]);

    useEffect(() => {
        onChange({ id: sId, date: new Date(sDate), hourInit: sHourInit, hourEnd: sHourEnd, userId: sUserId});
    }, [sId, sDate, sHourInit, sHourEnd, userId])

    return (
        <div style={{ marginBottom: 10 }}>
            <label>Date:</label>
            <input type="date" onChange={e => setDate(e.target.value)} value={sDate} />
            <label>Hours:</label>
            <div>
                <input type="time" onChange={e => setHourInit(e.target.value)} value={sHourInit} />
                to
                <input type="time" onChange={e => setHourEnd(e.target.value)} value={sHourEnd} />
            </div>
        </div>
    );
}

interface HoursProps {
    user: string
}

export const Hours: FunctionComponent<HoursProps> = ({ user }) => {
    const Component = Collection(Hour);
    return (
        <Component
            loadData={() => fetch(`http://localhost:3000/users/${user}/hours`).then(res => res.json()).then(data => data as HourModel[])}
            removeTrigger={{
                enabled: true,
                // trigger: (item: HourModel) => fetch(`http://localhost:3000/hours/${item.id}`, { method: 'DELETE' }).then()
            }}
            addTrigger={{
                enabled: true
            }}
        />
    );
}
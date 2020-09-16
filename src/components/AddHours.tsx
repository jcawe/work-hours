import React, { FunctionComponent, useState } from 'react';

const AddHours: FunctionComponent = () => {
    const [collapse, setCollapse] = useState(true);

    return (
        <div>
            <button onClick={() => setCollapse(!collapse)}>{collapse ? '+' : '-'}</button>
            {!collapse && (<form>
                <label>Date:</label>
                <input type="date" />
                <label>Hours:</label>
                <input />
                <button type="submit">Save</button>
            </form>)}
        </div>
    );
}

export default AddHours;
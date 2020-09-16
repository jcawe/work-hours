import React, { FunctionComponent, ComponentType, useState, useEffect, Component, Props } from 'react';
import Loader, { LoaderProps } from './Loader';
import { type } from 'os';

interface UIAction<T> {
    enabled: boolean
    trigger?: (obj: T) => Promise<void>
}

interface CollectionProps<T> {
    loadData: () => Promise<T[]>
    addTrigger?: UIAction<T>
    onAddChange?: (obj: T) => void
    removeTrigger?: UIAction<T>
}

const Collection = <T extends object>(Component: ComponentType<T>) => {
    const HOC: FunctionComponent<CollectionProps<T> & LoaderProps> = ({ addTrigger, removeTrigger, loadData, setLoading }) => {
        const [items, setItems] = useState<T[]>([]);
        const [collapse, setCollapse] = useState(true);
        const [saveItem, setSaveItem] = useState<T>({} as T);

        const { enabled: removeEnabled } = removeTrigger || { enabled: false };
        const { enabled: addEnabled } = addTrigger || { enabled: false };

        const removeItem = (item: T) => {
            const { trigger } = removeTrigger || {};
            setItems(items.filter(i => i !== item));
            
            if (trigger !== undefined) trigger(item);
        };
        const addItem = () => {
            const { trigger } = removeTrigger || {};
            items.push(saveItem);
            setItems(items);
            setCollapse(true);
            setSaveItem({} as T);

            if(trigger !== undefined) trigger(saveItem);
        }

        useEffect(
            () => {
                loadData().then(data => {
                    setItems(data);
                    setLoading(false);
                });
            }, []);

        return (
            <div>
                <div>
                    {items.map((x, i) => {
                        return (
                            <div style={{ borderStyle: 'solid', margin: 5, borderRadius: 25, padding: 10 }}>
                                {removeEnabled ? <button onClick={() => removeItem(x)}>X</button> : null}
                                <Component key={i} {...x} />
                            </div>
                        );
                    })}
                </div>
                {addEnabled ? (
                    <div>
                        <button onClick={() => setCollapse(!collapse)}>{collapse ? '+' : '-'}</button>
                        {!collapse && (
                            <form onSubmit={() => addItem()}>
                                <Component {...saveItem} />
                                <button type="submit">Save</button>
                            </form>
                        )}
                    </div>
                ) : null}
            </div>
        );
    };

    return Loader(HOC);
};

export default Collection;
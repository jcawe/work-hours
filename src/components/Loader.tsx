import React, { FunctionComponent, useState, ComponentType } from 'react';
import LoadingOverlay from 'react-loading-overlay';

export interface LoaderProps {
    setLoading: (loading: boolean) => void
}

const Loader = <P extends object>(Component: ComponentType<P & LoaderProps>) => {
    const HOC: FunctionComponent<P> = (props: P) => {
        const [isLoading, setLoading] = useState(true);

        return (
            <>
                {isLoading && <LoadingOverlay active={true} spinner text='Loading...' />}
                <Component {...props} setLoading={setLoading} />
            </>
        );
    };

    return HOC;
}

export default Loader;
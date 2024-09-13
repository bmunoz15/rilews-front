import React from 'react';

import InformationPanel from '../warningview/InformationPanel ';
import Map from '../../lib/map/Map';


const Home: React.FC = () => {
    return (
        <>
            <InformationPanel />
            <Map />
        </>
    );
};

export default Home;
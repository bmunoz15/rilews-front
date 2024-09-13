import React from 'react';

import InformationPanel from '../component/InformationPanel ';
import Map from '../../shared/map/Map';


const Home: React.FC = () => {
    return (
        <>
            <InformationPanel />
            <Map />
        </>
    );
};

export default Home;
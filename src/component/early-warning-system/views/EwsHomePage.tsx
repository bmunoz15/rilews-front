import React from 'react';

import InfoSideBar from '../component/InfoSidebar';
import Map from '../../shared/map/Map';


const Home: React.FC = () => {
    return (
        <>
            <InfoSideBar />
            <Map />
        </>
    );
};

export default Home;
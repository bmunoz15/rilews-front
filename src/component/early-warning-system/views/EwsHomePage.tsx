import React from 'react';

import InfoSideBar from '../component/infosidebar/InfoSidebar';
import Map from '../component/Map';


const Home: React.FC = () => {
    return (
        <>
            <InfoSideBar />
            <Map />
        </>
    );
};

export default Home;
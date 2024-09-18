import React from 'react';
import Forecast from './Forecast';
import AlertList from './AlertList';
import Nomenclature from './Nomenclature';
import ForecastModel from '../../model/ForecastModel';

interface SidebarProps {
    onPeriodSelect: (period: ForecastModel) => void;
}

const SideBarInfo: React.FC<SidebarProps> = ({ onPeriodSelect }) => {
    return (
        <>
            <Forecast onPeriodSelect={onPeriodSelect} />
            <AlertList />
            <Nomenclature />
        </>
    );
};

export default SideBarInfo;

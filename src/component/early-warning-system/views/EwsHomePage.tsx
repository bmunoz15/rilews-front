import { GeoJsonProvider } from "../../context/GeoJsonProvider";
import EwsContent from "../component/EwsContent";

const EwsHomePage: React.FC = () => {
    return (
        <GeoJsonProvider>
            <EwsContent />
        </GeoJsonProvider>
    );
};

export default EwsHomePage;
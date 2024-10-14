import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useMap } from 'react-leaflet';

interface ZoomControlProps {
    isOpen: boolean;
}

const ZoomControl: React.FC<ZoomControlProps> = ({ isOpen }) => {
    const map = useMap();

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 150,
                zIndex: 1300,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 2,
            }}
        >
            <IconButton
                size="medium"
                sx={{
                    display: 'flex',
                    position: 'relative',
                    left: isOpen ? '-500px' : '0',
                    marginLeft: -40,
                    backgroundColor: 'white',
                    transition: 'left 0.225s, transform 0.225s',
                    bgcolor: '#f6f6f6',
                    boxShadow: 2,
                    '&:hover': {
                        bgcolor: '#d3d3d3',
                    },
                }}
                onClick={() => {
                    map.zoomIn();
                }}
            >
                <AddIcon />
            </IconButton>
            <IconButton
                size="medium"
                sx={{
                    display: 'flex',
                    position: 'relative',
                    left: isOpen ? '-500px' : '0',

                    marginLeft: -40,
                    backgroundColor: 'white',
                    transition: 'left 0.225s, transform 0.225s',
                    bgcolor: '#f6f6f6',
                    boxShadow: 2,
                    '&:hover': {
                        bgcolor: '#d3d3d3',
                    },
                }}
                onClick={() => {
                    map.zoomOut();
                }}
            >
                <RemoveIcon />
            </IconButton>
        </Box>
    );
};

export default ZoomControl;

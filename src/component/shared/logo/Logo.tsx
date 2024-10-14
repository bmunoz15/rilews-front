import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

interface LogoProps {
    src: string;
    alt: string;
    url?: string;
}
export default function Logo(props: LogoProps) {
    const { src, alt, url } = props;
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 1,
            }}
        >
            <Link to={url ? url : ''}>
                <img
                    src={src}
                    alt={alt}
                    style={{
                        maxWidth: isSmallScreen ? '64px' : '128px',
                        width: 'auto',
                        height: 'auto',
                    }}
                />
            </Link>
        </Box>
    );
}
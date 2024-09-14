import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface NavItemProps {
    open: boolean;
    item: {
        isSubmenu: boolean;
        path?: string;
        icon: React.ReactNode;
        text: string;
    };
    handleNavigation: (path: string) => void;
    handleSubOpen: () => void;
    subOpen: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ open, item, handleNavigation, handleSubOpen, subOpen }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? 'initial' : 'center',
                    ...(isSmallScreen && {
                        px: 2,
                    }),
                    ...(isMediumScreen && {
                        px: 2,
                    }),
                    ...(isLargeScreen && {
                        px: 3,
                    }),
                }}
                onClick={item.isSubmenu ? handleSubOpen : () => handleNavigation(item.path!)}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                >
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                {item.isSubmenu && open && (subOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            </ListItemButton>
        </ListItem>
    );
};

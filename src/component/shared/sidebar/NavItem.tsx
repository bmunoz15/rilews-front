import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    return (
        <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
                sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? 'initial' : 'center',
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

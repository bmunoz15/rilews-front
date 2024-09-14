import { styled, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

import { Theme } from '@mui/material/styles';

interface DrawerToggleHeaderProps {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  theme: Theme;
}

export const DrawerToggleHeader: React.FC<DrawerToggleHeaderProps> = ({ open, handleDrawerOpen, handleDrawerClose, theme }) => {
  return (
    <DrawerHeader>
      <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
        {open ? (theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />) : (theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />)}
      </IconButton>
    </DrawerHeader>
  );
};

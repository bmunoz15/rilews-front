import { styled, IconButton, useTheme } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
  },
}));

interface DrawerToggleHeaderProps {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
}

export const DrawerToggleHeader: React.FC<DrawerToggleHeaderProps> = ({ open, handleDrawerOpen, handleDrawerClose }) => {
  const theme = useTheme();

  return (
    <DrawerHeader>
      <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
        {open ? (theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />) : (theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />)}
      </IconButton>
    </DrawerHeader>
  );
};

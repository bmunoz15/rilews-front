import React from 'react';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { useTheme } from '@mui/material/styles';

interface SubmenuProps {
  subOpen: boolean;
  handleNavigation: (path: string) => void;
  subItems?: { text: string; path: string; }[];
}

export const SubMenu: React.FC<SubmenuProps> = ({ subOpen, handleNavigation, subItems = [] }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const getPadding = () => {
    if (isSmallScreen) return 2;
    if (isMediumScreen) return 3;
    if (isLargeScreen) return 4;
    return 4; 
  };

  return (
    <Collapse in={subOpen} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {subItems.map((subItem) => (
          <ListItem key={subItem.text} sx={{ pl: getPadding() }}>
            <ListItemButton onClick={() => handleNavigation(subItem.path)}>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={subItem.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
};

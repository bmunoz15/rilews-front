import React from 'react';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { useTheme } from '@mui/material/styles';

interface SubmenuProps {
  subOpen: boolean;
  handleNavigation: (path: string) => void;
}

export const SubMenu: React.FC<SubmenuProps> = ({ subOpen, handleNavigation }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const getPadding = () => {
    if (isSmallScreen) return 2;
    if (isMediumScreen) return 3;
    if (isLargeScreen) return 4;
    return 4; // Default padding
  };

  return (
    <Collapse in={subOpen} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {[
          { text: 'Subitem 1', path: '/' },
          { text: 'Subitem 2', path: '/' },
          { text: 'Subitem 3', path: '/' },
        ].map((subItem) => (
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

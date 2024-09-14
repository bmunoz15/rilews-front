import React from 'react';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

interface SubmenuProps {
  subOpen: boolean;
  handleNavigation: (path: string) => void;
}

export const SubMenu: React.FC<SubmenuProps> = ({ subOpen, handleNavigation }) => {
  return (
    <Collapse in={subOpen} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {[
          { text: 'Subitem 1', path: '/' },
          { text: 'Subitem 2', path: '/' },
          { text: 'Subitem 3', path: '/' },
        ].map((subItem) => (
          <ListItem key={subItem.text} sx={{ pl: 4 }}>
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

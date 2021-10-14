import { Avatar, Box, Icon, IconButton } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import userEvent from '@testing-library/user-event';
import { IUser, signOutEndpoint } from './backend';
import { authContext, useAuthContext } from './authContext';

export default function UserMenu() {
  const { user, onSignOut } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function signOut() {
    signOutEndpoint();
    onSignOut();
  }
  return (
    <div>
      <IconButton
        aria-controls='simple-menu'
        aria-haspopup='true'
        aria-label='Usuário'
        onClick={handleClick}
      >
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Box
          padding='16px'
          display='flex'
          flexDirection='column'
          borderBottom='1px solid rgb(224,224,224)'
          alignItems='center'
        >
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
          <div>{user.name}</div>
          <small>{user.email}</small>
        </Box>
        <MenuItem onClick={signOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
}

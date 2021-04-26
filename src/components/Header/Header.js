import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Header.module.scss'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withRouter, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import plectrum from '../../images/plectrum.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({setToken, loggedInUser}) => {
    const history = useHistory();
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageUrl) => {
    history.push(pageUrl);
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    history.push('/login');
  }

  return (
    <div className={classes.root}>
      <FormGroup>
        {/* <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        /> */}
      </FormGroup>
      <AppBar position="static" style={{backgroundColor: "#cc0066"}}>
        <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img onClick={() => handleMenuClick('/')} width="70px" src={plectrum}></img>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Bandmate Finder
        </Typography>
        {auth && (
          <div>
            
            <IconButton onClick={handleMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              {loggedInUser && <Typography variant="h6" className={classes.title} style={{marginRight:"1rem"}}>
                {loggedInUser}
            </Typography>}
              
            <MenuIcon />
            
          </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => handleMenuClick('/edit-profile')}>Edit profile</MenuItem>
                <MenuItem onClick={() => handleMenuClick('/search')}>Search users</MenuItem>
                <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);

Header.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
}
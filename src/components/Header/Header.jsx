import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {logout} from 'actions/user';
import {triggerSnackBar} from 'actions/app';

const useStyles = makeStyles(theme => ({
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

const Header = ({login, history,logout, triggerSnackBar}) => {
  const classes = useStyles();

  const handleLogout = () => {
    logout();
    triggerSnackBar(true, 'You have successfully logged out of your account');
  };
  return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Test assigment
            </Typography>
            {login ? <Button color="inherit" onClick={handleLogout}>Logout
            </Button> :
            <Button color="inherit" onClick={() => history.push('/login')}>
              Login
            </Button>}
          </Toolbar>
        </AppBar>
      </div>
  );
}


function mapStateToProps(state) {
  const {login} = state.user;
  return {login};
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          logout,
          triggerSnackBar
        },
        dispatch,
    );


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(Header);

import React from 'react';
import RouteWrapper from './pages/RouteWrapper';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from 'components/Header/Header';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import {makeStyles} from '@material-ui/core';
import {triggerSnackBar} from 'actions/app';
import {setUser} from './actions/user';

const useStyles = makeStyles({
  paper: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  root: {
    backgroundColor: 'transparent'
  }
});

function App({showPreloader, showSnackBar, snackBarMessage, triggerSnackBar, setUser}) {
  const classes = useStyles();
  const token = localStorage.getItem('token');
  if(token){
    setUser(token);
  }
  return (
      <div className="app">
        <Router>
          <Header />
          <div className="page-container">
            <RouteWrapper/>
          </div>
          <Dialog open={showPreloader} classes={classes}>
            <CircularProgress color={'secondary'} size={100}/>
          </Dialog>
          <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              key="bottom,center"
              className="bottom-snackbar"
              autoHideDuration={5000}
              open={showSnackBar}
              onClose={() => {
                triggerSnackBar(false);
              }}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{snackBarMessage}</span>}
          />

        </Router>
      </div>
  );
}

function mapStateToProps(state) {
  const {showPreloader, showSnackBar, snackBarMessage} = state.app;
  return {showPreloader, showSnackBar, snackBarMessage};
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          triggerSnackBar,
          setUser
        },
        dispatch,
    );


export default compose(
    connect(
        mapStateToProps, mapDispatchToProps
    )
)(App);

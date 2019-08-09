import React, {PureComponent} from 'react';
import style from './Login.module.scss';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';
import {setUser, login} from 'actions/user';
import {triggerSnackBar, handlePreloader} from 'actions/app'
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import FormHelperText from '@material-ui/core/FormHelperText';


class Login extends PureComponent {

  componentDidMount() {
    const token = localStorage.getItem('token');
    if(token){
      this.props.history.push('/');
    }
  }

  state = {
    username: '',
    password: '',
    usernameErrorMessage: '',
    passwordErrorMessage: ''
  };


  handleSubmit = async () => {
    const {username, password} = this.state;
    if (!username.trim()) {
      this.setState((state) => ({
        usernameErrorMessage: 'This field is required'
      }));
    }
    if (!password.trim()) {
      this.setState((state) => ({
        passwordErrorMessage: 'This field is required'
      }));
      return;
    }


    if(this.state.username !== 'admin' && this.state.password !== '123'){
      this.setState((state) => ({
        usernameErrorMessage: 'We did not find an account with such data, try to change the value'
      }));
      return;
    }


    if (!this.state.usernameErrorMessage && !this.state.passwordErrorMessage) {
      this.props.handlePreloader(true);
      await this.props.login(username, password);
      this.props.handlePreloader(false);
      this.props.triggerSnackBar(true, 'You have successfully logged in to your account');
      this.props.history.push('/')
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      [`${event.target.name}ErrorMessage`]: ''
    })
  };

  static styles = {
    formField: {
      marginTop: 20
    },
    loginButton: {
      marginTop: 40
    }
  };

  render() {
    const {classes} = this.props;
    const {username, password, usernameErrorMessage, passwordErrorMessage} = this.state;
    return (
        <div className={style.loginPage}>
          <div className={style.loginForm}>
            <Paper className={style.loginForm}>
              <Typography variant="h5" component="h2">
                Login
              </Typography>

              <FormControl
                  className={classes.formField}
                  error={usernameErrorMessage.length}>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input id="username"
                       name={'username'}
                       value={username}
                       onChange={this.handleChange}/>
                {usernameErrorMessage.length ?
                    <FormHelperText>{usernameErrorMessage}</FormHelperText> : null}
              </FormControl>

              <FormControl
                  className={classes.formField}
                  error={passwordErrorMessage.length}>
                <InputLabel htmlFor="component-simple">Password</InputLabel>
                <Input id={'password'}
                       type={'password'}
                       value={password}
                       name={'password'}
                       onChange={this.handleChange}/>
                {passwordErrorMessage ?
                    <FormHelperText>{passwordErrorMessage}</FormHelperText> : null}
              </FormControl>

              <Button color="primary"
                      variant="contained"
                      className={classes.loginButton}
                      onClick={this.handleSubmit}>
                Login
              </Button>
            </Paper>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return null;
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          setUser,
          login,
          triggerSnackBar,
          handlePreloader
        },
        dispatch,
    );

export default compose(
    withStyles(Login.styles),
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Login);

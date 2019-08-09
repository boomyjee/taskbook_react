import React, {PureComponent} from 'react';
import Button from '@material-ui/core/Button';
import style from './AddTask.module.scss';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from 'components/Input/Input';
import {emailValidation} from 'services/validation';
import {addNewTask, getTasksAction} from 'actions/tasks';
import {handlePreloader, triggerSnackBar} from 'actions/app';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class AddTask extends PureComponent {

  static initilState = {
    userName: '',
    email: '',
    description: '',
    open: false,
    userNameError: '',
    emailError: '',
    descriptionError: '',
    isValid: false
  };

  state = Object.assign({}, AddTask.initilState);

  fieldValidation = () => {
    const {userName, email, description} = this.state;
    this.setState(() => ({
      isValid: true
    }))

    if(!userName.trim()){
      this.setState(() => ({
        userNameError: 'This field is required',
        isValid: false
      }))
    }

    if(!email.trim()){
      this.setState(() => ({
        emailError: 'This field is required',
        isValid: false
      }))
    }

    if(!description.trim()){
      this.setState(() => ({
        descriptionError: 'This field is required',
        isValid: false
      }))
      return false;
    };

    if(email.trim() && !emailValidation(email)){
      this.setState(() => ({
        emailError: 'Please enter a valid email',
        isValid: false
      }))
      return false
    }

    return true;
  };

  handleSubmit = async () => {
    if(this.fieldValidation()){
      const {userName, email, description} = this.state;
      this.props.handlePreloader(true);
      await this.props.addNewTask(userName, email, description);
      const {sortBy, activeSort, page} = this.props;
      await this.props.getTasksAction(sortBy, activeSort, page);
      this.props.handlePreloader(false);
      this.handleClose();
      this.setState(AddTask.initilState)
      this.props.triggerSnackBar(true, 'You have successfully added a new task')
    }
  }

  handleClickOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
        [`${event.target.name}Error`]: ''
      })
  }

  render() {
    const {userName, email, description, open, userNameError, descriptionError, emailError} = this.state;
    return (
        <div className={style.addTaskButton}>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            Add new task
          </Button>
          <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add task</DialogTitle>
            <DialogContent>
              <Input name='email' type={'email'} value={email} error={emailError.trim()} errorMessage={emailError}
                     handleChange={this.handleChange} label={'Email*'}/>
              <Input name='userName' type={'text'} value={userName} error={userNameError.trim()} errorMessage={userNameError}
                     handleChange={this.handleChange} label={'User Name*'}/>
              <Input name='description' type={'text'} value={description} error={descriptionError.trim()} errorMessage={descriptionError}
                     handleChange={this.handleChange} label={'Text*'} multiline/>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button color="primary" onClick={this.handleSubmit}>
                Add task
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const {sortBy, activeSort, page} = state.tasks;
  return {sortBy, activeSort, page};
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          addNewTask,
          handlePreloader,
          getTasksAction,
          triggerSnackBar
        },
        dispatch,
    );



export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AddTask);

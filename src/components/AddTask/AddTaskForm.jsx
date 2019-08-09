import React, {PureComponent} from 'react';
import Input from 'components/Input/Input';

class AddTaskForm extends PureComponent{

  state = {
    userName: '',
    email: '',
    description: ''
  }

  handleChange = (e, c) => {
  }

  render() {
    const {userName, email, description} = this.state;
    return(
        <div>
          <Input name='email' type={'email'} value={email} error={false} handleChange={this.handleChange} label={'Email*'}/>
          <Input name='userName' type={'text'} value={userName} error={false} handleChange={this.handleChange} label={'User Name*'}/>
          <Input name='description' type={'text'} value={description} error={true} handleChange={this.handleChange} label={'Text*'}/>
        </div>
    )
  }
}

export default AddTaskForm;


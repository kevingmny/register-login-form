import React        from 'react';
// eslint-disable-next-line
import InputField   from './InputField';
// eslint-disable-next-line
import SubmitButton from './SubmitButton';
// eslint-disable-next-line
import UserStore    from './stores/UserStore';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false
    }
  }


  setInputValue(property, val) {
    val = val.trim();
    //setting username and password max lenght (12)
    if (val.lenght > 12) {
      return;
    }
    this.setState({
      [property]: val
    })
  }

  //if the username or password are wrong it will reset the form
  resetForm(){
    this.setState({
      username: '',
      password: '',
      buttonDisabled: false
    })
  }

  /**
   * API call to submit button
   */
  async doLogin() {

    if(!this.state.username) {
      return;
    }
    if (!this.state.password) {
      return;
    }

    this.setState({
      buttonDisabled: true
    })

    try{

      let res = await fetch('/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });

      let result = await res.json();
      if(result && result.success) {
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }

      else if (result && result.success === false) {
        this.resetForm();
        alert(result.msg);
      }
    }

    catch(e) {
      console.log(e);
      this.resetForm();
    }

  }

  render() {
    return (
      <div className="loginForm">
          Iscriviti
          <InputField
            type='text'
            placeholder='Username'
            value={this.state.username ? this.state.username : ''}
            onChange= { (val) => this.setInputValue('username', val)}
          />

          <InputField
            type='password'
            placeholder='Password'
            value={this.state.password ? this.state.password : ''}
            onChange= { (val) => this.setInputValue('password', val)}
            />

          <SubmitButton
            text='Accedi'
            disabled={this.state.buttonDisabled}
            onClick={ () => this.doLogin()}
          />
      </div>
    );
  } 
}

export default LoginForm;

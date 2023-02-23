import React        from 'react';
// eslint-disable-next-line
import { observer }  from 'mobx-react';
// eslint-disable-next-line
import UserStore    from './stores/UserStore';
// eslint-disable-next-line
import LoginForm    from './LoginForm';
// eslint-disable-next-line
import SubmitButton from './SubmitButton'
import './App.css';

class App extends React.Component {

  /**
   * API call to log-in
   */
  async componentDidMount() {

    try {

      let res = await fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      //if (the user is logged-in)
      if (result && result.success) {
        UserStore.loading = false; 
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }
      
      //else (the user cannot logged-in)
      else{
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }

    //API call return 'error'
    catch(e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  /**
   * API call to log-out
   */
  async doLogout() {

    try {

      let res = await fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success) {
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }

    }

    catch(e) {
      console.log(e)
    }

  }

  render() {

    if (UserStore.loading) {
      return(
        <div className="App">
          <div className= 'container'>
              Attendere il caricamente prego...
          </div>
        </div>
      );
    }

    else {

      if (UserStore.isLoggedIn) {
        return(
          <div className="App">
            <div className= 'container'>
                Benvenuto {UserStore.username}

                <SubmitButton
                  text={'Disconnettersi'}
                  disabled={false}
                  onClick={ () => this.doLogout() }
                />
            </div>
          </div>
        );
      }

      return (
        <div className="App">
            <div className= 'container'>
              <LoginForm />
            </div>
        </div>
      );
    }

  } 
}

export default observer(App);

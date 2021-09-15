import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: false,
      logged: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchCreatUser = this.fetchCreatUser.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async fetchCreatUser() {
    const { user } = this.state;
    this.setState({ loading: true });
    await createUser({
      name: user,
    });
    this.setState({
      loading: false,
      logged: true,
    });
  }

  render() {
    const { user, loading, logged } = this.state;
    const minLength = 3;
    return (
      <div data-testid="page-login">
        { logged && <Redirect to="/search" /> }
        <form>
          <input
            name="user"
            type="text"
            data-testid="login-name-input"
            placeholder="Nome"
            value={ user }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ user.length < minLength }
            data-testid="login-submit-button"
            onClick={ this.fetchCreatUser }
          >
            Entrar
          </button>
          {loading && <Loading /> }
        </form>
      </div>
    );
  }
}

export default Login;

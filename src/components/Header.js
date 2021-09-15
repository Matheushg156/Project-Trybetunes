import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
    };

    this.fetchGetUser = this.fetchGetUser.bind(this);
  }

  componentDidMount() {
    this.fetchGetUser();
  }

  async fetchGetUser() {
    this.setState({ loading: true });

    const nameUser = await getUser();

    this.setState({
      name: nameUser.name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading && <Loading /> }
        <span data-testid="header-user-name">{`Bem vindo ${name} `}</span>
      </header>
    );
  }
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo2 from '../images/logotrybe2.png';
import avatar from '../images/avatar.png';

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
      <div className="header">
        <div className="header1">
          <img src={ logo2 } alt="logo trybetunes" className="logoHeader" />
          <div className="containerUser">
            <img src={ avatar } alt="avatar" className="avatar" />
            <p data-testid="header-user-name" className="userName">{ name }</p>
          </div>
        </div>
        <div>
          <header
            data-testid="header-component"
            className="header2"
          >
            <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </header>
        </div>
        { loading && <Loading /> }
      </div>
    );
  }
}

export default Header;

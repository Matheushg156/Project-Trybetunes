import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      infoUser: {},
      loading: false,
    };

    this.getInfoUser = this.getInfoUser.bind(this);
  }

  componentDidMount() {
    this.getInfoUser();
  }

  async getInfoUser() {
    this.setState({ loading: true });

    const fetchInfoUser = await getUser();

    this.setState({
      infoUser: fetchInfoUser,
      loading: false,
    });
  }

  render() {
    const { loading, infoUser } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div>
          { loading && <Loading /> }
          <img
            src={ infoUser.image }
            alt="imageUser"
            data-testid="profile-image"
          />
          <Link to="/profile/edit">
            <button
              type="button"
            >
              Editar perfil
            </button>
          </Link>
        </div>
        <div>
          <h1>Nome</h1>
          <p>{ infoUser.name }</p>
          <h1>E-mail</h1>
          <p>{ infoUser.email }</p>
          <h1>Descrição</h1>
          <p>{ infoUser.description }</p>
        </div>
      </div>
    );
  }
}

export default Profile;

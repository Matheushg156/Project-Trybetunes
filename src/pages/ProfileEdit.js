import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.getUserInfos = this.getUserInfos.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);

    this.state = {
      image: '',
      name: '',
      email: '',
      description: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserInfos();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit() {
    const { history } = this.props;
    this.setState({ loading: true });
    const { image, name, email, description } = this.state;
    await updateUser({
      image,
      name,
      email,
      description,
    });
    history.push('/profile');
  }

  async getUserInfos() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      image: user.image,
      name: user.name,
      email: user.email,
      description: user.description,
      loading: false,
    });
  }

  renderForm() {
    const { image, name, email, description } = this.state;
    const validEmail = /\S+@\S+\.\S+/.test(email);
    const validButton = (validEmail && image !== '' && name !== '' && email !== ''
    && description !== '');
    return (
      <div>
        <form>
          <input
            data-testid="edit-input-image"
            type="text"
            placeholder="Insira um link"
            name="image"
            value={ image }
            onChange={ this.handleChange }
          />
          <label htmlFor="profileName">
            Nome:
            <input
              data-testid="edit-input-name"
              id="profileName"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="profileEmail">
            Email:
            <input
              data-testid="edit-input-email"
              id="profileEmail"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="profileDescription">
            Descrição:
            <textarea
              data-testid="edit-input-description"
              id="profileDescription"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <input
            type="button"
            data-testid="edit-button-save"
            disabled={ !validButton }
            onClick={ this.handleSubmit }
            value="Salvar"
          />
        </form>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div>
          { loading ? <Loading /> : this.renderForm() }
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;

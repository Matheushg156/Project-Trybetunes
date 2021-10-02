import React from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.validatButton = this.validatButton.bind(this);
    this.renderForm = this.renderForm.bind(this);

    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loading: false,
      redirect: false,
      disabled: true,
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
    this.validatButton();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.updateUserInfo();
    this.setState({
      redirect: true,
    });
  }

  async getUserInfos() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({
      name: user.name,
      email: user.email,
      description: user.description,
      image: user.image,
    });
    this.setState({ loading: false });
    this.validatButton();
  }

  async updateUserInfo() {
    const { name, email, description, image } = this.state;
    const user = {
      name,
      email,
      description,
      image,
    };
    this.setState({ loading: true });
    await updateUser(user);
    this.setState({ loading: false });
  }

  validatButton() {
    const { name, email, description, image } = this.state;
    const user = {
      name,
      email,
      description,
      image,
    };
    const emailRegex = /\S+@\S+\.\S+/;
    const validEmail = !emailRegex.test(email);
    const validatAllInfos = Object.values(user).some((value) => value === '');
    if (validEmail || validatAllInfos) {
      this.setState({ disabled: true });
    } else {
      this.setState({ disabled: false });
    }
  }

  renderForm() {
    const { name, email, description, image, disabled } = this.state;
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
              type="email"
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
          <button
            type="submit"
            data-testid="edit-button-save"
            disabled={ disabled }
            onClick={ this.handleSubmit }
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }

  render() {
    const { loading, redirect } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div>
          { loading ? <Loading /> : this.renderForm() }
          { redirect && <Redirect to="/profile" /> }
        </div>
      </div>
    );
  }
}

export default ProfileEdit;

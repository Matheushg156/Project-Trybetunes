import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      inputSearch: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { inputSearch } = this.state;
    const minLength = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            name="inputSearch"
            value={ inputSearch }
            onChange={ this.handleChange }
            type="text"
            placeholder="Nome do Artista"
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ inputSearch.length < minLength }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

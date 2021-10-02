import React from 'react';
import AlbunsCard from '../components/AlbunsCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      inputSearch: '',
      albuns: [],
      loading: false,
      renderAlbuns: false,
      showText: '',
      /* notFindAlbum: false, */
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { inputSearch } = this.state;
    this.setState({ loading: true });

    const arrayAlbuns = await searchAlbumsAPI(inputSearch);

    if (arrayAlbuns.length === 0) {
      return this.setState({
        /* notFindAlbum: true, */
        loading: false,
        albuns: [],
        showText: 'Nenhum álbum foi encontrado',
      });
    }

    this.setState({
      albuns: arrayAlbuns,
      loading: false,
      inputSearch: '',
      renderAlbuns: true,
      showText: `Resultado de álbuns de ${inputSearch}:`,
      /* notFindAlbum: false, */
    });
  }

  render() {
    const { inputSearch, loading, albuns,
      renderAlbuns, showText } = this.state;
    const minLength = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="containerFormSearch">
          <form className="formSearch">
            <input
              className="inputFormSearch"
              data-testid="search-artist-input"
              name="inputSearch"
              value={ inputSearch }
              onChange={ this.handleChange }
              type="text"
              placeholder="Nome do Artista"
            />
            <button
              className="buttonFormSearch"
              data-testid="search-artist-button"
              type="button"
              disabled={ inputSearch.length < minLength }
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </form>
        </div>
        <p>{ showText }</p>
        {/* { notFindAlbum && <p>Nenhum álbum foi encontrado</p> } */}
        <div className="album-list">
          { loading && <Loading /> }
          { renderAlbuns && albuns
            .map((album, index) => <AlbunsCard key={ index } listAlbuns={ album } />) }
        </div>
      </div>
    );
  }
}

export default Search;

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor(props) {
    super(props);

    const { match: { params: { id } } } = this.props;

    this.state = {
      arrayOfMusics: [],
      id,
    };
  }

  componentDidMount() {
    this.fetchMusicsOfAlbum();
  }

  async fetchMusicsOfAlbum() {
    const { id } = this.state;

    const getMusicsById = await getMusics(id);

    this.setState({
      arrayOfMusics: getMusicsById,
      imageAlbum: getMusicsById[0].artworkUrl100,
      nameAlbum: getMusicsById[0].collectionName,
      nameArtist: getMusicsById[0].artistName,
    });
  }

  render() {
    const { arrayOfMusics, imageAlbum, nameAlbum, nameArtist } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="albunsMusics">
          <section className="card">
            <img
              alt="Collection Cover"
              className="movie-card-image"
              src={ imageAlbum }
            />
            <div className="card-body">
              <p className="card-title" data-testid="album-name">{nameAlbum}</p>
              <p className="card-subtitle" data-testid="artist-name">{nameArtist}</p>
            </div>
          </section>
          <section className="listMusics">
            <MusicCard arrayOfMusics={ arrayOfMusics } />
          </section>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;

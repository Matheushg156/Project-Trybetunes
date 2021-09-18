import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: [],
      loading: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.getList = this.getList.bind(this);
  }

  componentDidMount() {
    this.getList();
  }

  async handleClick({ target }) {
    const { music } = this.props;

    this.setState({
      loading: true,
    });

    if (target.checked) {
      await addSong(music);
    } else {
      this.setState({
        loading: true,
      });

      await removeSong(music);
    }
    this.getList();

    this.setState({
      loading: false,
    });
  }

  async getList() {
    const listSongs = await getFavoriteSongs();

    this.setState({ favorite: listSongs });
  }

  render() {
    const { music: { trackName, previewUrl, trackId } } = this.props;

    const { favorite, loading } = this.state;

    return (
      <section>
        { loading && <Loading /> }

        <p>{trackName}</p>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>

        <label
          htmlFor={ trackId }
          data-testid={ `checkbox-music-${trackId}` }
        >
          Favorita
          <input
            id={ trackId }
            type="checkbox"
            onChange={ this.handleClick }
            checked={ favorite.find((listSongs) => listSongs.trackId === trackId) }
          />
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;

import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      check: false,
      loading: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getListFavorite();
  }

  componentDidUpdate() {
    this.getListFavorite();
  }

  async handleClick(event, music) {
    this.setState({
      loading: true,
    });

    if (event.target.checked) {
      await addSong(music);
      this.setState({
        check: true,
      });
    } else {
      await removeSong(music);
      this.setState({
        loading: true,
        check: false,
      });
    }

    this.setState({
      loading: false,
    });
  }

  async getListFavorite() {
    const { music } = this.props;
    const listSongs = await getFavoriteSongs();
    const checkListSongs = listSongs.some((songs) => songs.trackId === music.trackId);
    if (checkListSongs) {
      this.setState({
        check: true,
      });
    }
  }

  render() {
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    const { check, loading } = this.state;

    return (
      <section>
        <p>{trackName}</p>

        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        { (loading) ? <Loading /> : (
          <label
            htmlFor={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
          >
            Favorita
            <input
              id={ trackId }
              type="checkbox"
              checked={ check }
              onChange={ (event) => this.handleClick(event, music) }
            />
          </label>
        )}
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

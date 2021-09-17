import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

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

  async handleClick(event, music) {
    if (event.target.checked) {
      this.setState({
        loading: true,
      });

      await addSong(music);

      this.getList();
    } else {
      this.setState({
        loading: true,
      });

      await removeSong(music);
      this.getList();
    }

    this.setState({
      loading: false,
    });
  }

  async getList() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favorite: favoriteSongs,
    });
  }

  render() {
    const { arrayOfMusics } = this.props;
    const { favorite, loading } = this.state;
    return (
      <div>
        { loading && <Loading /> }
        { arrayOfMusics.slice(1).map((music) => (
          <section key={ music.trackId }>
            <div>{music.trackName}</div>

            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label
              htmlFor={ music.trackName }
              data-testid={ `checkbox-music-${music.trackId}` }
            >
              Favorita
              <input
                id={ music.trackName }
                type="checkbox"
                checked={ favorite
                  .some(({ trackName }) => trackName === music.trackName) }
                onChange={ (event) => this.handleClick(event, music) }
              />
            </label>
          </section>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  arrayOfMusics: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;

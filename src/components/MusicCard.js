import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(event, music) {
    if (event.target.checked) {
      await addSong(music);
      return this.setState({
        favorite: true,
      });
    }
    await removeSong(music);
    return this.setState({
      favorite: false,
    });
  }

  render() {
    const { arrayOfMusics } = this.props;
    const { favorite } = this.state;
    return (
      <div>
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
              htmlFor={ music.trackId }
              data-testid={ `checkbox-music-${music.trackId}` }
            >
              <input
                id={ music.trackId }
                type="checkbox"
                checked={ favorite }
                onChange={ this.handleClick }
              />
            </label>
          </section>
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  listAlbuns: PropTypes.shape({
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    collectionId: PropTypes.number,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};

MusicCard.propTypes = {
  arrayOfMusics: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;

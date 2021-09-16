import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { arrayOfMusics } = this.props;
    return (
      <div>
        { arrayOfMusics.slice(1).map((music, index) => (
          <section key={ index }>
            <div>{music.trackName}</div>

            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
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

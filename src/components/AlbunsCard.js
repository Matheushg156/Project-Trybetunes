import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* {
  artistId: 12,
  artistName: "Artist Name",
  collectionId: 123,
  collectionName: "Collection Name",
  collectionPrice: 12.25,
  artworkUrl100: "https://url-to-image",
  releaseDate: "2012-03-02T08:00:00Z",
  trackCount: 8,
} */

class AlbunsCard extends React.Component {
  render() {
    const { listAlbuns } = this.props;
    const { artworkUrl100, collectionId, artistName, collectionName } = listAlbuns;
    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <div className="card">
          <img
            alt="Collection Cover"
            className="card-image"
            src={ artworkUrl100 }
          />
          <div className="card-body">
            <p className="card-title">{collectionName}</p>
            <p className="card-subtitle">{artistName}</p>
          </div>
        </div>
      </Link>
    );
  }
}

AlbunsCard.propTypes = {
  listAlbuns: PropTypes.shape({
    artistName: PropTypes.string,
    collectionName: PropTypes.string,
    collectionId: PropTypes.number,
    artworkUrl100: PropTypes.string,
  }).isRequired,
};

export default AlbunsCard;

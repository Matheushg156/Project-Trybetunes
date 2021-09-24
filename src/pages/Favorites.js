import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favoriteSongs: [],
    };

    this.getFavoriteSongsList = this.getFavoriteSongsList.bind(this);
  }

  componentDidMount() {
    this.getFavoriteSongsList();
  }

  async getFavoriteSongsList() {
    const listFavoriteSongs = await getFavoriteSongs();

    this.setState({
      loading: false,
      favoriteSongs: listFavoriteSongs,
    });
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading && <Loading /> }
        { favoriteSongs.map((music) => (
          <MusicCard
            key={ music.trackId }
            music={ music }
          />))}
      </div>
    );
  }
}

export default Favorites;

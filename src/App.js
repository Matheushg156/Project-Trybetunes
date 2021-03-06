import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/search" component={ Search } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } />
          <Route exact path="/" component={ Login } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

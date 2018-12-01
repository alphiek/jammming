import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'This is my Playlist Name',
      playlistTracks: [
        {
          id: 'P001',
          name: 'Playlist Track 1',
          artist: 'Playlist Artist 1',
          album: 'Playlist Album 1'
        },
        {
          id: 'P002',
          name: 'Playlist Track 2',
          artist: 'Playlist Artist 2',
          album: 'Playlist Album 2'
        },
        {
          id: 'P003',
          name: 'Playlist Track 3',
          artist: 'Playlist Artist 3',
          album: 'Playlist Album 3'
        }
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    Spotify.search(term).then(results => {
       this.setState({ searchResults: results });
     });
}

 savePlaylist() {
  this.state.playlistTracks.map(track => track.uri);
 }

 addTrack(track) {
   if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
    return;
    }
    let addNewTrack = this.state.playlistTracks.concat(track);
    this.setState({ playlistTracks: addNewTrack });
  }

 removeTrack(track) {
   const currentTracks = this.state.playlistTracks;
   const updatedTracks = currentTracks.filter(item => item.id !== track.id)

   this.setState({
     playlistTracks: updatedTracks
   })
 }

 updatePlaylistName(name) {
   this.setState({
     playlistName: name
   })
 }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
            onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;

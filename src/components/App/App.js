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
      playlistName: 'Playlist Name',
      playlistTracks: []
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

 savePlaylist(event) {
   let trackURIs = this.state.playlistTracks.map(track => track.uri);
   let response = Spotify.savePlaylist(this.state.playlistName, trackURIs);
   if (response) {
     this.setState({
       playlistTracks: [],
       playlistName: 'New Playlist' })
   }

    event.preventDefault()
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

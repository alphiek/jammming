import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import Loader from '../Loader/Loader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Playlist Name',
      playlistTracks: [],
      loading: false,
      message: 'Your Playlist is Saving'
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.handlePlaylistReset = this.handlePlaylistReset.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
  }

  search(term) {
    Spotify.search(term).then(results => {
       this.setState({ searchResults: results });
     });
}

 savePlaylist(event) {
   this.setState({
     loading: true
   })
   let trackURIs = this.state.playlistTracks.map(track => track.uri);
   let response = Spotify.savePlaylist(this.state.playlistName, trackURIs);
   if (response) {
     setTimeout(() => this.handleChangeMessage(), 2000);
     console.log(response)
   } else {
     console.log('error')
   }
    event.preventDefault()
 }

 handleChangeMessage() {
     this.setState({
       message: 'Your Playlist has saved'
     })
   this.handlePlaylistReset()
   }

handlePlaylistReset () {
  setTimeout(() =>
    this.setState({
     searchResults: [],
     playlistTracks: [],
     playlistName: 'New Playlist',
     message: 'Your Playlist is Saving',
     loading: false
   }), 2000);
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
      if (this.state.loading) {
        return < Loader messageChange={this.state.message}/>
      } else {
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
}

export default App;

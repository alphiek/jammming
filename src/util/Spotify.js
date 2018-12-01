let accessToken;
const clientId = '123d5255f2fc466db2d1f9ec1aead6af';
const redirectUri = 'http://localhost:3000/';

let Spotify = {
  getAccessToken () {
         if (accessToken) {
           return accessToken;
         } else {
           const obtainAccessToken = window.location.href.match(/access_token=([^&]*)/);
           const obtainExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
           if (obtainAccessToken && obtainExpiresIn) {
              accessToken = obtainAccessToken[1];
              const expiresIn = Number(obtainExpiresIn[1]);
              window.setTimeout(() => accessToken = '', expiresIn * 1000);
              window.history.pushState('Access Token', null, '/');
              return accessToken;
            } else {
              const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
              window.location = redirectUrl;
            }
          }
        },

  search(term) {
    accessToken = Spotify.getAccessToken()
    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    return fetch (endpoint,
    {
      headers: {Authorization: `Bearer ${accessToken}`}
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error ('Request Failed');
    }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      } else {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        });
      }
    });
  },

  savePlaylist(playlistName, trackUris) {
    if (!playlistName && !trackUris) {
      return;
    } else {
      accessToken = Spotify.getAccessToken();
      let headers = { headers: {Authorization: `Bearer ${accessToken}`}};
      let userID;
      let endpoint = `https://api.spotify.com/v1/me`;

      return fetch (endpoint, headers).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error ('Request Failed');
      }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
        if (!jsonResponse.id) {
          return;
        } else {
          userID = jsonResponse.id;
          endpoint = `https://api.spotify.com/v1/users/${userID}/playlists`;
          headers = { headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'}};
          let data = { name: `${playlistName}` };
          return fetch(endpoint, {
            method: 'POST',
            headers,
            body: data
          }).then(response => {
            if(response.ok) {
              return response.json();
            }
            throw new Error('Request Failed!');
          }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
            if (!jsonResponse.id) {
              window.alert(`not id`)
              return;
            } else {
              let playlistId = jsonResponse.id;
              window.alert(playlistId)
            }
          });
        }
      });
    }
  }
};

Spotify.savePlaylist('playlist' , ['erighaeh', 'saghargh']);
export default Spotify;

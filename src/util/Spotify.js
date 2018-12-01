let accessToken;
const clientId = '123d5255f2fc466db2d1f9ec1aead6af';
const redirectUri = 'http://localhost:3000/';
let name;
let trackURIs;

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
              console.log(accessToken);
              console.log(expiresIn);
              window.setTimeout(() => accessToken = '', expiresIn * 1000);
              window.history.pushState('Access Token', null, '/');
            } else {
              const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
              window.location = redirectUrl;
              console.log(`redirected`);
            }
          }
        },

  search(term) {
    //Spotify.getAccessToken()
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
        console.log(jsonResponse.tracks)
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
      console.log(`no playlist name or track URIs`);
      return;
    } else {
      let headers = { headers: {Authorization: `Bearer ${accessToken}`}};
      let userID;
      let endpoint = `https://api.spotify.com/v1/me`;
      name = playlistName;
      trackURIs = trackUris;

      return fetch (endpoint, headers).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error ('Request Failed');
      }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
        if (!jsonResponse.id) {
          console.log(`not user ID`);
          return;
        } else {
          console.log(jsonResponse.id);
          userID = jsonResponse.id;
          let userIdEndpoint = `https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userID}/playlists`;
          let data = JSON.stringify({'name': `${name}`});

          return fetch(userIdEndpoint, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-type': 'application/json'
            },
            body: data
        }).then(response => {
            if(response.ok) {
              return response.json();
            }
            throw new Error('Request Failed!');
          }, networkError => console.log(networkError.message)
        ).then(jsonResponse => {
            if (!jsonResponse.id) {
              console.log(`not playlist id`);
              return;
            } else {
              console.log(jsonResponse.id);
              let playlistID = jsonResponse.id;
              let tracksEndpoint = `https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
              let trackInfo = JSON.stringify({'uris': `${trackURIs}`});

              return fetch(tracksEndpoint, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-type': 'application/json'
                },
                body: trackInfo
              }).then(response => {
                if(response.ok) {
                  console.log(response);
                  return response.json();
                }
                throw new Error('Request Failed');
              }, networkError => console.log(networkError.message)
            ).then(jsonResponse => {
              if (!jsonResponse.snapshot_id) {
                window.alert(`no snapshot id received`)
                return;
              } else {

                window.alert(`tracks added`);
                return;
              }
            });
          }
          });
        }
      });
    }
  }
};

Spotify.getAccessToken();
//Spotify.savePlaylist('Playlist Test', ['spotify:track:4vnYwFOZCVl0bmerWyuzRw', 'spotify:track:618BQobGgCfEwwAph3vyNe']);
console.log(name);
console.log(trackURIs);
console.log(`statement 2 ${accessToken}`);
export default Spotify;

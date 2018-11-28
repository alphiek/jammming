const userAccessToken = '';
const client_id = '123d5255f2fc466db2d1f9ec1aead6af';
const redirect_uri = 'http://localhost:3000/';


const Spotify = {
  getAccessToken(userAccessToken) {
    if (access_token) {
      return access_token;
    }

    const obtainAccessToken = window.location.href.match(access_token=([^&]*));
    const obtainExpiresIn = window.location.href.match(expires_in=([^&]*));

    if (obtainAccessToken && obtainExpiresIn) {
      const access_token = obtainAccessToken;
      const expires_in = obtainExpiresIn;
      window.setTimeout(() => access_token = '', expires_in * 1000);
      window.history.pushState('Access Token', null, '/');
      window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
    }
  };

  search(term) {
    const empty = [];
    fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.track) {
        return jsonResponse.track.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        })
      } else {
        return empty;
      }
    })
  }
}

export default Spotify;

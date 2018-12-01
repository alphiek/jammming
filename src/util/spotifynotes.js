let accessToken;
const clientId = '123d5255f2fc466db2d1f9ec1aead6af';
const redirectUri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken () {
         if (accessToken) {
           return accessToken;
         };

         const obtainAccessToken = window.location.href.match(/access_token=([^&]*)/);
         const obtainExpiresIn = window.location.href.match(/expires_in=([^&]*)/);

         if (obtainAccessToken && obtainExpiresIn) {
            accessToken = obtainAccessToken[1];
            const expiresIn = Number(obtainExpiresIn[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            window.alert(`conditional 2 ${accessToken}`);
            return accessToken;
          } else {
            const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = redirectUrl;
            window.alert(`conditional 3`);
            return accessToken;

          }
        },

        search (term) {
          accessToken = Spotify.getAccessToken()
          const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`
          return fetch(endpoint,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }).then(response => {
              if (response.ok) {
                return response.json();
              }
              throw new Error ('Request Failed');
            }, networkError => console.log(networkError.message)
          ).then(jsonResponse => {
            if (jsonResponse.tracks) {
              return jsonResponse.tracks.items.map(track => {
                return {
                  id: track.id,
                  name: track.name,
                  album: track.album,
                  uri: track.uri
                }
              })
            } else {
              return [];
            }
          })
        }
      };


export default Spotify;


{
  id: '001',
  name: 'Track 1',
  artist: 'Artist 1',
  album: 'Album 1'
},
{
  id: '002',
  name: 'Track 2',
  artist: 'Artist 2',
  album: 'Album 2'
},
{
  id: '003',
  name: 'Track 3',
  artist: 'Artist 3',
  album: 'Album 3'
}

               return access_token;
               return access_token;

let access_token;
const client_id = '123d5255f2fc466db2d1f9ec1aead6af';
const redirect_uri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if (access_token !== null) {   //This checks if the value of access_token is not empty
      return access_token  // If not empty it returns the token.
    } else { // if empty this code block runs.
      const obtainAccessToken = window.location.href.match(access_token=(/[^&]*)/);
      //window.location.href returns the href (URL) of the current page, uses .match to retrieve the token key value pair as an array [^&]excludes from the search, * ??
      //access_token= will be the first match, ([^&]*) will be the second match so will return an array of two index items.
      // Save the returned token info to a variable which will be [access_token=, whatever the access token is]
      const obtainExpiresIn = window.location.href.match(expires_in=(/[^&]*)/);
      // Save the returned expires in to a variable, should return [expires_in=, whatever the expiration time is in milliseconds]
        if (obtainAccessToken !== null && obtainExpiresIn !== null) { // If the variables are not empty..then do this..
          access_token = obtainAccessToken[1]; // Set Global variable access_token equal to the second item in the obtainAccessToken variable [the value]
          const expires_in = obtainExpiresIn[1]; // Create a variable for the expires time equal to the second item in the obtainExpiresIn variable [the value]
          window.setTimeout(() => access_token = '', expires_in * 1000); // This invalidates the token when expired.
          window.history.pushState('Access Token', null, '/') // This clears the url.
        } else { // if obtainAccessToken or obtainExpiresIn are empty then this code block will run
          window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
          // redirect to spotifyURL
          return access_token // return the access_token - Will I need to extract the access_token from the URL again here and save to the global variable???
        }
      };
    }



{/* This takes the access token and sends to the API for information*/}
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

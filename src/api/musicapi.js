import axios from 'axios';
import base64 from 'react-native-base64';  // Import the base64 package

// Spotify API credentials
const CLIENT_ID = '5c215a103470445c8b44ce8d762e2178';  // Replace with your Client ID
const CLIENT_SECRET = '2dfc78f3d684486294adf402f33437cf';  // Replace with your Client Secret

// Function to get the access token from Spotify
const getAccessToken = async () => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,  // Base64 encode the credentials
        },
      }
    );
    return response.data.access_token;  // Return the access token
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

// Function to fetch albums by artist's name from Spotify
export const fetchAlbumsByArtist = async (artistName) => {
  const token = await getAccessToken();  // Get the access token
  if (!token) {
    console.error('No token, cannot fetch albums');
    return [];
  }

  try {
    // Search for the artist by name
    const searchResponse = await axios.get(
      `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const artist = searchResponse.data.artists.items[0];
    if (!artist) {
      console.error('Artist not found');
      return [];
    }

    // Fetch albums for the artist using their ID
    const albumsResponse = await axios.get(
      `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=album,single&limit=10`,  // Limit to albums and singles
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Albums Response:', albumsResponse.data);

    // Format and return albums data
    const albums = albumsResponse.data.items.map(album => ({
      id: album.id,
      title: album.name,
      artist: album.artists[0]?.name || 'Unknown Artist',
      image: album.images[0]?.url,  // Use the first image available
      description: album.release_date,  // Release date as description
    }));

    return albums;
  } catch (error) {
    console.error('Error fetching albums by artist:', error);
    return [];
  }
};

// Function to fetch album tracks based on album ID
export const fetchAlbumTracks = async (albumId) => {
  const token = await getAccessToken();  // Get the access token
  if (!token) {
    console.error('No token, cannot fetch album tracks');
    return [];
  }

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${albumId}/tracks`,  // Get album tracks by album ID
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Format and return track data
    const tracks = response.data.items.map(track => ({
      name: track.name,
      duration: track.duration_ms,  // Duration in milliseconds
    }));

    return tracks;
  } catch (error) {
    console.error('Error fetching album tracks:', error);
    return [];
  }
};

// Function to fetch search results based on artist or album name
export const fetchSearchResults = async (query) => {
  const token = await getAccessToken();  // Get the access token
  if (!token) {
    console.error('No token, cannot fetch search results');
    return [];
  }

  try {
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=album&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Use the access token
      },
    });

    // Format and return search results data
    const searchResults = response.data.albums.items.map(album => ({
      id: album.id,
      title: album.name,
      artist: album.artists[0]?.name || 'Unknown Artist',
      image: album.images[0]?.url,  // Use the first image available
      description: album.release_date,  // Release date as description
    }));

    return searchResults;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};

export const fetchNewReleases = async () => {
  const token = await getAccessToken();
  if (!token) {
    console.error('No token, cannot fetch new releases');
    return [];
  }

  try {
    const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Format and return album data
    return response.data.albums.items.map(album => ({
      id: album.id,
      title: album.name,
      artist: album.artists[0].name,
      image: album.images[0]?.url,
      releaseDate: album.release_date,
    }));
  } catch (error) {
    console.error('Error fetching new releases:', error);
    return [];
  }
};
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, StyleSheet, Image, ImageBackground } from 'react-native';
import { fetchSearchResults, fetchAlbumTracks } from '../api/musicapi';

const SearchScreen = () => {
  const [query, setQuery] = useState(''); // State to store the search query
  const [albums, setAlbums] = useState([]); // State to store search results (albums)
  const [selectedAlbum, setSelectedAlbum] = useState(null); // State to store selected album
  const [tracks, setTracks] = useState([]); // State to store tracks of selected album
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

  // Function to handle search
  const handleSearch = async () => {
    if (query.trim()) {
      const result = await fetchSearchResults(query);
      setAlbums(result);
    }
  };

  // Function to handle album selection
  const handleAlbumClick = async (albumId) => {
    // Fetch the album's tracks using the album ID
    const albumTracks = await fetchAlbumTracks(albumId);
    setTracks(albumTracks);
    setIsModalVisible(true); // Show the modal
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
    setTracks([]); // Reset the tracks
  };

  // Function to extract year from the release date
  const getReleaseYear = (releaseDate) => {
    return releaseDate.split('-')[0]; // Extract year from the release date (format: YYYY-MM-DD)
  };

  return (
    <ImageBackground
      source={require('../../assets/true.jpg')} // Replace with the path to your image
      style={styles.background}
    >

        <View style={styles.container}>
        <Text style={styles.title}>Search for Albums</Text>
        <TextInput
            style={styles.input}
            placeholder="Search by artist or album"
            value={query}
            onChangeText={setQuery}
            />
        <Button title="Search" onPress={handleSearch} />

        {/* Display albums */}
        <FlatList
            data={albums}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleAlbumClick(item.id)}>
                <View style={styles.albumContainer}>
                <Image source={{ uri: item.image }} style={styles.albumImage} />
                <View style={styles.albumInfo}>
                    <Text style={styles.albumTitle}>{item.title}</Text>
                    <Text>{item.artist}</Text>
                    <Text style={styles.albumYear}>{getReleaseYear(item.description)}</Text>
                </View>
                </View>
            </TouchableOpacity>
            )}
            />

        {/* Modal to show album tracks */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={closeModal}
            >
            <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Tracks in {selectedAlbum?.title}</Text>
                <FlatList
                data={tracks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.trackItem}>
                    <Text style={styles.trackName}>{item.name}</Text>
                    <Text style={styles.trackDuration}>
                        {Math.floor(item.duration / 60000)}:{Math.floor((item.duration % 60000) / 1000)
                        .toString()
                        .padStart(2, '0')}
                    </Text>
                    </View>
                )}
                />
                <Button title="Close" onPress={closeModal} />
            </View>
            </View>
        </Modal>
        </View>
    </ImageBackground>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 8,
  },
  albumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  albumImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  albumInfo: {
    flexDirection: 'column',
  },
  albumTitle: {
    fontWeight: 'bold',
  },
  albumYear: {
    fontSize: 12,
    color: 'gray',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  trackItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  trackName: {
    fontSize: 16,
  },
  trackDuration: {
    fontSize: 14,
    color: 'gray',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay to make text readable
    paddingHorizontal: 110, // Optional: add padding if needed
    borderRadius: 10, // Optional: round the corners
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
    color: '#fff', // White color for text to contrast against the background
  },
});

export default SearchScreen;
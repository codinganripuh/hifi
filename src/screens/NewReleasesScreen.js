import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { fetchNewReleases } from '../api/musicapi';

export default function NewReleasesScreen() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNewReleases = async () => {
      const data = await fetchNewReleases();
      setAlbums(data);
      setLoading(false);
    };
    loadNewReleases();
  }, []);

  const renderAlbum = ({ item }) => (
    <View style={styles.albumContainer}>
      <Image source={{ uri: item.image }} style={styles.albumImage} />
      <View style={styles.albumDetails}>
        <Text style={styles.albumTitle}>{item.title}</Text>
        <Text style={styles.albumArtist}>{item.artist}</Text>
        <Text style={styles.albumReleaseDate}>{item.releaseDate}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading New Releases...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Album Releases</Text>
      <FlatList
        data={albums}
        renderItem={renderAlbum}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  albumContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  albumImage: {
    width: 80,
    height: 80,
  },
  albumDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  albumArtist: {
    fontSize: 14,
    color: '#666',
  },
  albumReleaseDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#555',
  },
  listContainer: {
    paddingBottom: 20,
  },
});
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const MovieSearch = () => {
  const [movie, setMovie] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchMovie = async () => {
    if (!query) return;
    
    setLoading(true);
    setMovie(null);
    
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=3cdf70c4&t=${query}`
      );
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter movie title"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={fetchMovie} />
      
      {loading && <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 15 }} />}
      
      {movie && (
        <ScrollView contentContainerStyle={styles.movieContainer}>
          <Image source={{ uri: movie.Poster }} style={styles.poster} />
          <Text style={styles.movieTitle}>Movie Title: {movie.Title}</Text>
          <Text style={styles.movieDetails}>Release Year: {movie.Year}</Text>
          <Text style={styles.movieDetails}>Description: {movie.Plot}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, width: '80%', marginBottom: 10 },
  movieContainer: { marginTop: 20, alignItems: 'center' },
  poster: { width: 200, height: 300, marginBottom: 10 },
  movieTitle: { fontSize: 18, fontWeight: 'bold' },
  movieDetails: { fontSize: 16, marginTop: 5 }
});

export default MovieSearch;
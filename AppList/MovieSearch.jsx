import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Keyboard } from 'react-native';
import axios from 'axios';

const MovieSearch = () => {
  const [movie, setMovie] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovie = async () => {
    if (!query) {
      setError('Please enter a movie title');
      return;
    }
    
    Keyboard.dismiss();
    setLoading(true);
    setMovie(null);
    setError(null);
    
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=3cdf70c4&t=${query}`
      );
      
      if (response.data.Response === 'False') {
        setError('Movie not found');
      } else {
        setMovie(response.data);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setError('Failed to fetch movie data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MovieFinder</Text>
      <Text style={styles.subtitle}>Discover film details instantly</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for a movie..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={fetchMovie}
        />
        <TouchableOpacity style={styles.searchButton} onPress={fetchMovie}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      )}
      
      {movie && (
        <ScrollView style={styles.movieCard} contentContainerStyle={styles.movieContent}>
          <View style={styles.posterContainer}>
            <Image 
              source={{ uri: movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster' }} 
              style={styles.poster} 
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.detailsContainer}>
            <Text style={styles.movieTitle}>{movie.Title} ({movie.Year})</Text>
            
            <View style={styles.metaContainer}>
              <Text style={styles.metaText}>{movie.Rated} | {movie.Runtime}</Text>
              <Text style={styles.metaText}>{movie.Genre}</Text>
            </View>
            
            <View style={styles.ratingContainer}>
              {movie.Ratings.map((rating, index) => (
                <View key={index} style={styles.ratingItem}>
                  <Text style={styles.ratingSource}>{rating.Source}</Text>
                  <Text style={styles.ratingValue}>{rating.Value}</Text>
                </View>
              ))}
            </View>
            
            <Text style={styles.sectionTitle}>Plot</Text>
            <Text style={styles.plotText}>{movie.Plot}</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Director:</Text>
              <Text style={styles.infoText}>{movie.Director}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Cast:</Text>
              <Text style={styles.infoText}>{movie.Actors}</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#0F172A',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 32,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#1E293B',
    color: '#FFFFFF',
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#6366F1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  errorText: {
    color: '#F87171',
    marginBottom: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  loadingText: {
    color: '#94A3B8',
    marginTop: 10,
  },
  movieCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 16,
  },
  movieContent: {
    paddingBottom: 24,
  },
  posterContainer: {
    alignItems: 'center',
    paddingTop: 24,
  },
  poster: {
    width: '80%',
    height: 350,
    borderRadius: 8,
    backgroundColor: '#334155',
  },
  detailsContainer: {
    padding: 24,
  },
  movieTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  metaContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  metaText: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    padding: 12,
    backgroundColor: '#334155',
    borderRadius: 8,
  },
  ratingItem: {
    alignItems: 'center',
  },
  ratingSource: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  ratingValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  plotText: {
    color: '#E2E8F0',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    color: '#94A3B8',
    width: 80,
    fontSize: 14,
    fontWeight: '600',
  },
  infoText: {
    flex: 1,
    color: '#E2E8F0',
    fontSize: 14,
  },
});

export default MovieSearch;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, ImageBackground, Keyboard } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    Keyboard.dismiss();
    if (!city) {
      setError('Please enter a city name');
      return;
    }
    
    setLoading(true);
    setWeather(null);
    setError(null);

    try {
      const API_KEY = 'fc619f6c402629b169e0d9da68e5e7be';
      const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
      
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });

      setWeather(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (main) => {
    switch(main) {
      case 'Clear':
        return '☀️';
      case 'Clouds':
        return '☁️';
      case 'Rain':
        return '🌧️';
      case 'Snow':
        return '❄️';
      case 'Thunderstorm':
        return '⛈️';
      case 'Drizzle':
        return '🌦️';
      default:
        return '🌤️';
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/weather-bg.jpg')} // Replace with your own background image
      style={styles.background}
      blurRadius={2}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.3)']}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Weather Forecast</Text>
          <Text style={styles.subtitle}>Search for any city worldwide</Text>
          
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter city name"
              placeholderTextColor="#ccc"
              value={city}
              onChangeText={setCity}
              onSubmitEditing={fetchWeather}
            />
            <TouchableOpacity style={styles.searchButton} onPress={fetchWeather}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
          
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4A90E2" />
              <Text style={styles.loadingText}>Fetching weather data...</Text>
            </View>
          )}
          
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          
          {weather && (
            <View style={styles.weatherCard}>
              <View style={styles.weatherHeader}>
                <Text style={styles.cityText}>{weather.name}, {weather.sys.country}</Text>
                <Text style={styles.weatherMainText}>
                  {getWeatherIcon(weather.weather[0].main)} {weather.weather[0].main}
                </Text>
              </View>
              
              <View style={styles.weatherDetails}>
                <Text style={styles.temperatureText}>{Math.round(weather.main.temp)}°C</Text>
                <Text style={styles.descriptionText}>{weather.weather[0].description}</Text>
                
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Feels Like</Text>
                    <Text style={styles.statValue}>{Math.round(weather.main.feels_like)}°C</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Humidity</Text>
                    <Text style={styles.statValue}>{weather.main.humidity}%</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Wind</Text>
                    <Text style={styles.statValue}>{weather.wind.speed} m/s</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 30,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    paddingHorizontal: 15,
    borderRadius: 12,
    fontSize: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  searchButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 59, 48, 0.2)',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.5)',
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    fontSize: 16,
  },
  weatherCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  weatherHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    paddingBottom: 15,
    marginBottom: 15,
  },
  cityText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  weatherMainText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 5,
  },
  weatherDetails: {
    alignItems: 'center',
  },
  temperatureText: {
    color: '#fff',
    fontSize: 64,
    fontWeight: '200',
    marginVertical: 10,
  },
  descriptionText: {
    color: '#fff',
    fontSize: 18,
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 5,
  },
  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default WeatherSearch;
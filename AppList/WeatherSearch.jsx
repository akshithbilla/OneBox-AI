import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
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
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Search" onPress={fetchWeather} />
      
      {loading && <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 15 }} />}
      {error && <Text style={styles.error}>{error}</Text>}
      
      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>City: {weather.name}</Text>
          <Text style={styles.weatherText}>Temperature: {weather.main.temp}°C</Text>
          <Text style={styles.weatherText}>Weather: {weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, width: '80%', marginBottom: 10, borderRadius: 5, backgroundColor: '#fff' },
  weatherContainer: { marginTop: 20, padding: 15, backgroundColor: '#007BFF', borderRadius: 10, alignItems: 'center' },
  weatherText: { fontSize: 18, color: '#fff', marginBottom: 5 },
  error: { color: 'red', marginTop: 10, fontSize: 16 }
});

export default WeatherSearch;

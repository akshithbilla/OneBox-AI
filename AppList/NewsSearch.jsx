import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import axios from 'axios';

const NEWS_API_KEY = 'fe7e02c389db4e8a99835cc334bc876b';
const BASE_URL = 'https://newsapi.org/v2/everything';

const NewsSearch = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    if (!query) {
      setError('Please enter a search query');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apiKey: NEWS_API_KEY,
          q: query,
          language: 'en',
        },
      });
      
      if (response.data.articles.length === 0) {
        setError('No articles found');
      }
      
      setArticles(response.data.articles);
    } catch (err) {
      setError('Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20, backgroundColor: '#f5f5f5', flex: 1 }}>
      <TextInput
        placeholder="Enter search query"
        value={query}
        onChangeText={setQuery}
        style={{ 
          borderBottomWidth: 2, 
          borderBottomColor: '#007BFF', 
          marginBottom: 15, 
          padding: 10, 
          fontSize: 16, 
          backgroundColor: '#fff', 
          borderRadius: 5
        }}
      />
      <Button title="Search News" onPress={fetchNews} color="#007BFF" />
      
      {loading && <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 15 }} />}
      {error && <Text style={{ color: 'red', marginTop: 10, fontSize: 16 }}>{error}</Text>}
      
      <FlatList
        data={articles}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={{ 
              marginTop: 15, 
              padding: 15, 
              backgroundColor: '#fff', 
              borderRadius: 10, 
              shadowColor: '#000', 
              shadowOffset: { width: 0, height: 2 }, 
              shadowOpacity: 0.2, 
              shadowRadius: 4, 
              elevation: 3
            }}
            onPress={() => Linking.openURL(item.url)}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#007BFF' }}>{item.title}</Text>
            <Text style={{ fontSize: 14, color: '#555' }}>{item.source.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NewsSearch;

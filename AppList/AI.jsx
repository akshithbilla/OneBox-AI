import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const AI = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchGeminiResponse = async () => {
    if (!query) return;

    setLoading(true);
    setResponse('');

    const API_KEY = 'AIzaSyBgGGMjRi95r9IcSpLEUaF8EUIQ3bpHO50'; // Your API Key
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    try {
      const requestBody = {
        contents: [
          {
            parts: [{ text: query }]
          }
        ]
      };

      const res = await axios.post(URL, requestBody, {
        headers: { 'Content-Type': 'application/json' }
      });

      const generatedText = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received';
      setResponse(generatedText);
    } catch (error) {
      console.error('Error fetching data:', error.response?.data || error.message);
      setResponse('Failed to fetch response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ask Anything..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={fetchGeminiResponse} />
      
      {loading && <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 15 }} />}
      
      <ScrollView style={styles.responseContainer}>
        <Text style={styles.responseText}>{response}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, marginBottom: 10 },
  responseContainer: { marginTop: 10, padding: 10, backgroundColor: '#fff', borderRadius: 5 },
  responseText: { fontSize: 16, color: '#333' }
});

export default AI;

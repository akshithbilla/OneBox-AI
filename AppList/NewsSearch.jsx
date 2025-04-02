import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, TouchableOpacity, Linking, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NEWS_API_KEY = 'fe7e02c389db4e8a99835cc334bc876b';
const BASE_URL = 'https://newsapi.org/v2/everything';

const NewsSearch = () => {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }
    
    setLoading(true);
    setError(null);
    setArticles([]);
    
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apiKey: NEWS_API_KEY,
          q: query,
          language: 'en',
          pageSize: 20,
        },
      });
      
      if (response.data.articles.length === 0) {
        setError('No articles found for your search');
      } else {
        setArticles(response.data.articles);
      }
    } catch (err) {
      setError('Failed to fetch news. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderArticle = ({ item }) => (
    <TouchableOpacity 
      style={styles.articleCard}
      onPress={() => Linking.openURL(item.url)}
      activeOpacity={0.8}
    >
      {item.urlToImage && (
        <Image 
          source={{ uri: item.urlToImage }} 
          style={styles.articleImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.articleContent}>
        <Text style={styles.articleSource}>{item.source?.name || 'Unknown Source'}</Text>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleDescription} numberOfLines={2}>
          {item.description || 'No description available'}
        </Text>
        <View style={styles.articleFooter}>
          <Text style={styles.articleDate}>
            {new Date(item.publishedAt).toLocaleDateString()}
          </Text>
          <Icon name="arrow-forward" size={20} color="#6366F1" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>News Explorer</Text>
        <Text style={styles.headerSubtitle}>Stay updated with the latest news</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for news..."
          placeholderTextColor="#94A3B8"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={fetchNews}
          style={styles.searchInput}
        />
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={fetchNews}
          activeOpacity={0.8}
        >
          <Icon name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Searching news...</Text>
        </View>
      )}
      
      {error && (
        <View style={styles.errorContainer}>
          <Icon name="error-outline" size={40} color="#F87171" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <FlatList
        data={articles}
        keyExtractor={(item) => item.url + item.publishedAt}
        renderItem={renderArticle}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading && !error && (
            <View style={styles.emptyState}>
              <Icon name="search-off" size={48} color="#E2E8F0" />
              <Text style={styles.emptyText}>Search for news articles</Text>
              <Text style={styles.emptySubtext}>Try topics like "technology", "politics", or "sports"</Text>
            </View>
          )
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 24,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    position: 'relative',
  },
  searchInput: {
    flex: 1,
    height: 56,
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    paddingHorizontal: 20,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchButton: {
    position: 'absolute',
    right: 12,
    top: 8,
    width: 40,
    height: 40,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: '#64748B',
    marginTop: 16,
    fontSize: 16,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  errorText: {
    color: '#F87171',
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  listContent: {
    paddingBottom: 24,
  },
  articleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  articleImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#E2E8F0',
  },
  articleContent: {
    padding: 16,
  },
  articleSource: {
    color: '#6366F1',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  articleTitle: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 24,
  },
  articleDescription: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  articleDate: {
    color: '#94A3B8',
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default NewsSearch;
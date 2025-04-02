import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';

const AI = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  const fetchGeminiResponse = async () => {
    if (!query.trim()) return;

    const userMessage = { text: query, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setLoading(true);

    const API_KEY = 'AIzaSyBgGGMjRi95r9IcSpLEUaF8EUIQ3bpHO50';
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

      const botMessage = { 
        text: res.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received',
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setMessages(prev => [...prev, { 
        text: 'Failed to fetch response. Please try again.', 
        sender: 'bot' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>AI Assistant</Text>
            <View style={styles.headerStatus}>
              <View style={styles.statusIndicator} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
        </View>

        {/* Chat Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 ? (
            <View style={styles.welcomeContainer}>
              <View style={styles.welcomeIllustration}>
                <Ionicons name="sparkles" size={48} color="#6E6CEA" />
              </View>
              <Text style={styles.welcomeTitle}>How can I help you today?</Text>
              <Text style={styles.welcomeSubtitle}>Ask me anything, from creative ideas to technical explanations.</Text>
              
              <View style={styles.suggestionContainer}>
                <Text style={styles.suggestionTitle}>Try asking:</Text>
                <TouchableOpacity 
                  style={styles.suggestionButton}
                  onPress={() => setQuery("Explain quantum computing in simple terms")}
                >
                  <Text style={styles.suggestionText}>"Explain quantum computing in simple terms"</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.suggestionButton}
                  onPress={() => setQuery("Write a poem about artificial intelligence")}
                >
                  <Text style={styles.suggestionText}>"Write a poem about artificial intelligence"</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            messages.map((msg, index) => (
              <View 
                key={index} 
                style={[
                  styles.messageContainer, 
                  msg.sender === 'user' ? styles.userContainer : styles.botContainer
                ]}
              >
                <View style={styles.avatar}>
                  {msg.sender === 'user' ? (
                    <Ionicons name="person" size={20} color="#fff" />
                  ) : (
                    <Ionicons name="sparkles" size={20} color="#fff" />
                  )}
                </View>
                
                <View style={[
                  styles.messageBubble, 
                  msg.sender === 'user' ? styles.userBubble : styles.botBubble
                ]}>
                  {msg.sender === 'bot' ? (
                    <Markdown style={markdownStyles}>
                      {msg.text}
                    </Markdown>
                  ) : (
                    <Text style={styles.userMessageText}>{msg.text}</Text>
                  )}
                </View>
              </View>
            ))
          )}
          {loading && (
            <View style={[styles.messageContainer, styles.botContainer]}>
              <View style={styles.avatar}>
                <Ionicons name="sparkles" size={20} color="#fff" />
              </View>
              <View style={[styles.messageBubble, styles.botBubble]}>
                <ActivityIndicator size="small" color="#6E6CEA" />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Message AI Assistant..."
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
            multiline
            onSubmitEditing={fetchGeminiResponse}
          />
          <TouchableOpacity 
            style={[
              styles.sendButton, 
              !query.trim() && styles.disabledButton
            ]} 
            onPress={fetchGeminiResponse}
            disabled={loading || !query.trim()}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={!query.trim() ? '#9CA3AF' : '#fff'} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const markdownStyles = {
  body: {
    color: '#1F2937',
    fontSize: 16,
    lineHeight: 24,
  },
  heading1: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginVertical: 8,
  },
  heading2: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginVertical: 6,
  },
  paragraph: {
    marginVertical: 4,
  },
  link: {
    color: '#6E6CEA',
    textDecorationLine: 'underline',
  },
  list_item: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  bullet_list: {
    marginVertical: 4,
    paddingLeft: 16,
  },
  ordered_list: {
    marginVertical: 4,
    paddingLeft: 16,
  },
  code_inline: {
    backgroundColor: '#F3F4F6',
    padding: 2,
    borderRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  code_block: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 6,
    marginVertical: 8,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  blockquote: {
    backgroundColor: '#F3F4F6',
    borderLeftWidth: 4,
    borderLeftColor: '#6E6CEA',
    paddingLeft: 12,
    marginVertical: 8,
  },
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#fff',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  headerStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#6B7280',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  chatContent: {
    paddingVertical: 16,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  welcomeIllustration: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  suggestionContainer: {
    width: '100%',
    marginTop: 16,
  },
  suggestionTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    fontWeight: '500',
  },
  suggestionButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  suggestionText: {
    fontSize: 15,
    color: '#374151',
  },
  messageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  botContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6E6CEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 16,
  },
  userBubble: {
    backgroundColor: '#6E6CEA',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  userMessageText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    fontSize: 16,
    color: '#111827',
    marginRight: 12,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6E6CEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
  },
});

export default AI;
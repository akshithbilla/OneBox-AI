import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Platform, 
  useWindowDimensions 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Calculator from './Calculator';
import Todo from './Todo';
import Note from './Note';
import AI from './AI';
import MovieSearch from './MovieSearch';
import NewsSearch from './NewsSearch';
import WeatherSearch from './WeatherSearch';

const Stack = createStackNavigator();

const apps = [
  { id: 'ai', name: 'AI Assistant', icon: 'chatbubbles', color: '#6a1b9a', component: AI },
  { id: 'calculator', name: 'Calculator', icon: 'calculator', color: '#00838f', component: Calculator },
  { id: 'todo', name: 'To-Do List', icon: 'checkbox', color: '#2E7D32', component: Todo },
  { id: 'note', name: 'Notes', icon: 'document-text', color: '#FF8F00', component: Note },
  { id: 'news', name: 'News Search', icon: 'newspaper', color: '#C62828', component: NewsSearch },
  { id: 'weather', name: 'Weather', icon: 'partly-sunny', color: '#0277BD', component: WeatherSearch },
  { id: 'movies', name: 'Movie Search', icon: 'film', color: '#5E35B1', component: MovieSearch },
];

function AppCard({ app, navigation, cardSize }) {
  return (
    <TouchableOpacity 
      style={[styles.card, { 
        backgroundColor: app.color,
        width: cardSize,
        height: cardSize,
      }]}
      onPress={() => navigation.navigate(app.id)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Ionicons name={app.icon} size={cardSize * 0.2} color="white" />
        <Text style={[styles.cardText, { fontSize: cardSize * 0.08 }]}>{app.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

function HomeScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const isLandscape = width > height;
  
  const cardSize = isWeb 
    ? isLandscape 
      ? Math.min(width * 0.15, height * 0.3) 
      : Math.min(width * 0.4, height * 0.2)
    : Math.min(width * 0.4, height * 0.2);

  return (
    <View style={styles.container}>
      <View style={[
        styles.header, 
        isWeb && styles.webHeader,
        isLandscape && isWeb && styles.webLandscapeHeader
      ]}>
        <Text style={styles.headerTitle}>OneBox</Text>
        <Text style={styles.headerSubtitle}>App Hub</Text>
      </View>
      
      <ScrollView 
        contentContainerStyle={[
          styles.grid,
          isWeb && styles.webGrid,
          isLandscape && isWeb && styles.webLandscapeGrid
        ]}
      >
        {apps.map((app) => (
          <AppCard 
            key={app.id} 
            app={app} 
            navigation={navigation} 
            cardSize={cardSize}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default function Home() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={Platform.OS === 'web' ? styles.webBackButton : styles.nativeBackButton}
            >
              <Ionicons 
                name="arrow-back" 
                size={24} 
                color="white" 
              />
              {Platform.OS === 'web' && (
                <Text style={styles.webBackText}></Text>
              )}
            </TouchableOpacity>
          )
        })}
      >
        <Stack.Screen 
          name="OneBox" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        {apps.map((app) => (
          <Stack.Screen 
            key={app.id}
            name={app.id}
            component={app.component}
            options={{ title: app.name }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#6200ee',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  card: {
    margin: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    alignItems: 'center',
    padding: 16,
  },
  cardText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
  },
};

const mobileStyles = {
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 8,
  },
  nativeBackButton: {
    paddingLeft: 15,
  },
};

const webStyles = {
  webHeader: {
    paddingTop: 20,
    marginBottom: 30,
  },
  webLandscapeHeader: {
    paddingTop: 10,
    marginBottom: 20,
  },
  webGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 16,
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  webLandscapeGrid: {
    maxWidth: 1500,
  },
  webBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  webBackText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
};

const styles = StyleSheet.create({
  ...commonStyles,
  ...mobileStyles,
  ...webStyles,
});
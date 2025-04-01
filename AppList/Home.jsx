import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Calculator from './Calculator';
import Todo from './Todo';
import Note from './Note';
import AI from './AI';
import MovieSearch from './MovieSearch';
import NewsSearch from './NewsSearch';
import WeatherSearch from './WeatherSearch';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App List</Text>
      <Button
        title="AI App"
        onPress={() => navigation.navigate('AI')}
      />
      <Button
        title="Calculator App"
        onPress={() => navigation.navigate('Calculator')}
      />
      <Button
        title="To-Do App"
        onPress={() => navigation.navigate('Todo')}
      />
      <Button
        title="Notes App"
        onPress={() => navigation.navigate('Note')}
      />
      
      <Button
        title="NewsSearch App"
        onPress={() => navigation.navigate('NewsSearch')}
      />

<Button
        title="WeatherSearch App"
        onPress={() => navigation.navigate('WeatherSearch')}
      />
<Button
        title="Movie Search App"
        onPress={() => navigation.navigate('MovieSearch')}
      />
    </View>
  );
}

export default function Home() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OneBox">
        <Stack.Screen name="OneBox" component={HomeScreen} />
        <Stack.Screen name="AI" component={AI} />
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="Note" component={Note} />
        <Stack.Screen name="MovieSearch" component={MovieSearch} />
        <Stack.Screen name="NewsSearch" component={NewsSearch} />
        <Stack.Screen name="WeatherSearch" component={WeatherSearch} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

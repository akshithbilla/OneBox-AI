import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Note() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddNote = () => {
    if (editingIndex === null) {
      setNotes([...notes, note]);
    } else {
      const updatedNotes = notes.map((n, idx) => (idx === editingIndex ? note : n));
      setNotes(updatedNotes);
      setEditingIndex(null);
    }
    setNote('');
  };

  const handleEditNote = (index) => {
    setNote(notes[index]);
    setEditingIndex(index);
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, idx) => idx !== index));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.noteContainer}>
      <Text style={styles.noteText}>{item}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEditNote(index)} style={styles.button}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteNote(index)} style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write your note here..."
        value={note}
        onChangeText={(text) => setNote(text)}
      />
      <Button title={editingIndex === null ? 'Add Note' : 'Update Note'} onPress={handleAddNote} />
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  noteText: {
    flex: 1,
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 5,
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

 
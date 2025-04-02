import React, { useState } from 'react';
import { SafeAreaView, TextInput, FlatList, View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Note() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddNote = () => {
    if (!note.trim()) return;
    
    if (editingIndex === null) {
      setNotes([{
        id: Date.now().toString(),
        content: note,
        date: new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
      }, ...notes]);
    } else {
      const updatedNotes = notes.map((n, idx) => 
        idx === editingIndex ? { ...n, content: note } : n
      );
      setNotes(updatedNotes);
      setEditingIndex(null);
    }
    setNote('');
    Keyboard.dismiss();
  };

  const handleEditNote = (index) => {
    setNote(notes[index].content);
    setEditingIndex(index);
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((_, idx) => idx !== index));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.noteCard}>
      <View style={styles.noteHeader}>
        <View style={styles.avatarPlaceholder}>
          <Icon name="person" size={20} color="#64748B" />
        </View>
        <Text style={styles.noteDate}>{item.date}</Text>
      </View>
      <Text style={styles.noteContent}>{item.content}</Text>
      <View style={styles.noteActions}>
        <TouchableOpacity 
          onPress={() => handleEditNote(index)} 
          style={styles.actionButton}
        >
          <Icon name="edit" size={20} color="#64748B" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => handleDeleteNote(index)} 
          style={styles.actionButton}
        >
          <Icon name="delete-outline" size={20} color="#F87171" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notes</Text>
        <Text style={styles.headerSubtitle}>Capture your thoughts</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          placeholderTextColor="#94A3B8"
          value={note}
          onChangeText={setNote}
          multiline
          onSubmitEditing={handleAddNote}
        />
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddNote}
          activeOpacity={0.8}
        >
          <Icon 
            name={editingIndex === null ? "add" : "check"} 
            size={24} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="note-add" size={48} color="#E2E8F0" />
            <Text style={styles.emptyText}>No notes yet</Text>
            <Text style={styles.emptySubtext}>Add your first note above</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 24,
    marginBottom: 20,
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
  inputContainer: {
    marginBottom: 24,
    position: 'relative',
  },
  input: {
    minHeight: 120,
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
    padding: 20,
    borderRadius: 12,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  addButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 48,
    height: 48,
    backgroundColor: '#6366F1',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  listContainer: {
    paddingBottom: 40,
  },
  noteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteDate: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  noteContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#0F172A',
    marginBottom: 16,
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  actionButton: {
    marginLeft: 16,
    padding: 4,
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
  },
});
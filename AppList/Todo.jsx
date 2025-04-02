import React, { useState } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, Text, View, TextInput, StyleSheet, Keyboard } from 'react-native';
import { Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Todo = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  
  const handleAddTask = () => {
    if (task.trim() === '') return;
    
    const newTask = {
      id: Date.now().toString(),
      text: task,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTasks([newTask, ...tasks]);
    setTask('');
    Keyboard.dismiss();
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Today's Tasks</Text>
        <Text style={styles.taskCount}>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</Text>
      </View>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What needs to be done?"
          placeholderTextColor="#94A3B8"
          value={task}
          onChangeText={setTask}
          onSubmitEditing={handleAddTask}
        />
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAddTask}
          activeOpacity={0.8}
        >
          <Icon name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={[styles.taskCard, item.completed && styles.completedTaskCard]}>
            <TouchableOpacity 
              style={styles.checkboxContainer}
              onPress={() => handleToggleComplete(item.id)}
            >
              <View style={[styles.checkbox, item.completed && styles.checkedBox]}>
                {item.completed && (
                  <Icon name="check" size={16} color="#FFFFFF" />
                )}
              </View>
            </TouchableOpacity>
            
            <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
              {item.text}
            </Text>
            
            <TouchableOpacity 
              onPress={() => handleDeleteTask(item.id)} 
              style={styles.deleteButton}
              activeOpacity={0.6}
            >
              <Icon name="delete-outline" size={22} color="#F87171" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="check-circle" size={48} color="#E2E8F0" />
            <Text style={styles.emptyStateText}>No tasks yet</Text>
            <Text style={styles.emptyStateSubtext}>Add a task to get started</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginTop: 32,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  taskCount: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 52,
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
  addButton: {
    width: 52,
    height: 52,
    backgroundColor: '#6366F1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  listContent: {
    paddingBottom: 24,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  completedTaskCard: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  checkboxContainer: {
    padding: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#6366F1',
    borderColor: '#6366F1',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
    marginLeft: 12,
    marginRight: 12,
  },
  completedTaskText: {
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
});

export default Todo;
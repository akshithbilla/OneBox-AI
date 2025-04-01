import React, { useState } from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, Text, View, TextInput, StyleSheet } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';

const Todo = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  
  const handleAddTask = () => {
    if (task.trim() === '') return;
    
    const newTask = {
      id: Date.now().toString(),
      text: task,
      completed: false,
    };
    
    setTasks([...tasks, newTask]);
    setTask('');
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
       
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={setTask}
        />
        <Button icon="plus" mode="contained" onPress={handleAddTask} style={styles.addButton}>
          Add Task
        </Button>
      </View>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={[styles.taskContainer, item.completed && styles.completedTask]}>
            <Checkbox
              status={item.completed ? 'checked' : 'unchecked'}
              onPress={() => handleToggleComplete(item.id)}
            />
            <Text style={[styles.taskText, item.completed && styles.completedText]}>
              {item.text}
            </Text>
            <TouchableOpacity onPress={() => handleDeleteTask(item.id)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginLeft:13,
    marginRight: 13,
    backgroundColor: '#fff',
  },
  addButton: {
    padding: 3,
    borderRadius: 10,
    backgroundColor: '#007BFF',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  completedTask: {
    backgroundColor: '#e0e0e0',
  },
  taskText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default Todo;

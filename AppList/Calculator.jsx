import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (value) => {
    if (value === '=') {
      try {
        // Replace non-JS operators with JavaScript operators
        const formattedInput = input
          .replace('÷', '/')
          .replace('×', '*')
          .replace('%', '/100')
          .replace('^', '**'); // handle power operator if needed
        setResult(eval(formattedInput).toString());
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '⌫') {
      setInput(input.slice(0, -1));
    } else if (value === '+/-') {
      setInput(input.charAt(0) === '-' ? input.slice(1) : `-${input}`);
    } else {
      setInput(input + value);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{result || input || '0'}</Text>
      <View style={styles.row}>
        {['⌫', '+/-', '%', '÷'].map((item) => (
          <Button key={item} value={item} onPress={handlePress} operator />
        ))}
      </View>
      <View style={styles.row}>
        {['7', '8', '9', '×'].map((item) => (
          <Button key={item} value={item} onPress={handlePress} />
        ))}
      </View>
      <View style={styles.row}>
        {['4', '5', '6', '-'].map((item) => (
          <Button key={item} value={item} onPress={handlePress} />
        ))}
      </View>
      <View style={styles.row}>
        {['1', '2', '3', '+'].map((item) => (
          <Button key={item} value={item} onPress={handlePress} />
        ))}
      </View>
      <View style={styles.row}>
        {['C', '0', '.', '='].map((item) => (
          <Button key={item} value={item} onPress={handlePress} operator={item === '='} />
        ))}
      </View>
    </View>
  );
};

const Button = ({ value, onPress, operator }) => (
  <TouchableOpacity style={[styles.button, operator && styles.operatorButton]} onPress={() => onPress(value)}>
    <Text style={[styles.buttonText, operator && styles.operatorText]}>{value}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  result: {
    fontSize: 72,
    color: 'black',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#E0E0E0',
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 32,
    color: 'black',
  },
  operatorButton: {
    backgroundColor: '#FFA500',
  },
  operatorText: {
    color: 'white',
  },
});

export default Calculator;

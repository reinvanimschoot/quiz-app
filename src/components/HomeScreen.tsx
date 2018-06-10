import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const HomeScreen = props => {
  return (
    <View style={{ margin: 40 }}>
      <Text>Welcome to the Trivia Challenge!</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('QuizScreen')}>
        <Text>BEGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

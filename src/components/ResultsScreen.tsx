import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ResultsScreen = props => {
  return (
    <View style={{ margin: 40 }}>
      <Text>ResultsScreen</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('HomeScreen')}>
        <Text>PLAY AGAIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultsScreen;

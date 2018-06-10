import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { graphql } from 'react-apollo';

// Queries / Mutations
import { TRIVIA_QUESTIONS } from '../graphql/queries';

class QuizScreen extends PureComponent {
  render() {
    return (
      <View style={{ margin: 40 }}>
        <Text>QuizScreen</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ResultsScreen')}>
          <Text>FINISH</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default graphql(TRIVIA_QUESTIONS, {
  props: ({ data: { loading, questions } }) => ({
    questions: loading ? null : questions.results,
    loading,
  }),
})(QuizScreen);

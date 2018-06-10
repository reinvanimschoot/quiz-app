import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { compose, graphql } from 'react-apollo';

// Queries / Mutations
import { ANSWERED_QUESTIONS } from '../graphql/queries';
import { CLEAR_ANSWERED_QUESTIONS } from '../graphql/mutations';

class ResultsScreen extends PureComponent {
  handlePlayAgain = () => {
    this.props.clearAnsweredQuestions();
    return this.props.navigation.popToTop();
  };

  renderQuestions = () => {
    const { answeredQuestions } = this.props;

    return (
      <FlatList
        data={answeredQuestions}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => <Text>{item.question}</Text>}
      />
    );
  };

  render() {
    const { answeredQuestions, correctQuestionsCount } = this.props;

    return (
      <View style={{ margin: 40 }}>
        <Text>ResultsScreen</Text>
        <Text>
          {correctQuestionsCount}/{answeredQuestions.length}
        </Text>
        {this.renderQuestions()}
        <TouchableOpacity onPress={this.handlePlayAgain}>
          <Text>PLAY AGAIN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default compose(
  graphql(ANSWERED_QUESTIONS, {
    props: ({ data: { answeredQuestions } }) => {
      const correctQuestionsCount = answeredQuestions.filter(q => q.userAnswer === q.correctAnswer)
        .length;

      return {
        correctQuestionsCount,
        answeredQuestions,
      };
    },
  }),
  graphql(CLEAR_ANSWERED_QUESTIONS, { name: 'clearAnsweredQuestions' }),
)(ResultsScreen);

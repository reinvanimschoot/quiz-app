import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { compose, graphql } from 'react-apollo';

// Queries / Mutations
import { ANSWERED_QUESTIONS } from '../../graphql/queries';
import { CLEAR_ANSWERED_QUESTIONS } from '../../graphql/mutations';

import { Container, Title, Divider, SubTitle } from './styles';

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
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              paddingBottom: 5,
              borderBottomColor: 'gainsboro',
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ color: 'white' }}>{item.question}</Text>
          </View>
        )}
      />
    );
  };

  render() {
    const { answeredQuestions, correctQuestionsCount } = this.props;

    return (
      <Container>
        <Title>The results are in!</Title>
        <Divider />
        <SubTitle>
          {correctQuestionsCount} / {answeredQuestions.length}
        </SubTitle>
        <Divider />
        {this.renderQuestions()}
        <TouchableOpacity onPress={this.handlePlayAgain}>
          <Text>PLAY AGAIN</Text>
        </TouchableOpacity>
      </Container>
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

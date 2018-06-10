import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { compose, graphql } from 'react-apollo';

// Queries / Mutations
import { TRIVIA_QUESTIONS } from '../graphql/queries';
import { ADD_ANSWERED_QUESTION } from '../graphql/mutations';

interface Props {
  addAnsweredQuestion: Function;
}

class QuizScreen extends PureComponent<Props> {
  state = {
    questionCount: 0,
  };

  handleAnswering = async (answer: string) => {
    const { questionCount } = this.state;
    const { questions, navigation } = this.props;

    await this.props.addAnsweredQuestion({
      variables: {
        question: questions[this.state.questionCount].question,
        userAnswer: answer,
        correctAnswer: questions[this.state.questionCount].correct_answer,
      },
    });

    if (questionCount + 1 === questions.length) {
      return navigation.navigate('ResultsScreen');
    } else {
      this.setState({ questionCount: questionCount + 1 });
    }
  };

  render() {
    const { loading, questions } = this.props;

    if (loading) {
      return (
        <View style={{ margin: 40 }}>
          <Text>LOADING...</Text>
        </View>
      );
    }

    return (
      <View style={{ margin: 40 }}>
        <Text>{questions[this.state.questionCount].category}</Text>
        <Text>{questions[this.state.questionCount].question}</Text>

        <TouchableOpacity onPress={() => this.handleAnswering('True')}>
          <Text>TRUE</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.handleAnswering('False')}>
          <Text>FALSE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default compose(
  graphql(ADD_ANSWERED_QUESTION, { name: 'addAnsweredQuestion' }),
  graphql(TRIVIA_QUESTIONS, {
    options: () => ({
      fetchPolicy: 'network-only',
    }),
    props: ({ data: { loading, triviaQuestions } }) => ({
      questions: loading ? null : triviaQuestions.results,
      loading,
    }),
  }),
)(QuizScreen);

import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { compose, graphql } from 'react-apollo';
import { AnsweredQuestion } from '../../graphql/localState';

// Components
import QuestionItem from './QuestionItem';

// Queries / Mutations
import { ANSWERED_QUESTIONS } from '../../graphql/queries';
import { CLEAR_ANSWERED_QUESTIONS } from '../../graphql/mutations';

// Styles
import { Container, Title, Divider, SubTitle } from '../commonStyles';
import { ResultContainer, PlayAgainButton, PlayAgainText } from './styles';
import { NavigationScreenProp } from 'react-navigation';

// Types
interface Props {
  navigation: NavigationScreenProp<any, any>;
  clearAnsweredQuestions: Function;
  answeredQuestions: AnsweredQuestion[];
  correctQuestionsCount: number;
}

class ResultsScreen extends PureComponent<Props> {
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
        style={{ flex: 0.7 }}
        renderItem={({ item }) => <QuestionItem {...item} />}
      />
    );
  };

  render() {
    const { answeredQuestions, correctQuestionsCount } = this.props;

    return (
      <Container>
        <ResultContainer>
          <Title>The results are in!</Title>
          <Divider />
          <SubTitle>
            {correctQuestionsCount} / {answeredQuestions.length}
          </SubTitle>
        </ResultContainer>

        <Divider />

        {this.renderQuestions()}

        <Divider />

        <View style={{ alignItems: 'center', padding: 30 }}>
          <PlayAgainButton onPress={this.handlePlayAgain}>
            <PlayAgainText>PLAY AGAIN</PlayAgainText>
          </PlayAgainButton>
        </View>
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

import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { compose, graphql } from 'react-apollo';
import { AnsweredQuestion } from '../../graphql/localState';
import { NavigationScreenProp } from 'react-navigation';
import Confetti from 'react-native-confetti';

// Components
import QuestionItem from './QuestionItem';

// Queries / Mutations
import { ANSWERED_QUESTIONS } from '../../graphql/queries';
import { CLEAR_ANSWERED_QUESTIONS } from '../../graphql/mutations';

// Styles
import { Container, Title, Divider, SubTitle } from '../commonStyles';
import { ResultContainer, PlayAgainButton, PlayAgainText, PlayAgainContainer } from './styles';

// Types
interface Props {
  navigation: NavigationScreenProp<any, any>;
  clearAnsweredQuestions: Function;
  answeredQuestions: AnsweredQuestion[];
  correctQuestionsCount: number;
}

class ResultsScreen extends PureComponent<Props> {
  ConfettiView = React.createRef();

  componentDidMount() {
    if (this.ConfettiView) {
      this.ConfettiView.current.startConfetti();
    }
  }

  componentWillUnmount() {
    if (this.ConfettiView) {
      this.ConfettiView.current.stopConfetti();
    }
  }

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
        <Confetti confettiCount={60} duration={3000} ref={this.ConfettiView} />

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

        <PlayAgainContainer>
          <PlayAgainButton onPress={this.handlePlayAgain}>
            <PlayAgainText>PLAY AGAIN</PlayAgainText>
          </PlayAgainButton>
        </PlayAgainContainer>
      </Container>
    );
  }
}

export default compose(
  graphql<{}, { answeredQuestions: AnsweredQuestion[] }, {}, {}>(ANSWERED_QUESTIONS, {
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

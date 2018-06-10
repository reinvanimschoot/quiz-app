import React, { PureComponent } from 'react';
import { compose, graphql } from 'react-apollo';
import { AllHtmlEntities } from 'html-entities';
import { NavigationScreenProp } from 'react-navigation';

const entities = new AllHtmlEntities();

// Queries / Mutations
import { TRIVIA_QUESTIONS, OPTIONS } from '../../graphql/queries';
import { ADD_ANSWERED_QUESTION } from '../../graphql/mutations';

// Styles
import { Container, Title, SubTitle, Divider } from '../commonStyles';
import { CardContainer, CardText, AnswerButton, AnswerText, AnswerContainer } from './styles';

// Types
interface Props {
  addAnsweredQuestion: Function;
  navigation: NavigationScreenProp<any, any>;
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
        question: questions[questionCount].question,
        userAnswer: answer,
        correctAnswer: questions[questionCount].correctAnswer,
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
        <Container centered>
          <Title>READY, SET, GO!</Title>
        </Container>
      );
    }

    return (
      <Container centered>
        <Title>{questions[this.state.questionCount].category}</Title>

        <Divider />

        <CardContainer>
          <CardText>{questions[this.state.questionCount].question}</CardText>
        </CardContainer>

        <SubTitle>
          {this.state.questionCount + 1} / {questions.length}
        </SubTitle>
        <Divider />

        <AnswerContainer>
          <AnswerButton color="#ff5555" onPress={() => this.handleAnswering('False')}>
            <AnswerText color="#ff5555">FALSE</AnswerText>
          </AnswerButton>

          <AnswerButton color="#50fa7b" onPress={() => this.handleAnswering('True')}>
            <AnswerText color="#50fa7b">TRUE</AnswerText>
          </AnswerButton>
        </AnswerContainer>

        <Divider />
      </Container>
    );
  }
}

export default compose(
  graphql(ADD_ANSWERED_QUESTION, { name: 'addAnsweredQuestion' }),
  graphql(OPTIONS, { name: 'options' }),
  graphql(TRIVIA_QUESTIONS, {
    options: ({ options: { questionAmount, difficulty } }) => ({
      fetchPolicy: 'network-only',
      variables: { questionAmount, difficulty },
    }),
    props: ({ data: { loading, triviaQuestions } }) => {
      const formattedQuestions = loading
        ? null
        : triviaQuestions.results.map(q => {
            return {
              question: entities.decode(q.question),
              category: q.category,
              correctAnswer: q.correct_answer,
            };
          });

      return {
        questions: loading ? null : formattedQuestions,
        loading,
      };
    },
  }),
)(QuizScreen);

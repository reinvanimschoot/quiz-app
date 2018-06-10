import React, { PureComponent } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { compose, graphql } from 'react-apollo';
import { AllHtmlEntities } from 'html-entities';
import { NavigationScreenProp } from 'react-navigation';
import { Question, Options, QuestionApiResponse } from '../../types';

const entities = new AllHtmlEntities();

// Queries / Mutations
import { TRIVIA_QUESTIONS, OPTIONS } from '../../graphql/queries';
import { ADD_ANSWERED_QUESTION, CLEAR_ANSWERED_QUESTIONS } from '../../graphql/mutations';

// Styles
import { green, red } from '../../constants/colors';
import { Container, Title, SubTitle, Divider } from '../commonStyles';
import {
  CardContainer,
  CardText,
  AnswerButton,
  AnswerText,
  AnswerContainer,
  QuitText,
} from './styles';

// Types
interface Props {
  addAnsweredQuestion: Function;
  clearAnsweredQuestions: Function;
  navigation: NavigationScreenProp<any, any>;
  questions: Question[];
  loading: boolean;
}

class QuizScreen extends PureComponent<Props> {
  state = {
    questionCount: 0,
  };

  handleQuitting = () => {
    Alert.alert(
      'Quit Game',
      'Are you sure?',
      [
        {
          text: 'Quit',
          onPress: () => {
            this.props.clearAnsweredQuestions();

            return this.props.navigation.popToTop();
          },
          style: 'destructive',
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: false },
    );
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
          <AnswerButton color={red} onPress={() => this.handleAnswering('False')}>
            <AnswerText color={red}>FALSE</AnswerText>
          </AnswerButton>

          <AnswerButton color={green} onPress={() => this.handleAnswering('True')}>
            <AnswerText color={green}>TRUE</AnswerText>
          </AnswerButton>
        </AnswerContainer>

        <Divider />
        <TouchableOpacity onPress={this.handleQuitting}>
          <QuitText>QUIT</QuitText>
        </TouchableOpacity>
      </Container>
    );
  }
}

export default compose(
  graphql(ADD_ANSWERED_QUESTION, { name: 'addAnsweredQuestion' }),
  graphql(CLEAR_ANSWERED_QUESTIONS, { name: 'clearAnsweredQuestions' }),
  graphql(OPTIONS, { name: 'options' }),
  graphql<{ options: Options }, { triviaQuestions: QuestionApiResponse }, {}, {}>(
    TRIVIA_QUESTIONS,
    {
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
    },
  ),
)(QuizScreen);

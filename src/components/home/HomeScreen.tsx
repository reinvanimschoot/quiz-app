import React, { PureComponent } from 'react';
import { graphql, compose } from 'react-apollo';
import { NavigationScreenProp } from 'react-navigation';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import { Options } from '../../types';

// Queries / Mutations
import { OPTIONS } from '../../graphql/queries';
import { SET_DIFFICULTY, SET_QUESTION_AMOUNT } from '../../graphql/mutations';

// Styles
import { Container, Title, SubTitle, Divider } from '../commonStyles';
import { OptionButton, BeginButton, BeginText, OptionText } from './styles';

// Types
interface Props {
  difficulty: string;
  questionAmount: string;
  setQuestionAmount: Function;
  setDifficulty: Function;
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  options: string[];
  cancelIndex: number;
  title: string;
  onPressCB: Function;
}

class HomeScreen extends PureComponent<Props> {
  state: State = {
    options: [],
    cancelIndex: null,
    title: null,
    onPressCB: null,
  };

  ActionSheet = React.createRef();

  handleQuestionAmountSelect = () => {
    const options = ['5', '10', '15', '20', 'Cancel'];
    this.setState({
      options,
      cancelIndex: 4,
      title: 'Select question amount',
      onPressCB: (index: number) => {
        if (index < 4) {
          this.props.setQuestionAmount({ variables: { questionAmount: options[index] } });
        }
      },
    });

    this.ActionSheet.current.show();
  };

  handleDifficultySelect = () => {
    const options = ['Easy', 'Medium', 'Hard', 'Cancel'];
    this.setState({
      options,
      cancelIndex: 3,
      title: 'Select difficulty',
      onPressCB: (index: number) => {
        if (index < 3) {
          this.props.setDifficulty({ variables: { difficulty: options[index].toLowerCase() } });
        }
      },
    });

    this.ActionSheet.current.show();
  };

  render() {
    return (
      <Container centered>
        <Title>WELCOME TO</Title>
        <Title>THE TRIVIA CHALLENGE!</Title>

        <Divider />

        <SubTitle>Can you score 100% on these True or False questions?</SubTitle>

        <Divider />

        <OptionButton onPress={this.handleQuestionAmountSelect}>
          <OptionText>QUESTION AMOUNT: {this.props.questionAmount}</OptionText>
        </OptionButton>

        <OptionButton onPress={this.handleDifficultySelect}>
          <OptionText>DIFFICULTY: {this.props.difficulty}</OptionText>
        </OptionButton>

        <Divider />

        <BeginButton onPress={() => this.props.navigation.navigate('QuizScreen')}>
          <BeginText>BEGIN</BeginText>
        </BeginButton>

        <Divider />

        <ActionSheet
          ref={this.ActionSheet}
          options={this.state.options}
          cancelButtonIndex={this.state.cancelIndex}
          title={this.state.title}
          onPress={this.state.onPressCB}
        />
      </Container>
    );
  }
}

export default compose(
  graphql(SET_DIFFICULTY, { name: 'setDifficulty' }),
  graphql(SET_QUESTION_AMOUNT, { name: 'setQuestionAmount' }),
  graphql<{}, Options, {}, {}>(OPTIONS, {
    props: ({ data }) => ({
      questionAmount: data.questionAmount,
      difficulty: data.difficulty.toUpperCase(),
    }),
  }),
)(HomeScreen);

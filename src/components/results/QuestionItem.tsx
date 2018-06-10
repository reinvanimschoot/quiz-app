import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// Styles
import { QuestionContainer, QuestionText } from './styles';

// Types
interface Props {
  question: string;
  userAnswer: string;
  correctAnswer: string;
}

class QuestionItem extends PureComponent<Props> {
  render() {
    const { question, userAnswer, correctAnswer } = this.props;
    const answerWasCorrect = userAnswer === correctAnswer;

    const iconName = answerWasCorrect ? 'check' : 'remove';
    const iconColor = answerWasCorrect ? '#50fa7b' : '#ff5555';

    return (
      <QuestionContainer>
        <Icon name={iconName} size={25} color={iconColor} />
        <QuestionText>{question}</QuestionText>
      </QuestionContainer>
    );
  }
}

export default QuestionItem;

import gql from 'graphql-tag';

// Local state
export const ADD_ANSWERED_QUESTION = gql`
  mutation($question: String!, $userAnswer: String!, $correctAnswer: String!) {
    addAnsweredQuestion(
      question: $question
      userAnswer: $userAnswer
      correctAnswer: $correctAnswer
    ) @client
  }
`;

export const CLEAR_ANSWERED_QUESTIONS = gql`
  mutation {
    clearAnsweredQuestions @client
  }
`;

export const SET_DIFFICULTY = gql`
  mutation($difficulty: String!) {
    setDifficulty(difficulty: $difficulty) @client
  }
`;

export const SET_QUESTION_AMOUNT = gql`
  mutation($questionAmount: String!) {
    setQuestionAmount(questionAmount: $questionAmount) @client
  }
`;

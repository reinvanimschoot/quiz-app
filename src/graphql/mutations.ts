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

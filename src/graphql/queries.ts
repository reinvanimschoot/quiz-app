import gql from 'graphql-tag';

export const TRIVIA_QUESTIONS = gql`
  query($questionAmount: String!, $difficulty: String!) {
    triviaQuestions(questionAmount: $questionAmount, difficulty: $difficulty)
      @rest(
        type: "TriviaQuestionsPayload"
        path: "/api.php?amount=:questionAmount&difficulty=:difficulty&type=boolean"
      ) {
      results
    }
  }
`;

// Local state
export const ANSWERED_QUESTIONS = gql`
  query {
    answeredQuestions @client {
      question
      userAnswer
      correctAnswer
    }
  }
`;

export const OPTIONS = gql`
  query {
    difficulty @client
    questionAmount @client
  }
`;

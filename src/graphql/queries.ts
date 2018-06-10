import gql from 'graphql-tag';

export const TRIVIA_QUESTIONS = gql`
  query {
    triviaQuestions(amount: 5, difficulty: "easy")
      @rest(
        type: "TriviaQuestionsPayload"
        path: "/api.php?amount=:amount&difficulty=:difficulty&type=boolean"
      ) {
      results
    }
  }
`;

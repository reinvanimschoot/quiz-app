import { Context } from 'react-apollo';

import { ANSWERED_QUESTIONS } from './queries';

export const defaults: { answeredQuestions: AnsweredQuestion[] } = {
  answeredQuestions: [],
};

export const resolvers = {
  Mutation: {
    addAnsweredQuestion: (
      _: never,
      { question, userAnswer, correctAnswer }: AnsweredQuestion,
      { cache }: Context,
    ): null => {
      const previous = cache.readQuery({ query: ANSWERED_QUESTIONS });

      const answeredQuestion = {
        question,
        userAnswer,
        correctAnswer,
        __typename: 'AnsweredQuestion',
      };

      const data = {
        answeredQuestions: previous.answeredQuestions.concat([answeredQuestion]),
      };

      cache.writeData({ data });

      return null;
    },
    clearAnsweredQuestions: (_: never, args: never, { cache }: Context): null => {
      cache.writeData({ data: { answeredQuestions: [] } });
      return null;
    },
  },
};

// Types
export interface AnsweredQuestion {
  question: string;
  userAnswer: string;
  correctAnswer: string;
}

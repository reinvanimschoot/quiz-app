import { Context } from 'react-apollo';

import { ANSWERED_QUESTIONS } from './queries';

// Types
export interface AnsweredQuestion {
  question: string;
  userAnswer: string;
  correctAnswer: string;
}

export const defaults: {
  answeredQuestions: AnsweredQuestion[];
  questionAmount: string;
  difficulty: string;
} = {
  answeredQuestions: [],
  difficulty: 'medium',
  questionAmount: '10',
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
    setDifficulty: (_: never, { difficulty }: { difficulty: string }, { cache }: Context): null => {
      cache.writeData({ data: { difficulty } });
      return null;
    },
    setQuestionAmount: (
      _: never,
      { questionAmount }: { questionAmount: string },
      { cache }: Context,
    ): null => {
      cache.writeData({ data: { questionAmount } });
      return null;
    },
  },
};

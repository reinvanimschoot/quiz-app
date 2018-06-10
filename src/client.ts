import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';

const link = new RestLink({
  uri: 'https://opentdb.com',
  typePatcher: {
    TriviaQuestionsPayload: (data: any): any => {
      if (data.results != null) {
        data.results = data.results.map(question => ({ __typename: 'Question', ...question }));
      }
      return data;
    },
  },
});

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

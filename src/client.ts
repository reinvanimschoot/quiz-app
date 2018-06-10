import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { RestLink } from 'apollo-link-rest';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

import { defaults, resolvers } from './graphql/localState';

const cache = new InMemoryCache();

const stateLink = withClientState({ cache, defaults, resolvers });

const restLink = new RestLink({
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
  link: ApolloLink.from([stateLink, restLink]),
  cache,
});

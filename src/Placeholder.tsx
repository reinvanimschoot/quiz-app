import React from 'react';
import { View, Text } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Placeholder = props => {
  console.log(props);
  return (
    <View style={{ margin: 40 }}>
      <Text>Hello</Text>
    </View>
  );
};

const query = gql`
  query {
    questions(amount: 5, difficulty: "easy")
      @rest(
        type: "TriviaQuestionsPayload"
        path: "/api.php?amount=:amount&difficulty=:difficulty&type=boolean"
      ) {
      results
    }
  }
`;

export default graphql(query, {
  props: ({ data: { loading, questions } }) => ({
    questions: loading ? null : questions.results,
    loading,
  }),
})(Placeholder);

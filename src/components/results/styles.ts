import styled from 'styled-components/native';
import { material, systemWeights } from 'react-native-typography';

export const ResultContainer = styled.View`
  align-items: center;
`;

export const QuestionText = styled.Text`
  ${material.body1Object};
  ${systemWeights.semibold};
  color: white;
  padding-top: 5px;
  width: 260px;
  margin-left: 10;
`;

export const QuestionContainer = styled.View`
  flex: 1;
  margin-bottom: 10px;
  padding-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;

export const PlayAgainButton = styled.TouchableOpacity`
  padding: 10px;
  border: solid 2px #ce5981;
  background-color: #ce5981;
  border-radius: 15px;
  width: 250px;
  align-items: center;
`;

export const PlayAgainText = styled.Text`
  ${material.body1Object};
  ${systemWeights.semibold};
  color: white;
`;

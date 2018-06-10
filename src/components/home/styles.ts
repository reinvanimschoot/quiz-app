import styled from 'styled-components/native';
import { material, systemWeights } from 'react-native-typography';

export const OptionButton = styled.TouchableOpacity`
  padding: 10px;
  border: solid 2px #50fa7b;
  border-radius: 15px;
  width: 250px;
  align-items: center;
  margin: 10px;
`;

export const OptionText = styled.Text`
  ${material.body1Object};
  ${systemWeights.semibold};
  color: #50fa7b;
`;

export const BeginButton = styled.TouchableOpacity`
  padding: 10px;
  border: solid 2px #ce5981;
  background-color: #ce5981;
  border-radius: 15px;
  width: 250px;
  align-items: center;
`;

export const BeginText = styled.Text`
  ${material.body1Object};
  ${systemWeights.semibold};
  color: white;
`;

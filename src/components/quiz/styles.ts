import styled from 'styled-components/native';
import { material, systemWeights } from 'react-native-typography';

export const CardContainer = styled.View`
  height: 300px;
  width: 300px;
  padding: 20px;
  border-color: white;
  border-width: 2px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const CardText = styled.Text`
  ${material.titleObject};
  ${systemWeights.bold};
  color: white;
`;

export const AnswerContainer = styled.View`
  flex-direction: row;
  width: 250px;
  justify-content: space-between;
`;

export const AnswerButton = styled.TouchableOpacity`
  padding: 10px;
  border: solid 2px;
  border-color: ${(props: { color: string }) => props.color}
  border-radius: 15px;
  width: 80px;
  align-items: center;
`;

export const AnswerText = styled.Text`
  ${material.subheadingObject};
  ${systemWeights.bold};
  color: ${(props: { color: string }) => props.color};
`;

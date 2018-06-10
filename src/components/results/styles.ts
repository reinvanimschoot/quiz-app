import styled from 'styled-components/native';
import { material, systemWeights } from 'react-native-typography';

export const Container = styled.View`
  flex: 1;
  padding: 50px 30px;
  align-items: center;
  background-color: #292734;
`;

export const Title = styled.Text`
  ${material.headlineObject};
  ${systemWeights.semibold};
  color: #ce5981;
`;

export const SubTitle = styled.Text`
  ${material.subheadingObject};
  ${systemWeights.semibold};
  color: #ce5981;
  padding-top: 5px;
`;

export const Divider = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: white;
  width: 300px;
  margin-vertical: 20px;
`;

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

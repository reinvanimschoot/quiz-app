import styled from 'styled-components/native';
import { material, systemWeights } from 'react-native-typography';

export const Container = styled.View`
  flex: 1;
  padding: 50px 30px;
  align-items: center;
  justify-content: center;
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

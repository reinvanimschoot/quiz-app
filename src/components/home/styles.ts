import styled from 'styled-components/native';
import { material, systemWeights } from 'react-native-typography';

import { pink, green } from '../../constants/colors';

export const OptionButton = styled.TouchableOpacity`
  padding: 10px;
  border: solid 2px ${green};
  border-radius: 15px;
  width: 250px;
  align-items: center;
  margin: 10px;
`;

export const OptionText = styled.Text`
  ${material.body1Object};
  ${systemWeights.semibold};
  color: ${green};
`;

export const BeginButton = styled.TouchableOpacity`
  padding: 10px;
  border: solid 2px ${pink};
  background-color: ${pink};
  border-radius: 15px;
  width: 250px;
  align-items: center;
`;

export const BeginText = styled.Text`
  ${material.body1Object};
  ${systemWeights.semibold};
  color: white;
`;

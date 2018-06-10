import styled from 'styled-components/native';
import { material, systemWeights } from 'react-native-typography';

export const Container = styled.View`
  flex: 1;
  padding: 50px 30px;
  ${({ centered }: { centered?: boolean }) => (centered ? 'justify-content: center;' : null)};
  ${({ centered }: { centered?: boolean }) => (centered ? 'align-items: center;' : null)};
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

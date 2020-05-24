import styled from 'styled-components/native';

import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 30px 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const CreateAccount = styled.TouchableOpacity`
  flex-direction: row;
  /* position: absolute; */
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;

  background: #312e38;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  border-top-width: 1px;
  border-color: #232129;
`;

export const CreateAccountText = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  margin-left: 16px;
`;

import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #312e38;

  padding: 30px 30px;
`;

export const IconContainer = styled.TouchableOpacity`
  width: 100%;
  align-items: flex-start;
`;

export const AvatarContainer = styled.View`
  margin-top: -25px;
`;

export const Avatar = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  position: relative;
`;
export const AvatarButton = styled.TouchableOpacity`
  background: #ff9000;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 5px;
  bottom: 5px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 20px 0 24px;
`;

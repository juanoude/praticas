import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Provider } from './index';

export const Container = styled.View`
  background-color: #312e38;
  flex: 1;
`;

export const Header = styled.View`
  background: #28262e;
  padding: 24px;
  padding-top: ${getStatusBarHeight()}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderText = styled.Text`
  color: white;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const HeaderName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const Avatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 12px;
`;

export const ProvidersListTitle = styled.Text`
  color: #f4ede8;
  margin-bottom: 24px;
  font-size: 26px;
  font-family: 'RobotoSlab-Medium';
`;

export const ProviderContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  margin-right: 20px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: #f4ede8;
`;

export const ProviderMeta = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 8px;
`;

export const MetaAvailability = styled.Text`
  font-family: 'RobotoSlab-Regular';
  color: #999591;
  margin-left: 8px;
`;

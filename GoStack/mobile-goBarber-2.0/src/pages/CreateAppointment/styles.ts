import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';
import { Provider } from './index';

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface ScheduleProps {
  available: boolean;
  selected: boolean;
}

interface ScheduleTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background-color: #312e38;
`;

export const Content = styled.ScrollView``;

export const Header = styled.View`
  background: #28262e;
  padding: 12px 24px;
  padding-top: ${isIphoneX() ? getStatusBarHeight() + 12 : 12}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 20px 12px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  background: ${(props) => (props.selected ? '#ff9000' : '#3e3b47')};
  margin: 10px;
  padding: 0px 10px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  height: 32px;
  width: 32px;
  border-radius: 16px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
  font-family: 'RobotoSlab-Regular';
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
  margin-left: 10px;
`;

export const ButtonContainer = styled.View`
  align-items: center;
`;

// ButtonContainer.displayName = 'EncontreMe';

export const CalendarButton = styled(RectButton)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: #ff9000;
  align-items: center;
  justify-content: center;
`;

export const SchedulesSection = styled.View`
  padding-top: 4px;
`;
export const PeriodTitle = styled.Text`
  font-size: 24px;
  font-family: 'RobotoSlab-Regular';
  color: gray;
  margin: 10px 0;
`;
export const ScheduleList = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {
    paddingHorizontal: 24
  }
})``;
export const Schedule = styled(RectButton)<ScheduleProps>`
  background: ${(props) =>
    props.selected && props.available ? '#ff9000' : '#3e3b47'};
  opacity: ${(props) => (props.available ? 1 : 0.3)};
  padding: 12px;
  margin-right: 10px;
  border-radius: 10px;
`;
export const ScheduleText = styled.Text<ScheduleTextProps>`
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const SendButtonContainer = styled.View`
  margin-top: 30px;
  justify-content: center;
`;

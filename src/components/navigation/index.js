import { StackNavigator } from 'react-navigation';
import routes from '../routes';

export const AppNavigator = StackNavigator(routes, {
  navigationOptions: {},
  headerMode: 'none'
});

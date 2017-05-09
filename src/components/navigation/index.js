import { StackNavigator } from 'react-navigation';
import routes from '../routes';

export const AppNavigator = StackNavigator(routes, {
  navigationOptions: {
    title: ({ state }) => {
      if (state.params) {
        return `${state.params.title}`;
      }
    }
  },
  headerMode: 'none'
});

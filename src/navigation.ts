import { createStackNavigator } from 'react-navigation';

// Screens
import Placeholder from './Placeholder';

export default createStackNavigator(
  {
    HomeScreen: Placeholder,
  },
  {
    initialRouteName: 'HomeScreen',
    navigationOptions: () => ({
      header: null,
    }),
  },
);

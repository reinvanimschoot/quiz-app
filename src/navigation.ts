import { createStackNavigator } from 'react-navigation';

// Screens
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';

export default createStackNavigator(
  {
    HomeScreen: HomeScreen,
    QuizScreen: QuizScreen,
    ResultsScreen: ResultsScreen,
  },
  {
    initialRouteName: 'HomeScreen',
    navigationOptions: () => ({
      header: null,
    }),
  },
);

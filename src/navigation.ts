import { createStackNavigator } from 'react-navigation';

// Screens
import HomeScreen from './components/home/HomeScreen';
import QuizScreen from './components/quiz/QuizScreen';
import ResultsScreen from './components/results/ResultsScreen';

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
